export type LanguageKey = "javascript" | "python" | "java";

export interface ExecuteResult {
  success: boolean;
  output?: string;
  error?: string;
}

export interface SessionUser {
  _id: string;
  name: string;
  email?: string;
  profileImage?: string;
  clerkId: string;
}

export interface Session {
  _id: string;
  host: SessionUser;
  participant?: SessionUser | null;
  status: "active" | "completed";
  callId: string;
  createdAt?: string;
  updatedAt?: string;
}
