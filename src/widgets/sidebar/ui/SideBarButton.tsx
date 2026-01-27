import Link from "next/link";
import { usePress } from "@/shared/ui/hooks/usePress";

interface BtnProps {
  label: string;
  path: string;
  icon: React.ReactNode;
}

export function SideBarButton({ label, path, icon }: BtnProps) {
  const { pressed, onPress, onRelease } = usePress();

  return (
    <Link
      onMouseDown={onPress}
      onMouseUp={onRelease}
      onMouseLeave={onRelease}
      className={`text-white justify-center flex flex-col items-center text-[10px] gap-1 w-16 py-4 rounded-xl
       
         ${
           pressed
             ? "bg-(--active-btn-color)"
             : "hover:bg-(--hover-btn-color) bg-transparent"
         }
        `}
      href={path}
    >
      {icon}
      {label}
    </Link>
  );
}
