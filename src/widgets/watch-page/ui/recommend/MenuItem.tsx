import clsx from "clsx";
import { MenuItems } from "./MenuItems";

type MenuItemProps = {
  id: number;
  icon: React.ReactNode;
  label: string;
  onClose: () => void;
};

export function MenuItem({ id, icon, label, onClose }: MenuItemProps) {
  return (
    <button
      key={id}
      onClick={onClose}
      className={clsx(
        "hover:bg-(--btn-bg-color) text-[14px] px-4 py-2 flex gap-2 cursor-pointer",
        {
          "rounded-t-xl": id === 1,
          "rounded-b-xl": id === MenuItems.length,
        },
      )}
    >
      <span className="inline-flex items-center justify-center">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
