// hooks/useSSE.js
import { useEffect } from "react";
import { useAuth } from "../auth/AuthContext.jsx";

export function useSSE(url, onMessage) {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const source = new EventSource(url, { withCredentials: true });

    source.onmessage = (event) => {
      try {
        onMessage(JSON.parse(event.data));
      } catch (error) {
        console.error("[useSSE] Failed to parse SSE message:", error, event.data);
      }
    };

    source.onerror = (error) => {
      console.error("[useSSE] EventSource error:", error);
    };

    return () => source.close();
  }, [url, user, onMessage]);
}
