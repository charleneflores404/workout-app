import { useEffect } from "react";

import { API_URL } from "../config";

// Ping backend, to pre-warm as Render deployment has 30-60s cold-start
export const useHealthPing = () => {
  useEffect(() => {
    fetch(`${API_URL}/health`).catch(() => {});
  }, []);
};
