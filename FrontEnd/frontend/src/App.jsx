import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import EventsList from "./components/EventsList";
import AddEventForm from "./components/AddEventForm";
import AdminPanel from "./components/AdminPanel";
import "./App.css";

function getRoleFromToken(token) {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role;
  } catch {
    return null;
  }
}

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [showRegister, setShowRegister] = useState(false);
  const [page, setPage] = useState("main"); // "main" arba "profile"

  const handleLogin = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    setPage("main");
  };

  const role = getRoleFromToken(token);

  if (!token) {
    return (
      <div>
        {showRegister ? (
          <>
            <RegisterForm onRegister={() => setShowRegister(false)} />
            <p style={{ textAlign: "center" }}>
              Jau turite paskyrą?{" "}
              <button onClick={() => setShowRegister(false)}>
                Prisijungti
              </button>
            </p>
          </>
        ) : (
          <>
            <LoginForm onLogin={handleLogin} />
            <p style={{ textAlign: "center" }}>
              Neturite paskyros?{" "}
              <button onClick={() => setShowRegister(true)}>
                Registruotis
              </button>
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      <nav
        style={{
          marginBottom: 20,
          borderBottom: "1px solid #ccc",
          paddingBottom: 10,
        }}
      >
        <button onClick={() => setPage("main")} style={{ marginRight: 10 }}>
          Pagrindinis
        </button>
        <button onClick={() => setPage("profile")} style={{ marginRight: 10 }}>
          Profilis
        </button>
        <button onClick={handleLogout} style={{ float: "right" }}>
          Atsijungti
        </button>
      </nav>
      {page === "main" && (
        <>
          {role === "admin" && <AdminPanel token={token} />}
          <AddEventForm token={token} />
          <EventsList token={token} />
        </>
      )}
    </div>
  );
}

export default App;
