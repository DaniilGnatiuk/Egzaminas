import React, { useState } from "react";

function StarRating({ eventId, token, avgRating, onRated }) {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);
  const [error, setError] = useState("");

  const handleClick = async (value) => {
    setError("");
    setSelected(value);
    try {
      const res = await fetch(`http://localhost:3000/ratings/${eventId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating: value }),
      });
      if (res.ok) {
        if (onRated) onRated();
      } else {
        const data = await res.json();
        setError(data.error || "Nepavyko įvertinti");
      }
    } catch {
      setError("Serverio klaida");
    }
  };

  return (
    <div>
      <div>
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            style={{
              fontSize: 24,
              color:
                (hovered || selected || Math.round(avgRating)) >= n
                  ? "#FFD700"
                  : "#ccc",
              cursor: token ? "pointer" : "default",
            }}
            onMouseEnter={() => token && setHovered(n)}
            onMouseLeave={() => token && setHovered(0)}
            onClick={() => token && handleClick(n)}
            title={token ? `Įvertinti ${n} žvaigždutėmis` : ""}
          >
            ★
          </span>
        ))}
        <span style={{ marginLeft: 8, fontSize: 16 }}>
          {avgRating ? `Vidurkis: ${avgRating.toFixed(2)}` : "Nėra įvertinimų"}
        </span>
      </div>
      {error && <div style={{ color: "red", fontSize: 14 }}>{error}</div>}
    </div>
  );
}

export default StarRating;
