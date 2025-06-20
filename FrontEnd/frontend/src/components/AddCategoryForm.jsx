import { useState } from "react";

function AddCategoryForm({ token, onSuccess }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const res = await fetch("http://localhost:3000/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Kategorija pridėta!");
        setName("");
        if (onSuccess) onSuccess();
      } else {
        setError(data.error || "Nepavyko pridėti kategorijos");
      }
    } catch {
      setError("Serverio klaida");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <h3>Pridėti naują kategoriją</h3>
      <input
        type="text"
        placeholder="Kategorijos pavadinimas"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={{ marginRight: 8 }}
      />
      <button type="submit">Pridėti</button>
      {message && (
        <span style={{ color: "green", marginLeft: 10 }}>{message}</span>
      )}
      {error && <span style={{ color: "red", marginLeft: 10 }}>{error}</span>}
    </form>
  );
}

export default AddCategoryForm;
