/**
 * page.tsx
 * Home page — the entry point at the "/" route.
 * I put the Header at the top and the BookList below it.
 * This file itself doesn't need 'use client' because all the
 * interactive logic is handled inside the child components.
 */
import { Header }   from '@/components/Header';
import { BookList } from '@/components/BookList';

/**
 * Home
 * I'm not marking this 'use client' because Next.js App Router
 * lets server components compose client components — each child
 * handles its own interactivity.
 */
export default function Home() {
  return (
    <>
      {/* Header shows the app title and the live total vote count */}
      <Header />

      {/* BookList renders one VoteCard per book using .map() */}
      <BookList />
    </>
  );
}
