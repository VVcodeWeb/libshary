import { PrismaClient, Status } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a user
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
    },
  });

  // Create a shelf for the user
  const shelf = await prisma.shelf.create({
    data: {
      name: 'Alice’s Bookshelf',
      ownerId: user.id,
    },
  });

  // Create a book
  const book = await prisma.book.create({
    data: {
      title: 'The Great Gatsby',
      authors: ['F. Scott Fitzgerald'],
      description: 'A novel about the American dream.',
      publishedAt: new Date('1925-04-10'),
      publisher: 'Scribner',
      pageCount: 218,
      imageLinks: 'https://example.com/image.jpg',
    },
  });

  // Add the book to the shelf in the "In Progress" category
  const inProgressShelfBook = await prisma.shelfBook.create({
    data: {
      shelfId: shelf.id,
      bookId: book.id,
      status: Status.IN_PROGRESS,
      inProgressShelfBook: {
        create: {
          currentPage: 50,
        },
      },
    },
  });

  // Add the book to the shelf in the "Future Read" category
  const futureReadShelfBook = await prisma.shelfBook.create({
    data: {
      shelfId: shelf.id,
      bookId: book.id,
      status: Status.FUTURE_READ,
      futureReadShelfBook: {
        create: {},
      },
    },
  });

  // Add the book to the shelf in the "Past Read" category
  const pastReadShelfBook = await prisma.shelfBook.create({
    data: {
      shelfId: shelf.id,
      bookId: book.id,
      status: Status.PAST_READ,
      pastReadShelfBook: {
        create: {
          rating: 5,
        },
      },
    },
  });

  console.log({
    user,
    shelf,
    book,
    inProgressShelfBook,
    futureReadShelfBook,
    pastReadShelfBook,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
