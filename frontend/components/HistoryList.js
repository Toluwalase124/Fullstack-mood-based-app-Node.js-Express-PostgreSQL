"use client";
import { useState, useEffect } from "react";

export default function HistoryList() {
  const [moods,   setMoods]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    async function fetchMoods() {
      try {
        const res  = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/moods`
        );
        const data = await res.json();
        setMoods(data.data);
      } catch (err) {
        setError('Failed to load mood history.');
      } finally {
        setLoading(false);
      }
    }
    fetchMoods();
  }, []);

  if (loading) return (
    <p style={{ textAlign: 'center', color: '#4B5563', padding: '40px' }}>
      Loading your mood history...
    </p>
  );

  if (error) return (
    <p style={{ textAlign: 'center', color: '#C0392B', padding: '40px' }}>
      {error}
    </p>
  );

  if (moods.length === 0) return (
    <p style={{ textAlign: 'center', color: '#4B5563', padding: '40px' }}>
      No moods saved yet. Go select one!
    </p>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {moods.map((entry) => (
        <div key={entry.id} style={{
          backgroundColor: 'white',
          borderRadius:    '12px',
          padding:         '20px',
          boxShadow:       '0 2px 4px rgba(0,0,0,0.06)',
          borderLeft:      '3px solid #C0392B',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '2.5rem' }}>{entry.emoji}</span>
            <div>
              <p style={{
                fontWeight: 'bold',
                color: '#1A1A2E',
                textTransform: 'capitalize',
                margin: 0
              }}>
                {entry.mood}
              </p>
              <p style={{
                fontSize: '0.875rem',
                color: '#4B5563',
                margin: '4px 0 0 0'
              }}>
                {entry.message || 'No message'}
              </p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{
              fontSize: '0.75rem',
              color: '#1A1A2E',
              fontWeight: '600',
              margin: 0
            }}>
              {new Date(entry.created_at).toLocaleDateString()}
            </p>
            <p style={{
              fontSize: '0.75rem',
              color: '#C0392B',
              margin: '4px 0 0 0'
            }}>
              {new Date(entry.created_at).toLocaleTimeString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
