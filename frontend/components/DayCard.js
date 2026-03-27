"use client";
import { useState, useEffect } from "react";

function getGreeting(hour) {
  if (hour >= 5  && hour < 12) return { greeting: "Good Morning",   emoji: "🌅" };
  if (hour >= 12 && hour < 17) return { greeting: "Good Afternoon", emoji: "☀️" };
  if (hour >= 17 && hour < 21) return { greeting: "Good Evening",   emoji: "🌇" };
  return { greeting: "Good Night", emoji: "🌙" };
}

function getMotivation(hour) {
  if (hour >= 5  && hour < 12) return "Start your day with intention";
  if (hour >= 12 && hour < 17) return "Keep the momentum going";
  if (hour >= 17 && hour < 21) return "Wind down and reflect";
  return "Rest well, tomorrow is a new day";
}

export default function DayCard() {
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  if (!now) return null;

  const hour = now.getHours();
  const { greeting, emoji } = getGreeting(hour);
  const motivation = getMotivation(hour);

  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    month:   "long",
    day:     "numeric"
  });

  const timeStr = now.toLocaleTimeString("en-US", {
    hour:   "numeric",
    minute: "2-digit"
  });

  return (
    <div style={{
      background:    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      borderRadius:  "16px",
      padding:       "24px 32px",
      color:         "white",
      boxShadow:     "0 4px 15px rgba(102, 126, 234, 0.4)"
    }}>
      <div style={{
        display:        "flex",
        alignItems:     "center",
        gap:            "12px",
        marginBottom:   "8px"
      }}>
        <span style={{ fontSize: "2rem" }}>{emoji}</span>
        <h2 style={{
          fontSize:   "1.5rem",
          fontWeight: "bold",
          margin:     0
        }}>
          {greeting}
        </h2>
      </div>
      <p style={{
        fontSize:     "0.95rem",
        opacity:      0.85,
        marginBottom: "4px"
      }}>
        {dateStr} · {timeStr}
      </p>
      <p style={{
        fontSize: "0.9rem",
        opacity:  0.75,
        margin:   0
      }}>
        {motivation}
      </p>
    </div>
  );
}
