/**
 * page.tsx
 * Home page — the entry point at the "/" route.
 * Renders the Header, an intro banner, the BookList, and the Footer.
 */
import { Header }   from '@/components/Header';
import { BookList } from '@/components/BookList';
import { Footer }   from '@/components/Footer';

export default function Home() {
  return (
    // flex column so footer is always pushed to the bottom
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#0a0a1a' }}>

      {/* ── Top navigation bar ── */}
      <Header />

      {/* ── Intro banner ── */}
      <section style={introStyles.banner}>
        <h2 style={introStyles.heading}>🗳️ Cast Your Vote</h2>
        <p style={introStyles.body}>
          Below are 12 essential programming books every developer should know.
          Upvote the ones you love, downvote the ones you&#39;d skip — the
          leaderboard updates live as you vote. Hover over any cover to read a
          quick summary of the book.
        </p>
        <p style={introStyles.hint}>
          📌 The #1 ranked book appears in the header. Try voting to see the
          leaderboard re-sort in real time!
        </p>
      </section>

      {/* ── Book grid ── */}
      <BookList />

      {/* ── Footer ── */}
      <Footer />

    </div>
  );
}

/** Inline styles for the intro banner only */
const introStyles: Record<string, React.CSSProperties> = {
  banner: {
    maxWidth: '860px',
    margin: '40px auto 0',
    padding: '28px 36px',
    backgroundColor: '#16213e',
    border: '1px solid #0f3460',
    borderRadius: '14px',
    textAlign: 'center',
  },
  heading: {
    margin: '0 0 12px',
    fontSize: '1.4rem',
    color: '#eee',
    fontWeight: 700,
  },
  body: {
    margin: '0 0 12px',
    fontSize: '0.95rem',
    color: '#aaa',
    lineHeight: 1.7,
  },
  hint: {
    margin: 0,
    fontSize: '0.85rem',
    color: '#ffd200',
    backgroundColor: 'rgba(255,210,0,0.08)',
    border: '1px solid rgba(255,210,0,0.2)',
    borderRadius: '8px',
    padding: '10px 16px',
    display: 'inline-block',
  },
};
