import { BookItem } from "./book-item";
import { useAddBookSteps } from "@/hooks/useAddBookSteps";
const AlreadyReadTab = () => {
  return (
    <>
      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab"
        aria-label="Already read"
      />
      <div role="tabpanel" className="tab-content p-10">
        <div className="flex gap-4">
          <div>
            <p>Rate it</p>
          </div>
          <div className="rating">
            <input type="radio" name="rating-1" className="mask mask-star" />
            <input type="radio" name="rating-1" className="mask mask-star" />
            <input type="radio" name="rating-1" className="mask mask-star" />
            <input type="radio" name="rating-1" className="mask mask-star" />
            <input type="radio" name="rating-1" className="mask mask-star" />
          </div>
        </div>
      </div>
    </>
  );
};

const InProgressTab = () => {
  const { data } = useAddBookSteps();
  return (
    <>
      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab"
        aria-label="In progress"
      />
      <div role="tabpanel" className="tab-content p-10">
        <div className="flex align-middle">
          <div>
            <input
              type="text"
              placeholder="Current page"
              className="input input-bordered input-primary w-full max-w-xs"
            />
          </div>
          <div className="grow-0">
            <p>/{data.pageCount}</p>
          </div>
        </div>
      </div>
    </>
  );
};

const WantToReadTab = () => {
  return (
    <>
      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab"
        aria-label="To be read"
      />
    </>
  );
};
export const DetailsStep = () => {
  const { data: book, navigateToStep } = useAddBookSteps();
  const onBackClick = () => navigateToStep("search");
  const onSubmitClick = () => alert("Wooooho");
  return (
    <div>
      <div className="flex flex-col gap-2">
        <BookItem book={book} />
        <div role="tablist" className="tabs tabs-boxed">
          <AlreadyReadTab />
          <InProgressTab />
          <WantToReadTab />
        </div>
        <div>
          <textarea
            className="textarea textarea-primary"
            placeholder="Notes(optional)"
          ></textarea>
        </div>
        <div className="modal-action flex justify-between">
          <button className="btn" onClick={onBackClick}>
            Back
          </button>
          <button className="btn btn-primary" onClick={onSubmitClick}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
