/**
 * BookList.tsx
 * Gets the list of books from the global store and renders
 * a VoteCard for each one. Because both this component and the
 * Header read from the same Zustand store, any vote update is
 * instantly reflected in both places without passing props around.
 */
'use client';

import { useState, useEffect } from 'react';
import { useVoteStore } from '@/state/useVoteStore';
import { VoteCard } from './VoteCard';
import type { Book } from '@/state/types';

/**
 * BookList
 * Renders one VoteCard per book.
 *
 * Key design decision — two separate concerns:
 *   1. book DATA (votes, title, etc.) — taken live from the store so the
 *      vote counter on each card updates the instant you click.
 *   2. display ORDER (which card is in which grid slot) — updated after a
 *      400ms delay so a card never jumps position mid-animation, which was
 *      making the vote feedback appear on the wrong card.
 */
export function BookList() {
  const books = useVoteStore((state) => state.books);

  // displayOrder holds book IDs in sorted order — updated with a short delay
  // so cards finish their pulse animation before the grid reshuffles.
  const sortedIds = (b: Book[]) =>
    [...b].sort((a, b) => b.votes - a.votes).map((x) => x.id);

  const [displayOrder, setDisplayOrder] = useState<string[]>(() => sortedIds(books));

  useEffect(() => {
    // Wait 400ms after any vote change before reordering the grid.
    // During those 400ms the card stays in place so the pulse/toast/confetti
    // animate on the exact card the user clicked.
    const timer = setTimeout(() => setDisplayOrder(sortedIds(books)), 400);
    return () => clearTimeout(timer);
  }, [books]);

  // Build the display list: order comes from displayOrder (delayed),
  // but the book objects themselves come from the live store (instant votes).
  const sorted = displayOrder
    .map((id) => books.find((b) => b.id === id))
    .filter((b): b is Book => b !== undefined);

  return (
    <section style={styles.page}>
      <main style={styles.grid}>
        {sorted.map((book, index) => (
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
    padding: '36px 36px 48px',  // extra bottom padding before the footer
    maxWidth: '1500px',
    margin: '32px auto 0',      // 32px gap below the intro banner
  },
};
