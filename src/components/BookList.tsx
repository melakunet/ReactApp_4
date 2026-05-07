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
    // Outer section fills the full page width with the dark background
    <section style={styles.page}>
      <main style={styles.grid}>
        {/* Loop through books — index + 1 gives the rank (store keeps them sorted by votes) */}
        {books.map((book, index) => (
          <VoteCard key={book.id} book={book} rank={index + 1} />
        ))}
      </main>
    </section>
  );
}

/** Grid layout so the cards line up nicely on any screen size */
const styles: Record<string, React.CSSProperties> = {
  // Full-width dark background that fills the whole page below the header
  page: {
    backgroundColor: '#0a0a1a',
    minHeight: 'calc(100vh - 72px)',
  },
  grid: {
    display: 'grid',
    // 280px min → 4 cards on wide screens, 3 on medium, 2 on tablet, 1 on mobile
    // max 340px so cards never stretch too wide and look like proper book covers
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 340px))',
    justifyContent: 'center',  // centre the rows instead of stretching to edges
    gap: '36px',
    padding: '40px 36px',
    maxWidth: '1500px',        // caps grid at ~4 comfortable columns on wide screens
    margin: '0 auto',          // centre the grid on the page
  },
};
