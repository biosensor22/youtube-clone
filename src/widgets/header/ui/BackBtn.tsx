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
      className={`w-10 h-10 rounded-full ml-2 cursor-pointer flex justify-center items-center
        ${
          pressed
            ? "bg-(--active-btn-color)"
            : "hover:bg-(--hover-btn-color) bg-transparent"
        }
        `}
    >
      <div className="w-6 ">
        <ArrowIcon />
      </div>
    </div>
  );
}
