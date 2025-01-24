/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n    fragment BookFragment on BookModel {\n      id\n      title\n      authors\n      description\n      publisher\n      pageCount\n      imageLinks\n      isbn10\n      isbn13\n      googleBookId\n      categories\n    }\n  ": types.BookFragmentFragmentDoc,
    "\n    query ShelfPage_Query($id: String!) {\n      findShelf(id: $id) {\n       ...ShelfPageHeader_QueryFragment\n       ...ShelfPageContent_QueryFragment\n      }\n    }\n  ": types.ShelfPage_QueryDocument,
    "\n    query GetAllShelves {\n      ...ShelvesList_QueryFragment\n    }\n  ": types.GetAllShelvesDocument,
    "\n    fragment BookCard_BookFragment on BookModel {\n      id\n      title\n      authors\n      description\n      publisher\n      pageCount\n      imageLinks\n      isbn10\n      isbn13\n      googleBookId\n      categories\n    }\n  ": types.BookCard_BookFragmentFragmentDoc,
    "\n  query AddBookSections_Query($shelfId: String!) {\n    findShelf(id: $shelfId) {\n      ...DetailsStep_SectionsFragment\n    }\n  }\n  ": types.AddBookSections_QueryDocument,
    "\n  fragment DetailsStep_SectionsFragment on ShelfModel {\n    sections {\n      id \n      ...SectionSelectionItem_SectionFragment\n    }\n  }\n": types.DetailsStep_SectionsFragmentFragmentDoc,
    "\n  mutation CreateSectionBook($createSectionBookInput: CreateSectionBookInput!) {\n    createSectionBook(createSectionBookInput: $createSectionBookInput) {\n      id\n      sectionId\n      bookId\n      createdAt\n      updatedAt\n    }\n  }\n": types.CreateSectionBookDocument,
    "\n  fragment SectionSelectionItem_SectionFragment on SectionModel {\n    id\n    name\n  }\n  ": types.SectionSelectionItem_SectionFragmentFragmentDoc,
    "\n  fragment BookSearchItem_QueryFragment on BookModel {\n    title\n    authors\n    publishedAt\n    publisher\n    imageLinks\n    googleBookId\n  }\n  ": types.BookSearchItem_QueryFragmentFragmentDoc,
    "\n  query SearchBooks_Query($query: String!) {\n    searchBooks(q: $query) {\n      totalNumber\n      books {\n        googleBookId\n        ...BookSearchItem_QueryFragment\n\n      }\n    }\n  }\n": types.SearchBooks_QueryDocument,
    "\n  mutation CreateSection($createSectionInput: CreateSectionInput!) {\n    createSection(createSectionInput: $createSectionInput) {\n      id\n      name\n    }\n  }\n": types.CreateSectionDocument,
    "\n  mutation CreateShelf($createShelfInput: CreateShelfInput!) {\n    createShelf(createShelfInput: $createShelfInput) {\n      id\n      name\n    }\n  }\n": types.CreateShelfDocument,
    "\n  fragment ShelfPageContent_QueryFragment on ShelfModel {\n    sections {\n      id\n      ...SectionView_SectionFragment\n    }\n  }\n  ": types.ShelfPageContent_QueryFragmentFragmentDoc,
    "\n  fragment ShelfPageHeader_QueryFragment on ShelfModel {\n    id\n    name\n    private\n  }": types.ShelfPageHeader_QueryFragmentFragmentDoc,
    "\n  mutation UpdateShelf($id: String!, $updateShelfInput: UpdateShelfInput!) {\n    updateShelf(id: $id, updateShelfInput: $updateShelfInput) {\n      id\n      name\n    }\n  }\n": types.UpdateShelfDocument,
    "\n  mutation RemoveShelf($id: String!) {\n    removeShelf(id: $id) {\n      id\n    }\n  }\n": types.RemoveShelfDocument,
    "\n  mutation UpdateSection($id: String!, $updateSectionInput: UpdateSectionInput!) {\n    updateSection(id: $id, updateSectionInput: $updateSectionInput) {\n      id\n      name\n    }\n  }\n": types.UpdateSectionDocument,
    "\n  mutation RemoveSection($id: String!) {\n    removeSection(id: $id) {\n      id\n    }\n  }\n": types.RemoveSectionDocument,
    "\n  fragment SectionView_SectionFragment on SectionModel {\n    id\n    name\n    books {\n      id\n      book {\n        ...BookCard_BookFragment\n      }\n    }\n  }\n": types.SectionView_SectionFragmentFragmentDoc,
    "\n    fragment SectionsList_SectionFragment on ShelfModel {\n      sections {\n        id\n        ...SectionsListItem_SectionFragment\n      }\n    }": types.SectionsList_SectionFragmentFragmentDoc,
    "\n    fragment SectionsListItem_SectionFragment on SectionModel {\n        id\n        name\n    }\n": types.SectionsListItem_SectionFragmentFragmentDoc,
    "\n  fragment ShelvesList_QueryFragment on Query {\n    findAllShelves {\n      id\n      ...ShelvesListItem_ShelfFragment\n    }\n  }\n": types.ShelvesList_QueryFragmentFragmentDoc,
    "\n    fragment ShelvesListItem_ShelfFragment on ShelfModel {\n      id\n      name\n      description\n      private\n      ownerId\n      createdAt\n      updatedAt\n      ...SectionsList_SectionFragment\n    }\n  ": types.ShelvesListItem_ShelfFragmentFragmentDoc,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment BookFragment on BookModel {\n      id\n      title\n      authors\n      description\n      publisher\n      pageCount\n      imageLinks\n      isbn10\n      isbn13\n      googleBookId\n      categories\n    }\n  "): (typeof documents)["\n    fragment BookFragment on BookModel {\n      id\n      title\n      authors\n      description\n      publisher\n      pageCount\n      imageLinks\n      isbn10\n      isbn13\n      googleBookId\n      categories\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query ShelfPage_Query($id: String!) {\n      findShelf(id: $id) {\n       ...ShelfPageHeader_QueryFragment\n       ...ShelfPageContent_QueryFragment\n      }\n    }\n  "): (typeof documents)["\n    query ShelfPage_Query($id: String!) {\n      findShelf(id: $id) {\n       ...ShelfPageHeader_QueryFragment\n       ...ShelfPageContent_QueryFragment\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetAllShelves {\n      ...ShelvesList_QueryFragment\n    }\n  "): (typeof documents)["\n    query GetAllShelves {\n      ...ShelvesList_QueryFragment\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment BookCard_BookFragment on BookModel {\n      id\n      title\n      authors\n      description\n      publisher\n      pageCount\n      imageLinks\n      isbn10\n      isbn13\n      googleBookId\n      categories\n    }\n  "): (typeof documents)["\n    fragment BookCard_BookFragment on BookModel {\n      id\n      title\n      authors\n      description\n      publisher\n      pageCount\n      imageLinks\n      isbn10\n      isbn13\n      googleBookId\n      categories\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query AddBookSections_Query($shelfId: String!) {\n    findShelf(id: $shelfId) {\n      ...DetailsStep_SectionsFragment\n    }\n  }\n  "): (typeof documents)["\n  query AddBookSections_Query($shelfId: String!) {\n    findShelf(id: $shelfId) {\n      ...DetailsStep_SectionsFragment\n    }\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment DetailsStep_SectionsFragment on ShelfModel {\n    sections {\n      id \n      ...SectionSelectionItem_SectionFragment\n    }\n  }\n"): (typeof documents)["\n  fragment DetailsStep_SectionsFragment on ShelfModel {\n    sections {\n      id \n      ...SectionSelectionItem_SectionFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateSectionBook($createSectionBookInput: CreateSectionBookInput!) {\n    createSectionBook(createSectionBookInput: $createSectionBookInput) {\n      id\n      sectionId\n      bookId\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateSectionBook($createSectionBookInput: CreateSectionBookInput!) {\n    createSectionBook(createSectionBookInput: $createSectionBookInput) {\n      id\n      sectionId\n      bookId\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment SectionSelectionItem_SectionFragment on SectionModel {\n    id\n    name\n  }\n  "): (typeof documents)["\n  fragment SectionSelectionItem_SectionFragment on SectionModel {\n    id\n    name\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment BookSearchItem_QueryFragment on BookModel {\n    title\n    authors\n    publishedAt\n    publisher\n    imageLinks\n    googleBookId\n  }\n  "): (typeof documents)["\n  fragment BookSearchItem_QueryFragment on BookModel {\n    title\n    authors\n    publishedAt\n    publisher\n    imageLinks\n    googleBookId\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query SearchBooks_Query($query: String!) {\n    searchBooks(q: $query) {\n      totalNumber\n      books {\n        googleBookId\n        ...BookSearchItem_QueryFragment\n\n      }\n    }\n  }\n"): (typeof documents)["\n  query SearchBooks_Query($query: String!) {\n    searchBooks(q: $query) {\n      totalNumber\n      books {\n        googleBookId\n        ...BookSearchItem_QueryFragment\n\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateSection($createSectionInput: CreateSectionInput!) {\n    createSection(createSectionInput: $createSectionInput) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CreateSection($createSectionInput: CreateSectionInput!) {\n    createSection(createSectionInput: $createSectionInput) {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateShelf($createShelfInput: CreateShelfInput!) {\n    createShelf(createShelfInput: $createShelfInput) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CreateShelf($createShelfInput: CreateShelfInput!) {\n    createShelf(createShelfInput: $createShelfInput) {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ShelfPageContent_QueryFragment on ShelfModel {\n    sections {\n      id\n      ...SectionView_SectionFragment\n    }\n  }\n  "): (typeof documents)["\n  fragment ShelfPageContent_QueryFragment on ShelfModel {\n    sections {\n      id\n      ...SectionView_SectionFragment\n    }\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ShelfPageHeader_QueryFragment on ShelfModel {\n    id\n    name\n    private\n  }"): (typeof documents)["\n  fragment ShelfPageHeader_QueryFragment on ShelfModel {\n    id\n    name\n    private\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateShelf($id: String!, $updateShelfInput: UpdateShelfInput!) {\n    updateShelf(id: $id, updateShelfInput: $updateShelfInput) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateShelf($id: String!, $updateShelfInput: UpdateShelfInput!) {\n    updateShelf(id: $id, updateShelfInput: $updateShelfInput) {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RemoveShelf($id: String!) {\n    removeShelf(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveShelf($id: String!) {\n    removeShelf(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateSection($id: String!, $updateSectionInput: UpdateSectionInput!) {\n    updateSection(id: $id, updateSectionInput: $updateSectionInput) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateSection($id: String!, $updateSectionInput: UpdateSectionInput!) {\n    updateSection(id: $id, updateSectionInput: $updateSectionInput) {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RemoveSection($id: String!) {\n    removeSection(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveSection($id: String!) {\n    removeSection(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment SectionView_SectionFragment on SectionModel {\n    id\n    name\n    books {\n      id\n      book {\n        ...BookCard_BookFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment SectionView_SectionFragment on SectionModel {\n    id\n    name\n    books {\n      id\n      book {\n        ...BookCard_BookFragment\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment SectionsList_SectionFragment on ShelfModel {\n      sections {\n        id\n        ...SectionsListItem_SectionFragment\n      }\n    }"): (typeof documents)["\n    fragment SectionsList_SectionFragment on ShelfModel {\n      sections {\n        id\n        ...SectionsListItem_SectionFragment\n      }\n    }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment SectionsListItem_SectionFragment on SectionModel {\n        id\n        name\n    }\n"): (typeof documents)["\n    fragment SectionsListItem_SectionFragment on SectionModel {\n        id\n        name\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ShelvesList_QueryFragment on Query {\n    findAllShelves {\n      id\n      ...ShelvesListItem_ShelfFragment\n    }\n  }\n"): (typeof documents)["\n  fragment ShelvesList_QueryFragment on Query {\n    findAllShelves {\n      id\n      ...ShelvesListItem_ShelfFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment ShelvesListItem_ShelfFragment on ShelfModel {\n      id\n      name\n      description\n      private\n      ownerId\n      createdAt\n      updatedAt\n      ...SectionsList_SectionFragment\n    }\n  "): (typeof documents)["\n    fragment ShelvesListItem_ShelfFragment on ShelfModel {\n      id\n      name\n      description\n      private\n      ownerId\n      createdAt\n      updatedAt\n      ...SectionsList_SectionFragment\n    }\n  "];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;