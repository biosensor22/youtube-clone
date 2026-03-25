type RecommendMenuItemProps = {
  id: string;
  icon: React.ReactNode;
  label: string;
  onClose: () => void;
};

export function RecommendMenuItem({
  id,
  icon,
  label,
  onClose,
}: RecommendMenuItemProps) {
  return (
    <button
      key={id}
      onClick={onClose}
      className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-(--hover-btn-color)"
    >
      <span className="inline-flex h-5 w-5 items-center justify-center">
        {icon}
      </span>
      <span>{label}</span>
    </button>
  );
}
