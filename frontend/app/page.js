"use client";
import { useState } from "react";
import MoodSelector from "@/components/MoodSelector";
import MoodCard     from "@/components/MoodCard";
import QuoteCard    from "@/components/QuoteCard";

export default function HomePage() {
  const [result, setResult] = useState(null);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <div style={{
        maxWidth: "680px",
        margin:   "0 auto",
        padding:  "48px 16px"
      }}>

        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{
            fontSize:     "2.5rem",
            fontWeight:   "bold",
            color:        "#111827",
            marginBottom: "12px"
          }}>
            How are you feeling today?
          </h1>
          <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>
            Select your mood and get a personalised response
          </p>
        </div>

        <MoodSelector onMoodSelect={setResult} />

        {result && (
          <div style={{ marginTop: "40px", display: "flex", flexDirection: "column", gap: "24px" }}>
            <MoodCard  mood={result.mood}   />
            <QuoteCard quote={result.quote} />
          </div>
        )}

      </div>
    </div>
  );
}
