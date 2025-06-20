import { useState } from "react";

function RegisterForm({ onRegister }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Registracija sėkminga! Galite prisijungti.");
        setUsername("");
        setEmail("");
        setPassword("");
        if (onRegister) onRegister();
      } else {
        setError(data.error || "Registracija nepavyko");
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
      <h2>Registracija</h2>
      <input
        type="text"
        placeholder="Vartotojo vardas"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={{ display: "block", width: "100%", marginBottom: 10 }}
      />
      <input
        type="email"
        placeholder="El. paštas"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
      <button type="submit">Registruotis</button>
      {message && (
        <div style={{ color: "green", marginTop: 10 }}>{message}</div>
      )}
      {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
    </form>
  );
}

export default RegisterForm;
