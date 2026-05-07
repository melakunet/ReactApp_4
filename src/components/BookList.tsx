/**
 * BookList.tsx
 * Gets the list of books from the global store and renders
 * a VoteCard for each one. Because both this component and the
 * Header read from the same Zustand store, any vote update is
 * instantly reflected in both places without passing props around.
 */
'use client';

import { useVoteStore } from '@/state/useVoteStore';
import { VoteCard } from './VoteCard';

/**
 * BookList
 * Reads the books array from the store and maps over it.
 * Each book gets its own VoteCard using the book's id as the key.
 */
export function BookList() {
  // Subscribe to the books array in the global store
  const books = useVoteStore((state) => state.books);

  return (
    <main style={styles.grid}>
      {/* Loop through books — index + 1 gives the rank (store keeps them sorted by votes) */}
      {books.map((book, index) => (
        <VoteCard key={book.id} book={book} rank={index + 1} />
      ))}
    </main>
  );
}

/** Grid layout so the cards line up nicely on any screen size */
const styles: Record<string, React.CSSProperties> = {
  grid: {
    display: 'grid',
    // 200px min keeps cards narrow enough to show 4–5 per row on wide screens
    // but they grow to fill space — each card will be portrait/book-shaped
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '32px',
    padding: '40px 36px',
    backgroundColor: '#0a0a1a',
    minHeight: 'calc(100vh - 72px)',
  },
};
