import React from "react";
import { AuthProvider } from "./context/AuthContext.jsx";
import Login from "./pages/Login.jsx";
import Upload from "./pages/Upload.jsx";
import Library from "./pages/Library.jsx";
import VideoPlayer from "./pages/VideoPlayer.jsx";

export default function App() {
  const [route, setRoute] = React.useState("login");
  const [selected, setSelected] = React.useState(null);

  const navItems = [
    { name: "Login", value: "login" },
    { name: "Upload", value: "upload" },
    { name: "Library", value: "library" },
  ];

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-800 text-white">
        {/* Navbar */}
        <nav className="flex items-center justify-center gap-6 py-4 bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-md">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => setRoute(item.value)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                route === item.value
                  ? "bg-white text-indigo-700 shadow"
                  : "text-gray-200 hover:text-white hover:bg-white/10"
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Main content */}
        <main className="flex-grow flex justify-center items-center p-6">
          {route === "login" && <Login onSuccess={() => setRoute("upload")} />}
          {route === "upload" && (
            <Upload onGoLibrary={() => setRoute("library")} />
          )}
          {route === "library" && (
            <Library
              onOpen={(id) => {
                setSelected(id);
                setRoute("player");
              }}
            />
          )}
          {route === "player" && selected && (
            <VideoPlayer id={selected} onBack={() => setRoute("library")} />
          )}
        </main>
      </div>
    </AuthProvider>
  );
}
