import React, { createContext, useContext, useState } from "react";
import { api } from "../api/axios.js";

const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  async function login(email, password) {
    const { data } = await api.post("/api/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    setToken(data.token);
  }

  async function register(orgName, email, password) {
    const { data } = await api.post("/api/auth/register", { orgName, email, password });
    localStorage.setItem("token", data.token);
    setToken(data.token);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return <Ctx.Provider value={{ token, login, register, logout }}>{children}</Ctx.Provider>;
}
