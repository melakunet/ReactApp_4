/**
 * VoteContext.ts
 * This sets up the React Context for the voting state.
 * I included this to practice the Context API alongside Zustand —
 * both are ways to share state across components without prop drilling.
 * The default values here are just placeholders so TypeScript
 * doesn't complain before the context is provided.
 */
import { createContext } from 'react';
import type { VoteState } from './types';

/**
 * VoteContext
 * The default shape passed to createContext — these are just empty stubs.
 * The real values come from the Zustand store used in each component.
 */
export const VoteContext = createContext<VoteState>({
  books: [],
  upvote: () => {},   // empty default, will be replaced when context is used
  downvote: () => {}, // empty default
});
