import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import Editor from "@monaco-editor/react";
import { Loader2Icon, PlayIcon } from "lucide-react";
import { LANGUAGE_CONFIG } from "../data/languages";
import type { LanguageKey } from "../types/index.ts";
import { useRoom } from "@liveblocks/react";
import { getYjsProviderForRoom } from "@liveblocks/yjs";
import { MonacoBinding } from "y-monaco";
import { Awareness } from "y-protocols/awareness";
import type { editor } from "monaco-editor";

// Predefined vibrant colors for remote cursors
const CURSOR_COLORS = [
  { color: "#FF6B6B", light: "#FF6B6B30" }, // Red
  { color: "#4ECDC4", light: "#4ECDC430" }, // Teal
  { color: "#FFD93D", light: "#FFD93D30" }, // Yellow
  { color: "#6C5CE7", light: "#6C5CE730" }, // Purple
  { color: "#A8E6CF", light: "#A8E6CF30" }, // Green
  { color: "#FF8A5C", light: "#FF8A5C30" }, // Orange
];

interface CodeEditorPanelProps {
  selectedLanguage: LanguageKey;
  isRunning: boolean;
  onLanguageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onRunCode: () => void;
  onCodeChange: (code: string) => void;
  userName?: string;
}

function CodeEditorPanel({
  selectedLanguage,
  isRunning,
  onLanguageChange,
  onRunCode,
  onCodeChange,
  userName,
}: CodeEditorPanelProps) {
  const room = useRoom();
  const [editorRef, setEditorRef] = useState<editor.IStandaloneCodeEditor>();
  const bindingRef = useRef<MonacoBinding | null>(null);
  const styleRef = useRef<HTMLStyleElement | null>(null);

  // Stable color per session (don't re-randomize on re-render)
  const cursorColor = useMemo(() => {
    const idx = Math.floor(Math.random() * CURSOR_COLORS.length);
    return CURSOR_COLORS[idx];
  }, []);

  // Inject CSS for cursor name labels
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      /* Base styles for ALL remote cursor heads (name labels) */
      .yRemoteSelectionHead {
        position: relative !important;
        border-left: 2px solid orange;
        border-top: none !important;
        margin-left: -1px;
      }
    `;
    document.head.appendChild(style);
    styleRef.current = style;

    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, []);

  // Bind Yjs to Monaco + show cursor labels via awareness
  useEffect(() => {
    if (!editorRef || !room) return;

    const yProvider = getYjsProviderForRoom(room);
    const yDoc = yProvider.getYDoc();
    const yText = yDoc.getText("monaco");

    // Set awareness user info for cursor labels
    yProvider.awareness.setLocalStateField("user", {
      name: userName || "Anonymous",
      color: cursorColor.color,
      colorLight: cursorColor.light,
    });

    // When code changes in Yjs doc, notify parent for Run Code
    const observer = () => {
      onCodeChange(yText.toString());
    };
    yText.observe(observer);

    const binding = new MonacoBinding(
      yText,
      editorRef.getModel() as editor.ITextModel,
      new Set([editorRef]),
      yProvider.awareness as unknown as Awareness
    );
    bindingRef.current = binding;

    // Listen to awareness changes to inject per-user cursor label CSS
    const awarenessStyleEl = document.createElement("style");
    awarenessStyleEl.id = "yjs-cursor-labels";
    document.head.appendChild(awarenessStyleEl);

    const updateCursorLabels = () => {
      const states = yProvider.awareness.getStates();
      let css = "";
      const awareness = yProvider.awareness as unknown as Awareness & { clientID: number };

      states.forEach((state, clientId) => {
        if (clientId === awareness.clientID) return; // skip self
        const stateObj = state as Record<string, unknown>;
        const user = stateObj?.user as { name?: string; color?: string } | undefined;
        if (!user) return;

        const name = user.name || "Anonymous";
        const color = user.color || "#FF6B6B";

        css += `
          .yRemoteSelectionHead-${clientId} {
            position: relative !important;
            border-left: 2px solid ${color} !important;
          }
          .yRemoteSelectionHead-${clientId}::after {
            content: "${name}";
            position: absolute;
            top: -18px;
            left: -1px;
            background: ${color};
            color: #000;
            font-size: 11px;
            font-weight: 600;
            padding: 1px 6px;
            border-radius: 3px 3px 3px 0;
            white-space: nowrap;
            pointer-events: none;
            z-index: 1000;
            font-family: 'Inter', sans-serif;
            line-height: 16px;
          }
          .yRemoteSelection-${clientId} {
            background-color: ${color}20 !important;
          }
        `;
      });

      awarenessStyleEl.textContent = css;
    };

    yProvider.awareness.on("change", updateCursorLabels);
    // Initial render
    updateCursorLabels();

    return () => {
      yText.unobserve(observer);
      yProvider.awareness.off("change", updateCursorLabels);
      binding.destroy();
      if (awarenessStyleEl.parentNode) {
        awarenessStyleEl.parentNode.removeChild(awarenessStyleEl);
      }
    };
  }, [editorRef, room, userName, cursorColor]);

  const handleOnMount = useCallback((e: editor.IStandaloneCodeEditor) => {
    setEditorRef(e);
  }, []);

  return (
    <div className="h-full bg-black flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/80 bg-black/30">
        <div className="flex items-center gap-3">
          <img
            src={LANGUAGE_CONFIG[selectedLanguage].icon}
            alt={LANGUAGE_CONFIG[selectedLanguage].name}
            className="size-5"
          />
          <select
            className="bg-zinc-900/80 border border-zinc-700/50 rounded-lg px-3 py-1.5 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50"
            value={selectedLanguage}
            onChange={onLanguageChange}
          >
            {Object.entries(LANGUAGE_CONFIG).map(([key, lang]) => (
              <option key={key} value={key}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <button
          className="inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium px-4 py-2 bg-emerald-500/90 text-white hover:bg-emerald-500 transition-all disabled:opacity-50 shadow-lg shadow-emerald-500/20"
          disabled={isRunning}
          onClick={onRunCode}
        >
          {isRunning ? (
            <>
              <Loader2Icon className="size-4 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <PlayIcon className="size-4" />
              Run Code
            </>
          )}
        </button>
      </div>

      <div className="flex-1">
        <Editor
          height={"100%"}
          language={LANGUAGE_CONFIG[selectedLanguage].monacoLang}
          onMount={handleOnMount}
          theme="vs-dark"
          options={{
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            minimap: { enabled: false },
            padding: { top: 16, bottom: 16 },
          }}
        />
      </div>
    </div>
  );
}
export default CodeEditorPanel;