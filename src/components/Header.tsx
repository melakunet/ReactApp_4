/**
 * Header.tsx
 * The top bar. Shows the app name, a subtitle, the live total vote count,
 * and the name of the current #1 most-voted book.
 */
'use client';

import { useVoteStore } from '@/state/useVoteStore';

export function Header() {
  // Read the total votes and the full books list from the store
  const totalVotes = useVoteStore((state) => state.totalVotes);
  const books      = useVoteStore((state) => state.books);

  // The store keeps books sorted by votes, so index 0 is always the leader
  const topBook = books[0];

  return (
    <header style={styles.header}>
      {/* Left side — app title and subtitle */}
      <div>
        <h1 style={styles.title}>📚 Book Voting</h1>
        <p style={styles.subtitle}>Vote for your favourite programming book</p>
      </div>

      {/* Right side — leader name and total votes */}
      <div style={styles.right}>
        {/* Only show the leader badge once at least one vote has been cast */}
        {topBook && topBook.votes > 0 && (
          <span style={styles.leader}>
            🥇 {topBook.title}
          </span>
        )}
        <span style={styles.badge}>
          Total Votes: <strong>{totalVotes}</strong>
        </span>
      </div>
    </header>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 32px',
    backgroundColor: '#1a1a2e',
    color: '#eee',
    borderBottom: '3px solid #e94560',
    flexWrap: 'wrap',
    gap: '12px',
  },
  title: {
    margin: 0,
    fontSize: '1.5rem',
    letterSpacing: '0.5px',
  },
  subtitle: {
    margin: '2px 0 0',
    fontSize: '0.8rem',
    color: '#888',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  },
  leader: {
    fontSize: '0.85rem',
    backgroundColor: 'rgba(255,210,0,0.15)',
    border: '1px solid #ffd200',
    color: '#ffd200',
    padding: '5px 12px',
    borderRadius: '20px',
    fontWeight: 600,
    maxWidth: '220px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  badge: {
    fontSize: '0.95rem',
    backgroundColor: '#e94560',
    padding: '6px 14px',
    borderRadius: '20px',
    color: '#fff',
    whiteSpace: 'nowrap',
  },
};
