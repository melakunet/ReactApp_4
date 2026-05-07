/**
 * books.ts
 * This is the data layer for the app.
 * I modelled it after the way server actions work in Next.js —
 * the 'use server' directive means this runs on the server side.
 * The delay simulates a real network request so the app behaves
 * more like it would with a real database or API.
 */
'use server';

/** How long to wait before returning data (mimics a slow network) */
const DELAY = 800;

/** The type returned by getBooks — just the basic book info, no votes */
export type BookData = {
  id: string;
  title: string;
  author: string;
};

/**
 * getBooks
 * Returns the list of books after a short delay.
 * Vote counts are not included here — they start at 0 in the store.
 */
export async function getBooks(): Promise<BookData[]> {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          { id: '1', title: 'Clean Code',              author: 'Robert C. Martin'  },
          { id: '2', title: 'The Pragmatic Programmer', author: 'David Thomas'      },
          { id: '3', title: 'You Don\'t Know JS',       author: 'Kyle Simpson'      },
          { id: '4', title: 'Eloquent JavaScript',      author: 'Marijn Haverbeke'  },
          { id: '5', title: 'Refactoring',              author: 'Martin Fowler'     },
        ]),
      DELAY,
    ),
  );
}
