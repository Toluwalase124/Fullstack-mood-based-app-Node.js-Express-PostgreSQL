export default function MoodCard({ mood }) {
  if (!mood) return null;

  return (
    <div style={{
      backgroundColor: "white",
      borderRadius:    "16px",
      boxShadow:       "0 4px 6px rgba(0,0,0,0.07)",
      padding:         "32px",
      textAlign:       "center"
    }}>
      <div style={{ fontSize: "4rem", marginBottom: "16px" }}>
        {mood.emoji}
      </div>
      <h2 style={{
        fontSize:     "1.5rem",
        fontWeight:   "bold",
        color:        "#1f2937",
        marginBottom: "16px"
      }}>
        {mood.message}
      </h2>
      <div style={{
        backgroundColor: "#eef2ff",
        borderRadius:    "12px",
        padding:         "8px 24px",
        display:         "inline-block"
      }}>
        <span style={{ color: "#4f46e5", fontWeight: "600", fontSize: "1.1rem" }}>
          🎵  {mood.playlist}
        </span>
      </div>
    </div>
  );
}
