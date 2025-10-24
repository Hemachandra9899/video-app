import React from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login({ onSuccess }) {
  const { login, register } = useAuth();
  const [email, setEmail] = React.useState("demo@example.com");
  const [password, setPassword] = React.useState("password");
  const [orgName, setOrgName] = React.useState("Demo Org");
  const [mode, setMode] = React.useState("login");

  async function submit(e) {
    e.preventDefault();
    if (mode === "login") await login(email, password);
    else await register(orgName, email, password);
    onSuccess?.();
  }

  return (
    <form onSubmit={submit} style={{ padding: 16, display: "grid", gap: 8, maxWidth: 400 }}>
      {mode === "register" && (
        <input placeholder="Org Name" value={orgName} onChange={(e) => setOrgName(e.target.value)} />
      )}
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button type="submit">{mode === "login" ? "Login" : "Register"}</button>
        <button type="button" onClick={() => setMode(mode === "login" ? "register" : "login")}>
          Switch to {mode === "login" ? "Register" : "Login"}
        </button>
      </div>
    </form>
  );
}
