export const LANGUAGE_CONFIG = {
  javascript: {
    name: "JavaScript",
    icon: "/javascript.png",
    monacoLang: "javascript",
  },
  python: {
    name: "Python",
    icon: "/python.png",
    monacoLang: "python",
  },
  java: {
    name: "Java",
    icon: "/java.png",
    monacoLang: "java",
  },
} as const;

export type LanguageKey = keyof typeof LANGUAGE_CONFIG;

export const DEFAULT_STARTER_CODE: Record<LanguageKey, string> = {
  javascript: `// Write your code here
console.log("Hello");
`,
  python: `# Write your code here
print("Hello")
`,
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello");
    }
}`,
};
