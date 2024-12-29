import { useSteps } from "./useSteps";

export type AddBookData = {
  id: string;
  title?: string;
  authors?: string[];
  imageLink?: string;
  pageCount?: number;
  publihedDate?: string;
  publisher?: string;
};

export type AddBookSteps = "search" | "details";

export const useAddBookSteps = () => useSteps<AddBookData, AddBookSteps>();
