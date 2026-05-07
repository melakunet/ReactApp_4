/**
 * useVoteStore.tsx
 * This is the global state store for the voting app, built with Zustand.
 * I chose Zustand because it lets any component read or update state
 * without needing to wrap the app in a Provider or pass props down.
 * The store holds the books array and exposes upvote/downvote actions.
 */
import { create } from 'zustand';
import type { VoteState, Book } from './types';

/**
 * Starting data — all votes begin at 0.
 * Each book has a one-sentence description and a cover colour gradient.
 */
const initialBooks: Book[] = [
  {
    id: '1',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    votes: 0,
    description: 'A guide to writing readable, maintainable code that your teammates will thank you for.',
    coverColor: 'linear-gradient(135deg, #1a1a2e, #e94560)',
    isbn: '9780132350884',
  },
  {
    id: '2',
    title: 'The Pragmatic Programmer',
    author: 'David Thomas & Andrew Hunt',
    votes: 0,
    description: 'Timeless advice on becoming a more effective and adaptable software developer.',
    coverColor: 'linear-gradient(135deg, #0f3460, #533483)',
    isbn: '9780135957059',
  },
  {
    id: '3',
    title: "You Don't Know JS",
    author: 'Kyle Simpson',
    votes: 0,
    description: 'A deep dive into the JavaScript language that challenges what you think you already know.',
    coverColor: 'linear-gradient(135deg, #f7971e, #ffd200)',
    isbn: '9781491904244',
  },
  {
    id: '4',
    title: 'Eloquent JavaScript',
    author: 'Marijn Haverbeke',
    votes: 0,
    description: 'A modern introduction to JavaScript programming with a focus on writing elegant code.',
    coverColor: 'linear-gradient(135deg, #134e5e, #71b280)',
    isbn: '9781593279509',
  },
  {
    id: '5',
    title: 'Refactoring',
    author: 'Martin Fowler',
    votes: 0,
    description: 'The definitive book on improving the design of existing code without changing its behaviour.',
    coverColor: 'linear-gradient(135deg, #373b44, #4286f4)',
    isbn: '9780134757599',
  },
  {
    id: '6',
    title: 'Design Patterns',
    author: 'Gang of Four',
    votes: 0,
    description: 'The classic catalogue of 23 reusable solutions to common software design problems.',
    coverColor: 'linear-gradient(135deg, #c94b4b, #4b134f)',
    isbn: '9780201633610',
  },
  {
    id: '7',
    title: 'The Web Application Hacker\'s Handbook',
    author: 'Stuttard & Pinto',
    votes: 0,
    description: 'A practical guide to finding and exploiting security flaws in web applications.',
    coverColor: 'linear-gradient(135deg, #141e30, #243b55)',
    isbn: '9781118026472',
  },
  {
    id: '8',
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    votes: 0,
    description: 'Distills JavaScript down to the elegant, reliable subset that every developer should master.',
    coverColor: 'linear-gradient(135deg, #f953c6, #b91d73)',
    isbn: '9780596517748',
  },
  {
    id: '9',
    title: 'CSS: The Definitive Guide',
    author: 'Eric A. Meyer',
    votes: 0,
    description: 'The most thorough reference for CSS, covering layout, animation, and modern design techniques.',
    coverColor: 'linear-gradient(135deg, #11998e, #38ef7d)',
    isbn: '9781449393199',
  },
  {
    id: '10',
    title: 'Learning React',
    author: 'Alex Banks & Eve Porcello',
    votes: 0,
    description: 'A hands-on guide to building modern UIs with React, hooks, and the component model.',
    coverColor: 'linear-gradient(135deg, #0052d4, #4364f7)',
    isbn: '9781492051725',
  },
  {
    id: '11',
    title: 'TypeScript Deep Dive',
    author: 'Basarat Ali Syed',
    votes: 0,
    description: 'Goes beyond the basics of TypeScript to help you write safer, more scalable applications.',
    coverColor: 'linear-gradient(135deg, #3a7bd5, #00d2ff)',
    isbn: '9781484244517',
  },
  {
    id: '12',
    title: 'Node.js Design Patterns',
    author: 'Mario Casciaro',
    votes: 0,
    description: 'Teaches proven patterns for writing efficient, scalable back-end applications with Node.js.',
    coverColor: 'linear-gradient(135deg, #56ab2f, #a8e063)',
    isbn: '9781839214110',
  },
];

/**
 * useVoteStore
 * The hook I call in any component that needs to read or change vote data.
 *
 * Usage example:
 *   const books  = useVoteStore((state) => state.books);
 *   const upvote = useVoteStore((state) => state.upvote);
 */
export const useVoteStore = create<VoteState>((set) => ({
  // ----- State -----

  /** The books array — each book tracks its own vote count */
  books: initialBooks,

  // ----- Actions -----

  /**
   * upvote — adds one vote to the book with the given id.
   * The store keeps books in their original stable order — BookList
   * sorts them for display so cards never jump position mid-click.
   */
  upvote: (id: string) =>
    set((state) => ({
      books: state.books.map((book) =>
        book.id === id ? { ...book, votes: book.votes + 1 } : book,
      ),
    })),

  /**
   * downvote — removes one vote, but never below 0.
   * Same stable-order approach as upvote.
   */
  downvote: (id: string) =>
    set((state) => ({
      books: state.books.map((book) =>
        book.id === id
          ? { ...book, votes: Math.max(0, book.votes - 1) }
          : book,
      ),
    })),
}));
