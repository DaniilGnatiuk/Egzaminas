import { useEffect, useState } from "react";
import AddCategoryForm from "./AddCategoryForm";

function AdminPanel({ token }) {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/events/admin/unapproved", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, [token, message]);

  const fetchEvents = () => {
    fetch("http://localhost:3000/events/admin/unapproved", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setEvents(data));
  };

  const approveEvent = async (id) => {
    setMessage("");
    const res = await fetch(
      `http://localhost:3000/events/admin/${id}/approve`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await res.json();
    if (res.ok) {
      setMessage(data.message || "Patvirtinta!");
      setEvents(events.filter((ev) => ev.id !== id));
    } else {
      setMessage(data.error || "Klaida tvirtinant");
    }
  };

  const rejectEvent = async (id) => {
    setMessage("");
    const res = await fetch(`http://localhost:3000/events/admin/${id}/reject`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (res.ok) {
      setMessage(data.message || "Atmesta!");
      fetchEvents(); // Tik atnaujina sąrašą iš serverio
    } else {
      setMessage(data.error || "Klaida atmetant");
    }
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "40px auto",
        border: "2px solid #888",
        padding: 16,
      }}
    >
      <AddCategoryForm token={token} />
      <h2>Laukiantys patvirtinimo renginiai (admin)</h2>
      {message && (
        <div style={{ color: "green", marginBottom: 10 }}>{message}</div>
      )}
      {events.length === 0 && <div>Nėra laukiančių renginių.</div>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {events.map((ev) => (
          <li
            key={ev.id}
            style={{
              marginBottom: 24,
              padding: 16,
              border: "1px solid #ccc",
              borderRadius: 8,
            }}
          >
            <h3>{ev.title}</h3>
            <p>{ev.description}</p>
            <p>
              <b>Vieta:</b> {ev.location}
            </p>
            <p>
              <b>Data:</b> {ev.date}
            </p>
            <p>
              <b>Kategorija:</b> {ev.category}
            </p>
            {ev.image_url && (
              <img
                src={`http://localhost:3000/uploads/${ev.image_url}`}
                alt="Renginio nuotrauka"
                style={{ marginTop: 8, maxHeight: 200 }}
              />
            )}
            <button
              onClick={() => approveEvent(ev.id)}
              style={{ marginTop: 10, marginRight: 10 }}
            >
              Patvirtinti
            </button>
            <button
              onClick={() => rejectEvent(ev.id)}
              style={{ marginTop: 10 }}
            >
              Atmesti
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
