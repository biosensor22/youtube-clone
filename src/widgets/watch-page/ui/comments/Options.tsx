import { MenuIcon } from "@/shared/ui";

type OptionsProps = {
  optionsTriggerRef: React.RefObject<HTMLButtonElement | null>;
  onToggle: () => void;
  onClose: () => void;
  isOptionsOpen: boolean;
  modalRef: React.RefObject<HTMLDivElement | null>;
};

export function Options({
  optionsTriggerRef,
  onToggle,
  onClose,
  isOptionsOpen,
  modalRef,
}: OptionsProps) {
  return (
    <div className="relative">
      <button
        ref={optionsTriggerRef}
        onClick={onToggle}
        className="rounded-full p-2 text-(--grey-text-color) hover:bg-(--hover-btn-color) hover:text-(--main-text-color)"
        aria-label="Comment options"
        aria-expanded={isOptionsOpen}
        aria-haspopup="menu"
      >
        <MenuIcon className="h-5 w-5" />
      </button>

      {isOptionsOpen ? (
        <div
          ref={modalRef}
          className="absolute right-0 top-full z-20 mt-1 w-44 overflow-hidden rounded-xl bg-(--dark-grey-bg) py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
        >
          <button
            onClick={onClose}
            className="w-full px-3 py-2 text-left text-sm hover:bg-(--hover-btn-color)"
          >
            Report
          </button>
        </div>
      ) : null}
    </div>
  );
}
