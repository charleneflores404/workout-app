import { useEffect } from "react";

// Ping backend, to pre-warm as Render deployment has 30-60s cold-start
export const useHealthPing = () => {
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/health`).catch(() => {});
  }, []);
};
