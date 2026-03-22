import type { ExecuteResult } from "../types/index.ts";

interface OutputPanelProps {
  output: ExecuteResult | null;
}

function OutputPanel({ output }: OutputPanelProps) {
    return (
      <div className="h-full bg-transparent flex flex-col text-zinc-100">
        <div className="px-4 py-2.5 bg-black/40 border-b border-white/5 font-mono font-bold uppercase tracking-[0.2em] text-[10px] text-zinc-500">
           RUNTIME_OUTPUT //
        </div>
        <div className="flex-1 overflow-auto p-4 bg-[#020202]">
          {output === null ? (
            <p className="font-mono text-zinc-600 text-[10px] uppercase tracking-widest">Awaiting execution...</p>
          ) : output.success ? (
            <pre className="text-[12px] font-mono text-yellow-400 whitespace-pre-wrap">{output.output}</pre>
          ) : (
            <div>
              {output.output && (
                <pre className="text-[12px] font-mono text-zinc-300 whitespace-pre-wrap mb-2">
                  {output.output}
                </pre>
              )}
              <pre className="text-[12px] font-mono text-red-400 whitespace-pre-wrap">{output.error}</pre>
            </div>
          )}
        </div>
      </div>
    );
  }
  export default OutputPanel;