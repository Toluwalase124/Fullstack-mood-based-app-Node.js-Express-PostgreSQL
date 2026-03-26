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
      <a href="/history" style={{ color: '#4b5563', textDecoration: 'none' }}>
        Mood History
      </a>
    </nav>
  );
}
