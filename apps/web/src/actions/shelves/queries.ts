import { gql } from '@web/__generated__/gql';
export const ShelfPage_Query = gql(`
    query ShelfPage_Query($id: String!) {
      findShelf(id: $id) {
       ...ShelfPageHeader_QueryFragment
       ...ShelfPageContent_QueryFragment
      }
    }
  `);

export const ShelvesSidebar_Query = gql(`
    query GetAllShelves {
      ...ShelvesList_QueryFragment
    }
  `);
