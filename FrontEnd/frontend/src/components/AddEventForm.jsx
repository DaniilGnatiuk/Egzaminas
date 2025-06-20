import { useState, useEffect } from "react";

function AddEventForm({ token, onSuccess }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("date", date);
    formData.append("category_id", categoryId);
    if (image) formData.append("image", image);

    try {
      const res = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || "Renginys pateiktas patvirtinimui");
        setTitle("");
        setDescription("");
        setLocation("");
        setDate("");
        setCategoryId("");
        setImage(null);
        if (onSuccess) onSuccess();
      } else {
        setError(data.error || "Nepavyko pateikti renginio");
      }
    } catch {
      setError("Serverio klaida");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: 400, margin: "40px auto" }}
    >
      <h2>Pridėti renginį</h2>
      <input
        type="text"
        placeholder="Pavadinimas"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ width: "100%", marginBottom: 8 }}
      />
      <textarea
        placeholder="Aprašymas"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        style={{ width: "100%", marginBottom: 8 }}
      />
      <input
        type="text"
        placeholder="Vieta"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
        style={{ width: "100%", marginBottom: 8 }}
      />
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        style={{ width: "100%", marginBottom: 8 }}
      />
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        required
        style={{ width: "100%", marginBottom: 8 }}
      >
        <option value="">Pasirinkite kategoriją</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        style={{ marginBottom: 8 }}
      />
      <button type="submit">Pateikti</button>
      {message && (
        <div style={{ color: "green", marginTop: 10 }}>{message}</div>
      )}
      {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
    </form>
  );
}

export default AddEventForm;
