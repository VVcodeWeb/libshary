/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type BookModel = {
  __typename?: 'BookModel';
  authors: Array<Scalars['String']['output']>;
  categories?: Maybe<Array<Scalars['String']['output']>>;
  description?: Maybe<Scalars['String']['output']>;
  googleBookId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  imageLinks?: Maybe<Scalars['String']['output']>;
  isbn10?: Maybe<Scalars['String']['output']>;
  isbn13?: Maybe<Scalars['String']['output']>;
  pageCount?: Maybe<Scalars['Float']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  publisher?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type CreateSectionBookInput = {
  googleBookId: Scalars['ID']['input'];
  sectionId: Scalars['ID']['input'];
};

export type CreateSectionInput = {
  name: Scalars['String']['input'];
  shelfId: Scalars['ID']['input'];
};

export type CreateShelfInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  defaultSections: Scalars['Boolean']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  private: Scalars['Boolean']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createSection: SectionModel;
  createSectionBook: SectionBookModel;
  createShelf: ShelfModel;
  removeSection: SectionModel;
  removeSectionBook: SectionBookModel;
  removeShelf: ShelfModel;
  updateSection: SectionModel;
  updateSectionBook: SectionBookModel;
  updateShelf: ShelfModel;
};


export type MutationCreateSectionArgs = {
  createSectionInput: CreateSectionInput;
};


export type MutationCreateSectionBookArgs = {
  createSectionBookInput: CreateSectionBookInput;
};


export type MutationCreateShelfArgs = {
  createShelfInput: CreateShelfInput;
};


export type MutationRemoveSectionArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveSectionBookArgs = {
  bookId: Scalars['String']['input'];
  sectionId: Scalars['String']['input'];
};


export type MutationRemoveShelfArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateSectionArgs = {
  id: Scalars['String']['input'];
  updateSectionInput: UpdateSectionInput;
};


export type MutationUpdateSectionBookArgs = {
  id: Scalars['String']['input'];
  updateSectionBookInput: UpdateSectionBookInput;
};


export type MutationUpdateShelfArgs = {
  id: Scalars['String']['input'];
  updateShelfInput: UpdateShelfInput;
};

export type Query = {
  __typename?: 'Query';
  findAllSectionBooks?: Maybe<Array<SectionBookModel>>;
  findAllSections?: Maybe<Array<SectionModel>>;
  findAllShelves?: Maybe<Array<ShelfModel>>;
  findBook?: Maybe<BookModel>;
  findSection?: Maybe<SectionModel>;
  findSectionBooks?: Maybe<Array<SectionBookModel>>;
  findShelf?: Maybe<ShelfModel>;
  searchBooks?: Maybe<SearchResponseDto>;
};


export type QueryFindBookArgs = {
  googleBookId?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryFindSectionArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindSectionBooksArgs = {
  sectionId: Scalars['String']['input'];
};


export type QueryFindShelfArgs = {
  id: Scalars['String']['input'];
};


export type QuerySearchBooksArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type SearchResponseDto = {
  __typename?: 'SearchResponseDto';
  apiProvider: Scalars['String']['output'];
  books: Array<BookModel>;
  limit: Scalars['Float']['output'];
  offset: Scalars['Float']['output'];
  totalNumber: Scalars['Float']['output'];
};

export type SectionBookModel = {
  __typename?: 'SectionBookModel';
  book: BookModel;
  bookId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  section: SectionModel;
  sectionId: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type SectionModel = {
  __typename?: 'SectionModel';
  books: Array<SectionBookModel>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  shelf: ShelfModel;
  shelfId: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ShelfModel = {
  __typename?: 'ShelfModel';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  ownerId: Scalars['String']['output'];
  private: Scalars['Boolean']['output'];
  sections: Array<SectionModel>;
  updatedAt: Scalars['DateTime']['output'];
};

export type UpdateSectionBookInput = {
  sectionId: Scalars['String']['input'];
};

export type UpdateSectionInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateShelfInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  private?: InputMaybe<Scalars['Boolean']['input']>;
};

export type BookFragmentFragment = { __typename?: 'BookModel', id: string, title: string, authors: Array<string>, description?: string | null, publisher?: string | null, pageCount?: number | null, imageLinks?: string | null, isbn10?: string | null, isbn13?: string | null, googleBookId?: string | null, categories?: Array<string> | null } & { ' $fragmentName'?: 'BookFragmentFragment' };

export type ShelfPage_QueryQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type ShelfPage_QueryQuery = { __typename?: 'Query', findShelf?: (
    { __typename?: 'ShelfModel' }
    & { ' $fragmentRefs'?: { 'ShelfPageHeader_QueryFragmentFragment': ShelfPageHeader_QueryFragmentFragment;'ShelfPageContent_QueryFragmentFragment': ShelfPageContent_QueryFragmentFragment } }
  ) | null };

export type GetAllShelvesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllShelvesQuery = (
  { __typename?: 'Query' }
  & { ' $fragmentRefs'?: { 'ShelvesList_QueryFragmentFragment': ShelvesList_QueryFragmentFragment } }
);

export type BookCard_BookFragmentFragment = { __typename?: 'BookModel', id: string, title: string, authors: Array<string>, description?: string | null, publisher?: string | null, pageCount?: number | null, imageLinks?: string | null, isbn10?: string | null, isbn13?: string | null, googleBookId?: string | null, categories?: Array<string> | null } & { ' $fragmentName'?: 'BookCard_BookFragmentFragment' };

export type AddBookSections_QueryQueryVariables = Exact<{
  shelfId: Scalars['String']['input'];
}>;


export type AddBookSections_QueryQuery = { __typename?: 'Query', findShelf?: (
    { __typename?: 'ShelfModel' }
    & { ' $fragmentRefs'?: { 'DetailsStep_SectionsFragmentFragment': DetailsStep_SectionsFragmentFragment } }
  ) | null };

export type DetailsStep_SectionsFragmentFragment = { __typename?: 'ShelfModel', sections: Array<(
    { __typename?: 'SectionModel', id: string }
    & { ' $fragmentRefs'?: { 'SectionSelectionItem_SectionFragmentFragment': SectionSelectionItem_SectionFragmentFragment } }
  )> } & { ' $fragmentName'?: 'DetailsStep_SectionsFragmentFragment' };

export type CreateSectionBookMutationVariables = Exact<{
  createSectionBookInput: CreateSectionBookInput;
}>;


export type CreateSectionBookMutation = { __typename?: 'Mutation', createSectionBook: { __typename?: 'SectionBookModel', id: string, sectionId: string, bookId: string, createdAt: any, updatedAt: any } };

export type SectionSelectionItem_SectionFragmentFragment = { __typename?: 'SectionModel', id: string, name: string } & { ' $fragmentName'?: 'SectionSelectionItem_SectionFragmentFragment' };

export type BookSearchItem_QueryFragmentFragment = { __typename?: 'BookModel', title: string, authors: Array<string>, publishedAt?: any | null, publisher?: string | null, imageLinks?: string | null, googleBookId?: string | null } & { ' $fragmentName'?: 'BookSearchItem_QueryFragmentFragment' };

export type SearchBooks_QueryQueryVariables = Exact<{
  query: Scalars['String']['input'];
}>;


export type SearchBooks_QueryQuery = { __typename?: 'Query', searchBooks?: { __typename?: 'SearchResponseDto', totalNumber: number, books: Array<(
      { __typename?: 'BookModel', googleBookId?: string | null }
      & { ' $fragmentRefs'?: { 'BookSearchItem_QueryFragmentFragment': BookSearchItem_QueryFragmentFragment } }
    )> } | null };

export type CreateSectionMutationVariables = Exact<{
  createSectionInput: CreateSectionInput;
}>;


export type CreateSectionMutation = { __typename?: 'Mutation', createSection: { __typename?: 'SectionModel', id: string, name: string } };

export type CreateShelfMutationVariables = Exact<{
  createShelfInput: CreateShelfInput;
}>;


export type CreateShelfMutation = { __typename?: 'Mutation', createShelf: { __typename?: 'ShelfModel', id: string, name: string } };

export type ShelfPageContent_QueryFragmentFragment = { __typename?: 'ShelfModel', sections: Array<(
    { __typename?: 'SectionModel', id: string }
    & { ' $fragmentRefs'?: { 'SectionView_SectionFragmentFragment': SectionView_SectionFragmentFragment } }
  )> } & { ' $fragmentName'?: 'ShelfPageContent_QueryFragmentFragment' };

export type ShelfPageHeader_QueryFragmentFragment = { __typename?: 'ShelfModel', id: string, name: string, private: boolean } & { ' $fragmentName'?: 'ShelfPageHeader_QueryFragmentFragment' };

export type UpdateShelfMutationVariables = Exact<{
  id: Scalars['String']['input'];
  updateShelfInput: UpdateShelfInput;
}>;


export type UpdateShelfMutation = { __typename?: 'Mutation', updateShelf: { __typename?: 'ShelfModel', id: string, name: string } };

export type RemoveShelfMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveShelfMutation = { __typename?: 'Mutation', removeShelf: { __typename?: 'ShelfModel', id: string } };

export type UpdateSectionMutationVariables = Exact<{
  id: Scalars['String']['input'];
  updateSectionInput: UpdateSectionInput;
}>;


export type UpdateSectionMutation = { __typename?: 'Mutation', updateSection: { __typename?: 'SectionModel', id: string, name: string } };

export type RemoveSectionMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveSectionMutation = { __typename?: 'Mutation', removeSection: { __typename?: 'SectionModel', id: string } };

export type SectionView_SectionFragmentFragment = { __typename?: 'SectionModel', id: string, name: string, books: Array<{ __typename?: 'SectionBookModel', id: string, book: (
      { __typename?: 'BookModel' }
      & { ' $fragmentRefs'?: { 'BookCard_BookFragmentFragment': BookCard_BookFragmentFragment } }
    ) }> } & { ' $fragmentName'?: 'SectionView_SectionFragmentFragment' };

export type SectionsList_SectionFragmentFragment = { __typename?: 'ShelfModel', sections: Array<(
    { __typename?: 'SectionModel', id: string }
    & { ' $fragmentRefs'?: { 'SectionsListItem_SectionFragmentFragment': SectionsListItem_SectionFragmentFragment } }
  )> } & { ' $fragmentName'?: 'SectionsList_SectionFragmentFragment' };

export type SectionsListItem_SectionFragmentFragment = { __typename?: 'SectionModel', id: string, name: string } & { ' $fragmentName'?: 'SectionsListItem_SectionFragmentFragment' };

export type ShelvesList_QueryFragmentFragment = { __typename?: 'Query', findAllShelves?: Array<(
    { __typename?: 'ShelfModel', id: string }
    & { ' $fragmentRefs'?: { 'ShelvesListItem_ShelfFragmentFragment': ShelvesListItem_ShelfFragmentFragment } }
  )> | null } & { ' $fragmentName'?: 'ShelvesList_QueryFragmentFragment' };

export type ShelvesListItem_ShelfFragmentFragment = (
  { __typename?: 'ShelfModel', id: string, name: string, description?: string | null, private: boolean, ownerId: string, createdAt: any, updatedAt: any }
  & { ' $fragmentRefs'?: { 'SectionsList_SectionFragmentFragment': SectionsList_SectionFragmentFragment } }
) & { ' $fragmentName'?: 'ShelvesListItem_ShelfFragmentFragment' };

export const BookFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BookFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BookModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"authors"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"publisher"}},{"kind":"Field","name":{"kind":"Name","value":"pageCount"}},{"kind":"Field","name":{"kind":"Name","value":"imageLinks"}},{"kind":"Field","name":{"kind":"Name","value":"isbn10"}},{"kind":"Field","name":{"kind":"Name","value":"isbn13"}},{"kind":"Field","name":{"kind":"Name","value":"googleBookId"}},{"kind":"Field","name":{"kind":"Name","value":"categories"}}]}}]} as unknown as DocumentNode<BookFragmentFragment, unknown>;
export const SectionSelectionItem_SectionFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionSelectionItem_SectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SectionModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<SectionSelectionItem_SectionFragmentFragment, unknown>;
export const DetailsStep_SectionsFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DetailsStep_SectionsFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ShelfModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionSelectionItem_SectionFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionSelectionItem_SectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SectionModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<DetailsStep_SectionsFragmentFragment, unknown>;
export const BookSearchItem_QueryFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BookSearchItem_QueryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BookModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"authors"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"publisher"}},{"kind":"Field","name":{"kind":"Name","value":"imageLinks"}},{"kind":"Field","name":{"kind":"Name","value":"googleBookId"}}]}}]} as unknown as DocumentNode<BookSearchItem_QueryFragmentFragment, unknown>;
export const BookCard_BookFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BookCard_BookFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BookModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"authors"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"publisher"}},{"kind":"Field","name":{"kind":"Name","value":"pageCount"}},{"kind":"Field","name":{"kind":"Name","value":"imageLinks"}},{"kind":"Field","name":{"kind":"Name","value":"isbn10"}},{"kind":"Field","name":{"kind":"Name","value":"isbn13"}},{"kind":"Field","name":{"kind":"Name","value":"googleBookId"}},{"kind":"Field","name":{"kind":"Name","value":"categories"}}]}}]} as unknown as DocumentNode<BookCard_BookFragmentFragment, unknown>;
export const SectionView_SectionFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionView_SectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SectionModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"books"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"book"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BookCard_BookFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BookCard_BookFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BookModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"authors"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"publisher"}},{"kind":"Field","name":{"kind":"Name","value":"pageCount"}},{"kind":"Field","name":{"kind":"Name","value":"imageLinks"}},{"kind":"Field","name":{"kind":"Name","value":"isbn10"}},{"kind":"Field","name":{"kind":"Name","value":"isbn13"}},{"kind":"Field","name":{"kind":"Name","value":"googleBookId"}},{"kind":"Field","name":{"kind":"Name","value":"categories"}}]}}]} as unknown as DocumentNode<SectionView_SectionFragmentFragment, unknown>;
export const ShelfPageContent_QueryFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ShelfPageContent_QueryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ShelfModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionView_SectionFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BookCard_BookFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BookModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"authors"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"publisher"}},{"kind":"Field","name":{"kind":"Name","value":"pageCount"}},{"kind":"Field","name":{"kind":"Name","value":"imageLinks"}},{"kind":"Field","name":{"kind":"Name","value":"isbn10"}},{"kind":"Field","name":{"kind":"Name","value":"isbn13"}},{"kind":"Field","name":{"kind":"Name","value":"googleBookId"}},{"kind":"Field","name":{"kind":"Name","value":"categories"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionView_SectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SectionModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"books"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"book"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BookCard_BookFragment"}}]}}]}}]}}]} as unknown as DocumentNode<ShelfPageContent_QueryFragmentFragment, unknown>;
export const ShelfPageHeader_QueryFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ShelfPageHeader_QueryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ShelfModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"private"}}]}}]} as unknown as DocumentNode<ShelfPageHeader_QueryFragmentFragment, unknown>;
export const SectionsListItem_SectionFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionsListItem_SectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SectionModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<SectionsListItem_SectionFragmentFragment, unknown>;
export const SectionsList_SectionFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionsList_SectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ShelfModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionsListItem_SectionFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionsListItem_SectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SectionModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<SectionsList_SectionFragmentFragment, unknown>;
export const ShelvesListItem_ShelfFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ShelvesListItem_ShelfFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ShelfModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"private"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionsList_SectionFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionsListItem_SectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SectionModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionsList_SectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ShelfModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionsListItem_SectionFragment"}}]}}]}}]} as unknown as DocumentNode<ShelvesListItem_ShelfFragmentFragment, unknown>;
export const ShelvesList_QueryFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ShelvesList_QueryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Query"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findAllShelves"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ShelvesListItem_ShelfFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionsListItem_SectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SectionModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionsList_SectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ShelfModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionsListItem_SectionFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ShelvesListItem_ShelfFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ShelfModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"private"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionsList_SectionFragment"}}]}}]} as unknown as DocumentNode<ShelvesList_QueryFragmentFragment, unknown>;
export const ShelfPage_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ShelfPage_Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findShelf"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ShelfPageHeader_QueryFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ShelfPageContent_QueryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BookCard_BookFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BookModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"authors"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"publisher"}},{"kind":"Field","name":{"kind":"Name","value":"pageCount"}},{"kind":"Field","name":{"kind":"Name","value":"imageLinks"}},{"kind":"Field","name":{"kind":"Name","value":"isbn10"}},{"kind":"Field","name":{"kind":"Name","value":"isbn13"}},{"kind":"Field","name":{"kind":"Name","value":"googleBookId"}},{"kind":"Field","name":{"kind":"Name","value":"categories"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionView_SectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SectionModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"books"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"book"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BookCard_BookFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ShelfPageHeader_QueryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ShelfModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"private"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ShelfPageContent_QueryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ShelfModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionView_SectionFragment"}}]}}]}}]} as unknown as DocumentNode<ShelfPage_QueryQuery, ShelfPage_QueryQueryVariables>;
export const GetAllShelvesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllShelves"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ShelvesList_QueryFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionsListItem_SectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SectionModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionsList_SectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ShelfModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionsListItem_SectionFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ShelvesListItem_ShelfFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ShelfModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"private"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionsList_SectionFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ShelvesList_QueryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Query"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findAllShelves"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ShelvesListItem_ShelfFragment"}}]}}]}}]} as unknown as DocumentNode<GetAllShelvesQuery, GetAllShelvesQueryVariables>;
export const AddBookSections_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AddBookSections_Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"shelfId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findShelf"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"shelfId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DetailsStep_SectionsFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionSelectionItem_SectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SectionModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DetailsStep_SectionsFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ShelfModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionSelectionItem_SectionFragment"}}]}}]}}]} as unknown as DocumentNode<AddBookSections_QueryQuery, AddBookSections_QueryQueryVariables>;
export const CreateSectionBookDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSectionBook"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createSectionBookInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSectionBookInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSectionBook"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createSectionBookInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createSectionBookInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sectionId"}},{"kind":"Field","name":{"kind":"Name","value":"bookId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateSectionBookMutation, CreateSectionBookMutationVariables>;
export const SearchBooks_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchBooks_Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchBooks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"q"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalNumber"}},{"kind":"Field","name":{"kind":"Name","value":"books"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"googleBookId"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BookSearchItem_QueryFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BookSearchItem_QueryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BookModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"authors"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"publisher"}},{"kind":"Field","name":{"kind":"Name","value":"imageLinks"}},{"kind":"Field","name":{"kind":"Name","value":"googleBookId"}}]}}]} as unknown as DocumentNode<SearchBooks_QueryQuery, SearchBooks_QueryQueryVariables>;
export const CreateSectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createSectionInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSectionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createSectionInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createSectionInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateSectionMutation, CreateSectionMutationVariables>;
export const CreateShelfDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateShelf"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createShelfInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateShelfInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createShelf"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createShelfInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createShelfInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateShelfMutation, CreateShelfMutationVariables>;
export const UpdateShelfDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateShelf"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateShelfInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateShelfInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateShelf"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"updateShelfInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateShelfInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateShelfMutation, UpdateShelfMutationVariables>;
export const RemoveShelfDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveShelf"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeShelf"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RemoveShelfMutation, RemoveShelfMutationVariables>;
export const UpdateSectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateSectionInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSectionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"updateSectionInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateSectionInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateSectionMutation, UpdateSectionMutationVariables>;
export const RemoveSectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveSection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeSection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RemoveSectionMutation, RemoveSectionMutationVariables>;