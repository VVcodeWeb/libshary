"use client";
import { AddBookButton } from "./AddBookButton";
import { SearchStep } from "./SearchStep";
import { DetailsStep } from "./DetailsStep";
import { Step, StepsProvider } from "@/context/StepsContext";
import { AddBookSteps, useAddBookSteps } from "@/hooks/useAddBookSteps";

const modal_id = "add_book_modal";
const steps: Step<AddBookSteps>[] = [
  {
    label: "search",
    component: <SearchStep />,
  },
  {
    label: "details",
    component: <DetailsStep />,
  },
];

const AddBookModal = () => {
  const { currentStep } = useAddBookSteps();
  return (
    <dialog id={modal_id} className="modal">
      <div className="modal-box min-h-72 max-h-[75vh] overflow-y-auto">
        <div className="max-w-md">{steps[currentStep]?.component}</div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export const AddBook = () => {
  const onOpenModal = () => {
    const dialogEl = document.getElementById(modal_id) as HTMLDialogElement;
    if (dialogEl) dialogEl.showModal();
  };
  return (
    <StepsProvider
      initialData={{
        id: "",
      }}
      steps={steps}
    >
      <AddBookButton onClick={onOpenModal} />
      <AddBookModal />
    </StepsProvider>
  );
};
