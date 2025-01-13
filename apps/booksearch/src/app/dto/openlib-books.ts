// OpenLibrary does not provide data for a specific edition of a book but instead returns aggregated information about all editions of the book.
// For example, a search for "Harry Potter and the Philosopher's Stone" would include all possible IDs, ISBNs, and other details from various editions.
/**
 * @property covier_i: is id of the cover and has to be fetched separately
 * @property number_of_pages_median is the median of all published editions
 * @property isbn all known isbn's without distinction between 10 and 13
 */
export interface OpenLibBook {
  author_name: string[];
  isbn: string[];
  first_publish_year: string;
  cover_i: string;
  subject_key: string[];
  subject: string[];
  title: string;
  number_of_pages_median: number;
}
export interface OpenLibBookResponse {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: OpenLibBook[];
}

/**
 * Fields that can be fetched from OpenLibrary API
 *
 */
export const openLibBookFields: (keyof OpenLibBook)[] = [
  'author_name',
  'isbn',
  'first_publish_year',
  'cover_i',
  'subject_key',
  'subject',
  'title',
  'number_of_pages_median',
];
