/**
 * VoteCard.tsx
 * This is the main reusable widget for the voting app.
 * It takes a single book as a prop and shows its title,
 * author, current vote count, and two buttons to vote up or down.
 * I reuse this same component for every book in the list.
 * The vote state lives in the global Zustand store, so when the
 * vote count changes here it also updates the total in the Header.
 */
'use client';

import { useVoteStore } from '@/state/useVoteStore';
import type { Book } from '@/state/types';

/** Props for the VoteCard component */
type VoteCardProps = {
  /** The book object to display */
  book: Book;
};

/**
 * VoteCard
 * Renders the voting card for one book.
 * I'm pulling only upvote and downvote from the store here
 * because the vote count itself comes in through the book prop.
 */
export function VoteCard({ book }: VoteCardProps) {
  // Get the two action functions from the global store
  const upvote   = useVoteStore((state) => state.upvote);
  const downvote = useVoteStore((state) => state.downvote);

  return (
    <div style={styles.card}>
      {/* Book title */}
      <h2 style={styles.title}>{book.title}</h2>

      {/* Book author */}
      <p style={styles.author}>by {book.author}</p>

      {/* Vote count display */}
      <p style={styles.voteCount} data-testid="vote-count">
        Votes: <strong>{book.votes}</strong>
      </p>

      {/* Action buttons */}
      <div style={styles.buttons}>
        {/* Upvote button — passes this book's id to the store action */}
        <button
          style={{ ...styles.btn, ...styles.upBtn }}
          onClick={() => upvote(book.id)}
          aria-label={`Upvote ${book.title}`}
        >
          👍 Upvote
        </button>

        {/* Downvote button — the store makes sure votes don't go below 0 */}
        <button
          style={{ ...styles.btn, ...styles.downBtn }}
          onClick={() => downvote(book.id)}
          aria-label={`Downvote ${book.title}`}
        >
          👎 Downvote
        </button>
      </div>
    </div>
  );
}

/** Card styles — I used inline styles to keep everything in one file */
const styles: Record<string, React.CSSProperties> = {
  card: {
    backgroundColor: '#16213e',
    border: '1px solid #0f3460',
    borderRadius: '10px',
    padding: '20px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    color: '#eee',
    minWidth: '260px',
  },
  title: {
    margin: 0,
    fontSize: '1.1rem',
    color: '#e94560',
  },
  author: {
    margin: 0,
    fontSize: '0.85rem',
    color: '#aaa',
  },
  voteCount: {
    margin: '4px 0',
    fontSize: '1rem',
  },
  buttons: {
    display: 'flex',
    gap: '10px',
    marginTop: '8px',
  },
  btn: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    transition: 'opacity 0.2s',
  },
  upBtn: {
    backgroundColor: '#0f3460',
    color: '#fff',
  },
  downBtn: {
    backgroundColor: '#333',
    color: '#fff',
  },
};
