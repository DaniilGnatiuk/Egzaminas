import { useEffect, useState } from "react";

function EventsList({ token }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/events")
      .then((res) => res.json())
      .then((data) => setEvents(Array.isArray(data) ? data : []));
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>Renginiai</h2>
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
              <b>Kategorijos ID:</b> {ev.category_id}
            </p>
            {ev.image_url && (
              <img
                src={`http://localhost:3000/uploads/${ev.image_url}`}
                alt="Renginio nuotrauka"
                style={{ marginTop: 8, maxHeight: 200 }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventsList;
