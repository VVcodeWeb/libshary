export interface GoogleBooksVolume {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    industryIdentifiers?: Array<{
      type: string;
      identifier: string;
    }>;
    readingModes?: {
      text: boolean;
      image: boolean;
    };
    pageCount?: number;
    printType?: string;
    categories?: string[];
    averageRating?: number;
    ratingsCount?: number;
    maturityRating?: string;
    allowAnonLogging?: boolean;
    contentVersion?: string;
    panelizationSummary?: {
      containsEpubBubbles: boolean;
      containsImageBubbles: boolean;
    };
    imageLinks?: {
      smallThumbnail: string;
      thumbnail: string;
    };
    language?: string;
    previewLink?: string;
    infoLink?: string;
    canonicalVolumeLink?: string;
  };
  saleInfo?: {
    country: string;
    saleability: string;
    isEbook: boolean;
  };
  accessInfo?: {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: string;
    epub?: { isAvailable: boolean; acsTokenLink?: string };
    pdf?: { isAvailable: boolean; acsTokenLink?: string };
    webReaderLink?: string;
    accessViewStatus: string;
    quoteSharingAllowed: boolean;
  };
  searchInfo?: { textSnippet: string };
}

export interface GoogleBooksVolumes {
  kind: string;
  totalItems: number;
  items?: GoogleBooksVolume[];
}

export class GoogleQuery {
  download?: 'epub'; // Only "epub" is supported
  filter?: 'partial' | 'full' | 'free-ebooks' | 'paid-ebooks' | 'ebooks'; // Filter search results by volume type and availability
  langRestrict?: string; // Two-letter ISO-639-1 code (e.g., "en", "fr")
  maxResults?: number; // Max elements to return (Default: 10, Max: 40)
  orderBy?: 'relevance' | 'newest'; // Sort results
  printType?: 'all' | 'books' | 'magazines'; // Restrict to books or magazines
  projection?: 'full' | 'lite'; // Return a subset of fields https://developers.google.com/books/docs/v1/reference/volumes
  q?: string; // Full-text query string
  startIndex?: number; // Position to start the list of results (index starts at 0)
  volumeId?: string; // Identifies a volume associated with the request
}
