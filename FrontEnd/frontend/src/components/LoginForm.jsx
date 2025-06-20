import { useState } from "react";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        onLogin(data.token);
      } else {
        setError(data.error || "Prisijungti nepavyko");
      }
    } catch {
      setError("Serverio klaida");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: 300, margin: "40px auto" }}
    >
      <h2>Prisijungimas</h2>
      <input
        type="text"
        placeholder="Vartotojo vardas"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={{ display: "block", width: "100%", marginBottom: 10 }}
      />
      <input
        type="password"
        placeholder="Slaptažodis"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ display: "block", width: "100%", marginBottom: 10 }}
      />
      <button type="submit">Prisijungti</button>
      {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
    </form>
  );
}

export default LoginForm;
