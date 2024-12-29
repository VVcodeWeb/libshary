import { AddBook } from "@/components/(add-book)/AddBook";
import { Table } from "@/components/(shelf)/table";

export default function Shelf() {
  return (
    <div className="min-h-screen p-4">
      <div>
        <article className="prose prose-xl">
          <h3>Your shelf</h3>
        </article>
        <AddBook />
        <Table />
      </div>
    </div>
  );
}
