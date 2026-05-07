/**
 * VoteCard.test.tsx
 * Unit tests for the VoteCard component.
 * I'm using Jest and React Testing Library to check that the component
 * renders the right content and that the voting buttons work correctly.
 *
 * Tests I wrote:
 *  1. Shows the book title
 *  2. Shows the book author
 *  3. Shows 0 votes at the start
 *  4. Upvote button increases the vote count
 *  5. Downvote button decreases the vote count
 *  6. Vote count stays at 0 if you downvote when already at 0
 *  7. The component works with different book props (reusability check)
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { VoteCard } from './VoteCard';
import { useVoteStore } from '@/state/useVoteStore';
import type { Book } from '@/state/types';

// Reset the Zustand store before every test so one test doesn't affect another
beforeEach(() => {
  // Put all votes back to 0 between tests
  useVoteStore.setState({
    books: [
      { id: '1', title: 'Clean Code', author: 'Robert C. Martin', votes: 0, description: 'A guide to writing clean code.', coverColor: 'linear-gradient(135deg, #1a1a2e, #e94560)' },
      { id: '2', title: 'The Pragmatic Programmer', author: 'David Thomas', votes: 0, description: 'Timeless advice for developers.', coverColor: 'linear-gradient(135deg, #0f3460, #533483)' },
      { id: '3', title: "You Don't Know JS", author: 'Kyle Simpson', votes: 0, description: 'A deep dive into JavaScript.', coverColor: 'linear-gradient(135deg, #f7971e, #ffd200)' },
      { id: '4', title: 'Eloquent JavaScript', author: 'Marijn Haverbeke', votes: 0, description: 'Modern intro to JavaScript.', coverColor: 'linear-gradient(135deg, #134e5e, #71b280)' },
      { id: '5', title: 'Refactoring', author: 'Martin Fowler', votes: 0, description: 'Improving existing code design.', coverColor: 'linear-gradient(135deg, #373b44, #4286f4)' },
    ],
  });
});

// A sample book I reuse in most of the tests below
const testBook: Book = {
  id: '1',
  title: 'Clean Code',
  author: 'Robert C. Martin',
  votes: 0,
  description: 'A guide to writing clean, readable code.',
  coverColor: 'linear-gradient(135deg, #1a1a2e, #e94560)',
};

// Test 1 — title shows up
test('renders the book title', () => {
  render(<VoteCard book={testBook} rank={1} />);
  expect(screen.getByText('Clean Code')).toBeInTheDocument();
});

// Test 2 — author shows up (prefixed with "by ")
test('renders the book author', () => {
  render(<VoteCard book={testBook} rank={1} />);
  expect(screen.getByText('by Robert C. Martin')).toBeInTheDocument();
});

// Test 3 — vote count starts at 0
test('displays the initial vote count', () => {
  render(<VoteCard book={testBook} rank={1} />);
  const voteDisplay = screen.getByTestId('vote-count');
  expect(voteDisplay).toHaveTextContent('0');
});

// Test 4 — clicking upvote adds 1 to the store
test('upvote button increments the vote count', () => {
  render(<VoteCard book={testBook} rank={1} />);

  fireEvent.click(screen.getByRole('button', { name: /upvote clean code/i }));

  const updatedBook = useVoteStore
    .getState()
    .books.find((b) => b.id === '1')!;

  expect(updatedBook.votes).toBe(1);
});

// Test 5 — clicking downvote subtracts 1 from the store
test('downvote button decrements the vote count', () => {
  // Start with 2 votes so there is something to subtract
  useVoteStore.setState({
    books: [{ ...testBook, votes: 2 }],
  });

  render(<VoteCard book={{ ...testBook, votes: 2 }} rank={1} />);

  fireEvent.click(screen.getByRole('button', { name: /downvote clean code/i }));

  const updatedBook = useVoteStore
    .getState()
    .books.find((b) => b.id === '1')!;

  expect(updatedBook.votes).toBe(1);
});

// Test 6 — downvoting at 0 should stay at 0, not go negative
test('vote count cannot go below 0', () => {
  render(<VoteCard book={testBook} rank={1} />);

  fireEvent.click(screen.getByRole('button', { name: /downvote clean code/i }));

  const updatedBook = useVoteStore
    .getState()
    .books.find((b) => b.id === '1')!;

  expect(updatedBook.votes).toBe(0);
});

// Test 7 — the same component works with a completely different book
// This confirms VoteCard is truly reusable and not tied to one set of data
test('VoteCard renders correctly with a different book', () => {
  const anotherBook: Book = {
    id: '99',
    title: 'Eloquent JavaScript',
    author: 'Marijn Haverbeke',
    votes: 5,
    description: 'A modern introduction to JavaScript programming.',
    coverColor: 'linear-gradient(135deg, #134e5e, #71b280)',
  };

  render(<VoteCard book={anotherBook} rank={4} />);

  expect(screen.getByText('Eloquent JavaScript')).toBeInTheDocument();
  expect(screen.getByText('by Marijn Haverbeke')).toBeInTheDocument();
  expect(screen.getByTestId('vote-count')).toHaveTextContent('5');
});
