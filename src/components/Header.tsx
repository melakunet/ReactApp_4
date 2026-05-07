/**
 * Header.tsx
 * The top bar of the app. It shows the app name and
 * a live count of all votes that have been cast so far.
 * I'm reading totalVotes from the Zustand store so it
 * updates automatically whenever someone votes on any book.
 */
'use client';

import { useVoteStore } from '@/state/useVoteStore';

/**
 * Header
 * I only subscribe to totalVotes here so the header
 * re-renders only when the total changes, not on every state update.
 */
export function Header() {
  // Pull just the totalVotes value from the global store
  const totalVotes = useVoteStore((state) => state.totalVotes);

  return (
    <header style={styles.header}>
      {/* App title */}
      <h1 style={styles.title}>📚 Book Voting</h1>

      {/* Live total vote count — updates whenever any book is voted on */}
      <span style={styles.badge}>
        Total Votes: <strong>{totalVotes}</strong>
      </span>
    </header>
  );
}

/** Styles for the header bar */
const styles: Record<string, React.CSSProperties> = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 32px',
    backgroundColor: '#1a1a2e',
    color: '#eee',
    borderBottom: '3px solid #e94560',
  },
  title: {
    margin: 0,
    fontSize: '1.6rem',
    letterSpacing: '0.5px',
  },
  badge: {
    fontSize: '1rem',
    backgroundColor: '#e94560',
    padding: '6px 14px',
    borderRadius: '20px',
    color: '#fff',
  },
};
