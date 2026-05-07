/**
 * types.ts
 * I put all the shared TypeScript types in one place so I can
 * import them into both the store and the context without repeating myself.
 */

/** One book entry in the voting list */
export type Book = {
  id: string;
  title: string;
  author: string;
  votes: number; // starts at 0, goes up or down as users vote
};

/**
 * VoteState
 * The shape of the global state — used by both the Zustand store
 * and the React Context so they stay consistent with each other.
 */
export type VoteState = {
  books: Book[];        // all books with their current vote counts
  totalVotes: number;  // sum of all votes across every book
  upvote: (id: string) => void;   // add one vote to a book
  downvote: (id: string) => void; // remove one vote from a book (min 0)
};
