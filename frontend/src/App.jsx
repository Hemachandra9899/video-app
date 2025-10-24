import React from "react";
import { AuthProvider } from "./context/AuthContext.jsx";
import Login from "./pages/Login.jsx";
import Upload from "./pages/Upload.jsx";
import Library from "./pages/Library.jsx";
import VideoPlayer from "./pages/VideoPlayer.jsx";

export default function App() {
  const [route, setRoute] = React.useState("login");
  const [selected, setSelected] = React.useState(null);

  return (
    <AuthProvider>
      <nav style={{ display: "flex", gap: 12, padding: 12 }}>
        <button onClick={() => setRoute("login")}>Login</button>
        <button onClick={() => setRoute("upload")}>Upload</button>
        <button onClick={() => setRoute("library")}>Library</button>
      </nav>

      {route === "login" && <Login onSuccess={() => setRoute("upload")} />}
      {route === "upload" && <Upload onGoLibrary={() => setRoute("library")} />}
      {route === "library" && <Library onOpen={(id) => { setSelected(id); setRoute("player"); }} />}
      {route === "player" && selected && <VideoPlayer id={selected} onBack={() => setRoute("library")} />}
    </AuthProvider>
  );
}
