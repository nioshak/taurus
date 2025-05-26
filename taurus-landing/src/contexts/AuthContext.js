// src/contexts/AuthContext.js
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/user", { withCredentials: true })
      .then((res) => {
        setUser(res.data); // { email: ..., id: ... }
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => setLoadingUser(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loadingUser }}>
      {children}
    </AuthContext.Provider>
  );
}
