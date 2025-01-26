class Mock {
  search(args: any) {
    return {
      apiProvider: 1,
      totalNumber: 1,
      limit: 10,
      offset: 0,
      result: [
        {
          googleBookId: '123',
          title: 'Test Book',
          authors: ['Test Author'],
          description: 'Test Description',
          categories: ['Test Category'],
          publisher: 'Test Publisher',
          publishedDate: '2023',
          pageCount: 100,
          language: 'en',
          imageLinks: {
            thumbnail: 'test-url',
          },
        },
      ],
    };
  }
}

export const BookSearchServiceMock = {
  provide: 'BOOKSEARCH',
  useValue: Mock,
};
