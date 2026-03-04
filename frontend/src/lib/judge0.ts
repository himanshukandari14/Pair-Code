import type { ExecuteResult, LanguageKey } from "../types/index.ts";

const JUDGE0_API = "https://ce.judge0.com";

// Judge0 language IDs
// Full list: https://ce.judge0.com/languages
const LANGUAGE_IDS: Record<LanguageKey, number> = {
    javascript: 93, // JavaScript (Node.js 18.15.0)
    python: 92,     // Python (3.11.2)
    java: 91,       // Java (JDK 17.0.6)
};

export async function executeCode(language: LanguageKey, code: string): Promise<ExecuteResult> {
    try {
        const languageId = LANGUAGE_IDS[language];

        if (!languageId) {
            return {
                success: false,
                error: `Unsupported language: ${language}`,
            };
        }

        // Submit code for execution (wait=true makes it synchronous)
        const response = await fetch(`${JUDGE0_API}/submissions?base64_encoded=true&wait=true`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                language_id: languageId,
                source_code: btoa(unescape(encodeURIComponent(code))),
                stdin: "",
            }),
        });

        if (!response.ok) {
            return {
                success: false,
                error: `HTTP error! status: ${response.status}`,
            };
        }

        const data = await response.json();

        // Decode base64 outputs
        const stdout = data.stdout ? decodeURIComponent(escape(atob(data.stdout))) : "";
        const stderr = data.stderr ? decodeURIComponent(escape(atob(data.stderr))) : "";
        const compileOutput = data.compile_output
            ? decodeURIComponent(escape(atob(data.compile_output)))
            : "";

        // Status ID 3 = Accepted (successful execution)
        if (data.status?.id === 3) {
            return {
                success: true,
                output: stdout || "No output",
            };
        }

        // Compilation error
        if (data.status?.id === 6) {
            return {
                success: false,
                error: compileOutput || "Compilation error",
            };
        }

        // Runtime error or other failure
        return {
            success: false,
            output: stdout,
            error: stderr || compileOutput || data.status?.description || "Execution failed",
        };
    } catch (error) {
        return {
            success: false,
            error: `Failed to execute code: ${error instanceof Error ? error.message : String(error)}`,
        };
    }
}
