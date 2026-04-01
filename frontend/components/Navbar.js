"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isHistory = pathname === "/history";

  const [confirming, setConfirming] = useState(false);
  const [clearing,   setClearing]   = useState(false);

  async function handleClear() {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    setClearing(true);
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/moods`,
        { method: "DELETE" }
      );
      setConfirming(false);
      window.location.reload();
    } catch (error) {
      console.error("Failed to clear:", error.message);
    } finally {
      setClearing(false);
    }
  }

  return (
    <nav style={{
      backgroundColor: "white",
      borderBottom:    "3px solid #C0392B",
      padding:         "16px 24px",
      display:         "flex",
      justifyContent:  "space-between",
      alignItems:      "center"
    }}>

      <h1 style={{
        fontSize:   "1.5rem",
        fontWeight: "bold",
        color:      "#4f46e5",
        margin:     0
      }}>
        🎭 MoodCast
      </h1>

      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>

        {/* Home button */}
        <a href="/" style={{
          backgroundColor: "#C0392B",
          color:           "white",
          padding:         "8px 16px",
          borderRadius:    "8px",
          textDecoration:  "none",
          fontWeight:      "600",
          fontSize:        "0.9rem"
        }}>
          Home
        </a>

        {/* Clear History — only shows on /history page */}
        {isHistory && (
          confirming ? (
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <span style={{
                fontSize:   "0.85rem",
                color:      "#C0392B",
                fontWeight: "500"
              }}>
                Are you sure?
              </span>
              <button
                onClick={() => setConfirming(false)}
                style={{
                  backgroundColor: "#C0392B",
                  color:           "#fefeff",
                  padding:         "8px 14px",
                  borderRadius:    "8px",
                  border:          "none",
                  fontWeight:      "600",
                  fontSize:        "0.85rem",
                  cursor:          "pointer"
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleClear}
                disabled={clearing}
                style={{
                  backgroundColor: "#C0392B",
                  color:           "white",
                  padding:         "8px 14px",
                  borderRadius:    "8px",
                  border:          "none",
                  fontWeight:      "600",
                  fontSize:        "0.85rem",
                  cursor:          "pointer"
                }}
              >
                {clearing ? "Clearing..." : "Yes, clear it"}
              </button>
            </div>
          ) : (
            <button
              onClick={handleClear}
              style={{
                backgroundColor: "#C0392B",
                color:           "#fcf7f7",
                padding:         "8px 16px",
                borderRadius:    "8px",
                border:          "2px solid #C0392B",
                fontWeight:      "600",
                fontSize:        "0.9rem",
                cursor:          "pointer"
              }}
            >
              Clear History
            </button>
          )
        )}

        {/* Mood History button */}
        <a href="/history" style={{
          backgroundColor: "#C0392B",
          color:           "white",
          padding:         "8px 16px",
          borderRadius:    "8px",
          textDecoration:  "none",
          fontWeight:      "600",
          fontSize:        "0.9rem"
        }}>
          Mood History
        </a>

      </div>
    </nav>
  );
}
