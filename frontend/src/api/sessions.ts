import type { Session } from "../types/index.ts";
import axiosInstance from "../lib/axios.ts";

const API_SESSION = "/api/session";
const API_CHAT = "/api/chat";

export const sessionApi = {
  createSession: async () => {
    const response = await axiosInstance.post<{ session: Session }>(API_SESSION, {});
    return response.data;
  },

  getActiveSessions: async () => {
    const response = await axiosInstance.get<{ sessions: Session[] }>(`${API_SESSION}/active`);
    return response.data;
  },
  getMyRecentSessions: async () => {
    const response = await axiosInstance.get<{ sessions: Session[] }>(`${API_SESSION}/my-recent`);
    return response.data;
  },

  getSessionById: async (id: string) => {
    const response = await axiosInstance.get<{ session: Session }>(`${API_SESSION}/${id}`);
    return response.data;
  },

  joinSession: async (id: string) => {
    const response = await axiosInstance.post<{ session: Session }>(`${API_SESSION}/${id}/join`);
    return response.data;
  },
  endSession: async (id: string) => {
    const response = await axiosInstance.post<{ session: Session }>(`${API_SESSION}/${id}`);
    return response.data;
  },
  getStreamToken: async () => {
    const response = await axiosInstance.get<{ token: string; userId: string; userName: string; userImage: string }>(`${API_CHAT}/token`);
    return response.data;
  },
};