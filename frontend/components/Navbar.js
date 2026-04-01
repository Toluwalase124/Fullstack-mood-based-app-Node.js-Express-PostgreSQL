export default function Navbar() {
  return (
    <nav style={{
      backgroundColor: 'white',
      borderBottom: '3px solid #C0392B',
      padding: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h1 style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#4f46e5',
        margin: 0
      }}>
        🎭 MoodCast
      </h1>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <a
          href="/"
          style={{
            backgroundColor: '#C0392B',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '0.9rem'
          }}
        >
          Home
        </a>

        <a
          href="/history"
          style={{
            backgroundColor: '#C0392B',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '0.9rem'
          }}
        >
          Mood History
        </a>
      </div>

    </nav>
  );
}
