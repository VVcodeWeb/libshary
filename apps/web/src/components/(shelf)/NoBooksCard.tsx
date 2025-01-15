import { Section } from '@prisma/client';
import { AddBookModalWrapper } from '../(add-book)/AddBookModalWrapper';
import Image from 'next/image';

type NoBooksCardProps = {
  sectionId: string;
};
const sections: Section[] = [];

export const NoBooksCard = ({ sectionId }: NoBooksCardProps) => {
  return (
    <AddBookModalWrapper sections={sections}>
      <div className="card shadow-lg bg-base-300 ">
        <figure className="relative h-60 w-full">
          <Image
            src="/placeholder.jpg"
            alt="No books cover"
            layout="fill"
            objectFit="contain"
            className="rounded-t-lg"
          />
        </figure>
        <div className="card-body p-4">
          <h2 className="card-title text-lg font-semibold">
            No Books Available
          </h2>
          <p className="text-sm text-gray-500">Add a book to this section</p>
        </div>
      </div>
    </AddBookModalWrapper>
  );
};
