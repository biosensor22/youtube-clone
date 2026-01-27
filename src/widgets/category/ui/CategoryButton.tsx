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
      className={`px-3 py-1 h-8 rounded-lg text-[15px] font-semibold cursor-pointer
      whitespace-nowrap
        ${isActive ? "bg-white text-black" : "bg-(--btn-bg-color)"}
        `}
    >
      {label}
    </button>
  );
}
