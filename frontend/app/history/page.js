"use client";
import HistoryList from "@/components/HistoryList";

export default function HistoryPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#faf8f7' }}>
      <div style={{
        maxWidth: '680px',
        margin:   '0 auto',
        padding:  '48px 16px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{
            fontSize:     '2.5rem',
            fontWeight:   'bold',
            color:        '#190bb7',
            marginBottom: '12px'
          }}>
            Your Mood History
          </h1>
          <p style={{ color: '#060691', fontSize: '1.1rem' }}>
            Every mood you have logged, most recent first
          </p>
        </div>

        <HistoryList />

        <div style={{
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '32px',
  paddingRight: '4px'
}}>
</div>
      </div>
    </div>
  );
}

