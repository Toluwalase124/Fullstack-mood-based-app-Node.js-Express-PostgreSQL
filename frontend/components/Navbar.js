export default function Navbar() {
  return (
    <nav style={{
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      padding: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4f46e5' }}>
        🎭 MoodCast
      </h1>
      <nav style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: "16px",
        padding: "12px 20px",
        color: "white",
        boxShadow: "0 4px 15px rgba(101, 127, 243, 0.4)"
      }}>
        <a href="/history" style={{ color: '#e7ecf3', textDecoration: 'none' }}>
          Mood History
        </a>
      </nav>
    </nav>
  );
}
