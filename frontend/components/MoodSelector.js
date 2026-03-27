"use client";
import { useState } from "react";

const moods = [
  { name: "happy",   emoji: "😄", label: "Happy"   },
  { name: "sad",     emoji: "😢", label: "Sad"     },
  { name: "focused", emoji: "🎯", label: "Focused" },
  { name: "anxious", emoji: "😰", label: "Anxious" },
  { name: "angry",   emoji: "😤", label: "Angry"   },
];

export default function MoodSelector({ onMoodSelect }) {
  const [loading,  setLoading]  = useState(false);
  const [selected, setSelected] = useState(null);

  async function handleMoodClick(mood) {
    setLoading(true);
    setSelected(mood.name);

    try {
      // Step 1: Get mood response first
      const moodRes  = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/mood/${mood.name}`
      );
      const moodData = await moodRes.json();

      // Step 2: Save to database WITH message and playlist
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/mood/save`,
        {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({
            mood:     mood.name,
            emoji:    mood.emoji,
            message:  moodData.message,
            playlist: moodData.playlist
          })
        }
      );

      // Step 3: Get a quote
      const quoteRes  = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/quote`
      );
      const quoteData = await quoteRes.json();

      // Step 4: Pass all results up to parent page
      onMoodSelect({ mood: moodData, quote: quoteData });

    } catch (error) {
      console.error("API call failed:", error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      display:        "flex",
      gap:            "16px",
      justifyContent: "center",
      flexWrap:       "wrap"
    }}>
      {moods.map((mood) => (
        <button
          key={mood.name}
          onClick={() => handleMoodClick(mood)}
          disabled={loading}
          style={{
            display:         "flex",
            flexDirection:   "column",
            alignItems:      "center",
            padding:         "24px",
            borderRadius:    "16px",
            border:          selected === mood.name
                               ? "2px solid #4f46e5"
                               : "2px solid #e5e7eb",
            backgroundColor: selected === mood.name
                               ? "#eef2ff"
                               : "white",
            cursor:          "pointer",
            transition:      "all 0.2s"
          }}
        >
          <span style={{ fontSize: "2.5rem" }}>{mood.emoji}</span>
          <span style={{
            fontSize:   "0.875rem",
            fontWeight: "600",
            marginTop:  "8px",
            color:      "#374151"
          }}>
            {mood.label}
          </span>
        </button>
      ))}
    </div>
  );
}
