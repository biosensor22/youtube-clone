import clsx from "clsx";

interface CategoryButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function CategoryButton({
  label,
  isActive,
  onClick,
}: CategoryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "px-3 py-1 h-8 rounded-lg text-[15px] font-semibold cursor-pointer whitespace-nowrap",
        {
          "bg-white text-black": isActive,
          "bg-(--btn-bg-color)": !isActive,
        },
      )}
    >
      {label}
    </button>
  );
}
