export default function QuoteCard({ quote }) {
  if (!quote) return null;

  return (
    <div style={{
      background:   "linear-gradient(to right, #eef2ff, #f5f3ff)",
      borderRadius: "16px",
      boxShadow:    "0 4px 6px rgba(0,0,0,0.07)",
      padding:      "32px"
    }}>
      <p style={{
        color:          "#374151",
        fontSize:       "1.1rem",
        fontStyle:      "italic",
        lineHeight:     "1.7",
        marginBottom:   "16px"
      }}>
        "{quote.quote}"
      </p>
      <p style={{
        color:      "#6366f1",
        fontWeight: "600",
        textAlign:  "right"
      }}>
        — {quote.author}
      </p>
    </div>
  );
}
