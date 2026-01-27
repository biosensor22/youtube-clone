import Link from "next/link";
import { usePress } from "@/shared/ui/hooks/usePress";

interface BtnProps {
  label: string;
  path: string;
  icon: React.ReactNode;
}

export function NavBtn({ label, path, icon }: BtnProps) {
  const { pressed, onPress, onRelease } = usePress();
  return (
    <Link
      onMouseDown={onPress}
      onMouseUp={onRelease}
      onMouseLeave={onRelease}
      href={path}
      className={`flex text-sm text-white mt-1 rounded-xl px-3 py-2 gap-5.5
				${
          pressed
            ? "bg-(--active-btn-color)"
            : "hover:bg-(--hover-btn-color) bg-transparent"
        }
				`}
    >
      {icon}
      <p>{label}</p>
    </Link>
  );
}
