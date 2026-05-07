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
 * I hard-coded the list here to keep things simple.
 * In a real project this would come from an API call.
 */
const initialBooks: Book[] = [
  { id: '1', title: 'Clean Code',               author: 'Robert C. Martin', votes: 0 },
  { id: '2', title: 'The Pragmatic Programmer',  author: 'David Thomas',     votes: 0 },
  { id: "3", title: "You Don't Know JS",         author: 'Kyle Simpson',     votes: 0 },
  { id: '4', title: 'Eloquent JavaScript',       author: 'Marijn Haverbeke', votes: 0 },
  { id: '5', title: 'Refactoring',               author: 'Martin Fowler',    votes: 0 },
];

/**
 * useVoteStore
 * The hook I call in any component that needs to read or change vote data.
 *
 * Usage example:
 *   const books  = useVoteStore((state) => state.books);
 *   const upvote = useVoteStore((state) => state.upvote);
 */
export const useVoteStore = create<VoteState>((set, get) => ({
  // ----- State -----

  /** The books array — each book tracks its own vote count */
  books: initialBooks,

  /**
   * totalVotes — I compute this on the fly by summing all book votes.
   * get() reads the current state so this always reflects the latest counts.
   */
  get totalVotes() {
    return get().books.reduce((sum, book) => sum + book.votes, 0);
  },

  // ----- Actions -----

  /**
   * upvote — adds one vote to the book that matches the given id.
   * I use .map() so the rest of the books stay unchanged (immutable update).
   */
  upvote: (id: string) =>
    set((state) => ({
      books: state.books.map((book) =>
        book.id === id
          ? { ...book, votes: book.votes + 1 } // this is the book being voted
          : book,                               // all other books stay the same
      ),
    })),

  /**
   * downvote — removes one vote, but never goes below 0.
   * Math.max(0, ...) handles the floor so I don't need an if-statement.
   */
  downvote: (id: string) =>
    set((state) => ({
      books: state.books.map((book) =>
        book.id === id
          ? { ...book, votes: Math.max(0, book.votes - 1) } // min vote is 0
          : book,
      ),
    })),
}));
