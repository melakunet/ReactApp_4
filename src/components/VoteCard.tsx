/**
 * VoteCard.tsx
 * The reusable voting card component.
 * Each card shows a visual book cover, the title, author, vote count,
 * and upvote/downvote buttons. On hover, a description slides up over
 * the cover so the user can read a one-sentence summary of the book.
 * The rank prop (1, 2, 3...) adds a medal badge to the top books.
 */
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useVoteStore } from '@/state/useVoteStore';
import type { Book } from '@/state/types';

type VoteCardProps = {
  book: Book;
  rank: number;
};

/** One confetti particle */
type Confetto = { id: number; x: string; color: string; dir: 'left' | 'right' | 'up' };

const CONFETTI_COLORS = ['#ffd200', '#e94560', '#38ef7d', '#4364f7', '#f953c6', '#00d2ff'];
const DIRS: Confetto['dir'][] = ['left', 'right', 'up'];

/** Generate a small burst of coloured confetti particles */
function makeConfetti(): Confetto[] {
  return Array.from({ length: 12 }, (_, i) => ({
    id: Date.now() + i,
    x: `${10 + Math.random() * 80}%`,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    dir: DIRS[i % 3],
  }));
}

/** Medal emoji for the top 3 positions */
function getRankBadge(rank: number): string {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return `#${rank}`;
}

/**
 * VoteCard
 * Renders one book with a cover, hover description, rank badge,
 * vote count, and voting buttons. Reused for every book in BookList.
 */
export function VoteCard({ book, rank }: VoteCardProps) {
  const upvote   = useVoteStore((state) => state.upvote);
  const downvote = useVoteStore((state) => state.downvote);

  const [imgError, setImgError]   = useState(false);
  const [hovered, setHovered]     = useState(false);
  const [pulse, setPulse]         = useState<'up' | 'down' | null>(null);

  // Toast message shown briefly after each vote so the user knows it registered
  const [toast, setToast]         = useState<string | null>(null);

  // Confetti particles: each has a unique key, colour, and random position/angle
  const [confetti, setConfetti]   = useState<Confetto[]>([]);

  function handleVote(type: 'up' | 'down') {
    if (type === 'up') {
      upvote(book.id);
      // Launch confetti burst
      setConfetti(makeConfetti());
      setTimeout(() => setConfetti([]), 900);
      // Show toast
      setToast('✓ Upvoted!');
    } else {
      downvote(book.id);
      setToast('✓ Downvoted');
    }
    setPulse(type);
    setTimeout(() => setPulse(null), 300);
    setTimeout(() => setToast(null), 1200);
  }

  const isTop = rank === 1;

  return (
    <div
      style={{
        ...styles.card,
        boxShadow: isTop
          ? '0 0 0 2px #ffd200, 0 8px 32px rgba(255,210,0,0.25)'
          : hovered
          ? '0 12px 40px rgba(0,0,0,0.5)'
          : '0 4px 16px rgba(0,0,0,0.3)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Book cover ── */}
      <div style={{
        ...styles.cover,
        background: imgError ? book.coverColor : undefined,
      }}>

        {/* Real cover image from Open Library — falls back to gradient if load fails */}
        {!imgError && (
          <Image
            src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}
            alt={`Cover of ${book.title}`}
            fill
            style={{ objectFit: 'cover' }}
            onError={() => setImgError(true)}
            sizes="(max-width: 600px) 100vw, 220px"
          />
        )}

        {/* Rank badge — top-left corner */}
        <span style={{
          ...styles.rankBadge,
          fontSize: rank <= 3 ? '1.4rem' : '0.8rem',
          background: rank <= 3 ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.3)',
        }}>
          {getRankBadge(rank)}
        </span>

        {/* Book initials on the cover — only shown when no real image loaded */}
        <span style={styles.coverInitials}>
          {book.title.split(' ').slice(0, 2).map(w => w[0]).join('')}
        </span>

        {/* Description overlay — slides up on hover */}
        <div style={{
          ...styles.descOverlay,
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(12px)',
        }}>
          <p style={styles.descText}>{book.description}</p>
        </div>
      </div>

      {/* ── Card body ── */}
      <div style={{ ...styles.body, position: 'relative' }}>

        {/* Toast notification — confirms the vote registered even if card re-sorts */}
        {toast && (
          <div style={{
            ...styles.toast,
            backgroundColor: pulse === 'up' ? '#38ef7d' : '#e94560',
            color: pulse === 'up' ? '#000' : '#fff',
          }}>
            {toast}
          </div>
        )}

        {/* Confetti particles — burst upward on upvote */}
        {confetti.map((c) => (
          <span key={c.id} style={{
            position: 'absolute',
            left: c.x,
            bottom: '60px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: c.color,
            pointerEvents: 'none',
            animation: `rise-${c.dir} 0.85s ease-out forwards`,
            zIndex: 10,
          }} />
        ))}

        {/* ── Keyframe styles injected once per card ── */}
        <style>{`
          @keyframes rise-left  { 0%{opacity:1;transform:translate(0,0) scale(1)}  100%{opacity:0;transform:translate(-28px,-60px) scale(0.3)} }
          @keyframes rise-right { 0%{opacity:1;transform:translate(0,0) scale(1)}  100%{opacity:0;transform:translate(28px,-60px)  scale(0.3)} }
          @keyframes rise-up    { 0%{opacity:1;transform:translate(0,0) scale(1)}  100%{opacity:0;transform:translate(0px,-70px)   scale(0.3)} }
          @keyframes fadeUp     { 0%{opacity:1;transform:translateX(-50%) translateY(0)}  80%{opacity:1} 100%{opacity:0;transform:translateX(-50%) translateY(-20px)} }
        `}</style>

        {/* Title */}
        <h2 style={{ ...styles.title, color: isTop ? '#ffd200' : '#e94560' }}>
          {book.title}
        </h2>

        {/* Author */}
        <p style={styles.author}>by {book.author}</p>

        {/* Vote count — scales up briefly on vote */}
        <p
          data-testid="vote-count"
          style={{
            ...styles.voteCount,
            transform: pulse ? 'scale(1.35)' : 'scale(1)',
            color: pulse === 'up' ? '#38ef7d' : pulse === 'down' ? '#e94560' : '#eee',
          }}
        >
          {book.votes} {book.votes === 1 ? 'vote' : 'votes'}
        </p>

        {/* Buttons */}
        <div style={styles.buttons}>
          <button
            style={{
              ...styles.btn,
              backgroundColor: pulse === 'up' ? '#38ef7d' : '#0f3460',
              color: pulse === 'up' ? '#000' : '#fff',
            }}
            onClick={() => handleVote('up')}
            aria-label={`Upvote ${book.title}`}
          >
            👍 Upvote
          </button>
          <button
            style={{
              ...styles.btn,
              backgroundColor: pulse === 'down' ? '#e94560' : '#333',
              color: '#fff',
            }}
            onClick={() => handleVote('down')}
            aria-label={`Downvote ${book.title}`}
          >
            👎 Downvote
          </button>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    backgroundColor: '#16213e',
    border: '1px solid #0f3460',
    borderRadius: '14px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.22s ease, box-shadow 0.22s ease',
    cursor: 'default',
  },
  cover: {
    position: 'relative',
    // aspectRatio makes the cover a proper portrait book shape (2:3)
    // so the full cover image is always visible — no cropping at the bottom
    aspectRatio: '2 / 3',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  rankBadge: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    borderRadius: '8px',
    padding: '4px 10px',
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 1.4,
    zIndex: 2,
  },
  coverInitials: {
    fontSize: '4.5rem',
    fontWeight: 900,
    color: 'rgba(255,255,255,0.18)',
    letterSpacing: '4px',
    userSelect: 'none',
    zIndex: 1,
  },
  descOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'rgba(0,0,0,0.82)',
    padding: '14px 16px',
    transition: 'opacity 0.25s ease, transform 0.25s ease',
    zIndex: 3,
  },
  descText: {
    margin: 0,
    fontSize: '0.82rem',
    color: '#ddd',
    lineHeight: 1.5,
  },
  body: {
    padding: '18px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flex: 1,
  },
  title: {
    margin: 0,
    fontSize: '1.05rem',
    fontWeight: 700,
    lineHeight: 1.3,
  },
  author: {
    margin: 0,
    fontSize: '0.82rem',
    color: '#888',
  },
  voteCount: {
    margin: '4px 0',
    fontSize: '1.1rem',
    fontWeight: 700,
    transition: 'transform 0.15s ease, color 0.15s ease',
    color: '#eee',
  },
  buttons: {
    display: 'flex',
    gap: '8px',
    marginTop: '8px',
  },
  btn: {
    flex: 1,
    padding: '9px 0',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '0.85rem',
    transition: 'background-color 0.15s ease, color 0.15s ease',
  },
  toast: {
    position: 'absolute',
    top: '-18px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '4px 14px',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 700,
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    zIndex: 20,
    animation: 'fadeUp 1.2s ease forwards',
  },
};
