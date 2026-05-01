import clsx from "clsx";
import { usePress } from "@/shared/lib/hooks";
import { ArrowIcon } from "@/shared/ui/icons";

interface BackBtnProps {
  onBack: () => void;
}

export function BackBtn({ onBack }: BackBtnProps) {
  const { pressed, onPress, onRelease } = usePress();

  return (
    <div
      onMouseDown={onPress}
      onMouseUp={onRelease}
      onMouseLeave={onRelease}
      onClick={onBack}
      className={clsx(
        `w-10 h-10 rounded-full ml-2 cursor-pointer flex justify-center items-center
         bg-transparent text-(--main-text-color)`,
        {
          "bg-(--active-btn-color)": pressed,
          "hover:bg-(--hover-btn-color)": !pressed,
        },
      )}
    >
      <div className="w-6 ">
        <ArrowIcon />
      </div>
    </div>
  );
}
