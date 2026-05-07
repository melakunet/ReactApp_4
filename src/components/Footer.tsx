/**
 * Footer.tsx
 * A simple footer that shows the course and assignment details
 * so anyone viewing the app knows the context it was built for.
 */

export function Footer() {
  return (
    <footer style={styles.footer}>
      {/* Divider line matches the header accent colour */}
      <div style={styles.divider} />

      <div style={styles.inner}>
        {/* Course / assignment info */}
        <p style={styles.line}>
          React Development Course &mdash; Assignment 4
        </p>
        <p style={styles.line}>
          <strong style={styles.college}>Trios College, Toronto</strong>
        </p>

        {/* Author credit */}
        <p style={styles.author}>
          Built by&nbsp;<strong style={styles.name}>Etefworkie Melaku</strong>
        </p>

        {/* Tech stack note */}
        <p style={styles.stack}>
          Next.js &middot; TypeScript &middot; Zustand &middot; React Testing Library
        </p>
      </div>
    </footer>
  );
}

const styles: Record<string, React.CSSProperties> = {
  footer: {
    backgroundColor: '#1a1a2e',
    marginTop: 'auto',
  },
  divider: {
    height: '3px',
    background: 'linear-gradient(90deg, #e94560, #0f3460)',
  },
  inner: {
    maxWidth: '1500px',
    margin: '0 auto',
    padding: '28px 36px 32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    textAlign: 'center',
  },
  line: {
    margin: 0,
    fontSize: '0.9rem',
    color: '#aaa',
  },
  college: {
    color: '#e94560',
    fontWeight: 700,
  },
  author: {
    margin: '8px 0 0',
    fontSize: '0.85rem',
    color: '#888',
  },
  name: {
    color: '#ffd200',
    fontWeight: 700,
  },
  stack: {
    margin: '6px 0 0',
    fontSize: '0.75rem',
    color: '#555',
    letterSpacing: '0.5px',
  },
};
