import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";

import { Toaster } from "react-hot-toast";
import DashboardPage from "./pages/DashboardPage";
import SessionPage from "./pages/SessionPage";
import axiosInstance from "./lib/axios";

function App() {
  const { isSignedIn, isLoaded } = useUser();
  const { getToken } = useAuth();

  // Send Clerk JWT in Authorization header so backend can authenticate cross-origin requests
  useEffect(() => {
    if (!isSignedIn) return;
    const interceptorId = axiosInstance.interceptors.request.use(async (config) => {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    return () => axiosInstance.interceptors.request.eject(interceptorId);
  }, [isSignedIn, getToken]);

  // this will get rid of the flickering effect
  if (!isLoaded) return null;

  return (
    <>
      <Routes>
        <Route path="/" element={!isSignedIn ? <HomePage /> : <Navigate to={"/dashboard"} />} />
        <Route path="/dashboard" element={isSignedIn ? <DashboardPage /> : <Navigate to={"/"} />} />
        <Route path="/session/:id" element={isSignedIn ? <SessionPage /> : <Navigate to={"/"} />} />
      </Routes>

      <Toaster toastOptions={{ duration: 3000 }} />
    </>
  );
}

export default App;