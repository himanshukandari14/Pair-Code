import type { ExecuteResult } from "../types/index.ts";

interface OutputPanelProps {
  output: ExecuteResult | null;
}

function OutputPanel({ output }: OutputPanelProps) {
    return (
      <div className="h-full bg-black flex flex-col text-zinc-100">
        <div className="px-4 py-2.5 bg-black/50 border-b border-zinc-800/80 font-medium text-sm text-zinc-400">
          Output
        </div>
        <div className="flex-1 overflow-auto p-4">
          {output === null ? (
            <p className="text-zinc-500 text-sm">Click "Run Code" to see the output here...</p>
          ) : output.success ? (
            <pre className="text-sm font-mono text-emerald-400 whitespace-pre-wrap">{output.output}</pre>
          ) : (
            <div>
              {output.output && (
                <pre className="text-sm font-mono text-zinc-300 whitespace-pre-wrap mb-2">
                  {output.output}
                </pre>
              )}
              <pre className="text-sm font-mono text-red-400 whitespace-pre-wrap">{output.error}</pre>
            </div>
          )}
        </div>
      </div>
    );
  }
  export default OutputPanel;