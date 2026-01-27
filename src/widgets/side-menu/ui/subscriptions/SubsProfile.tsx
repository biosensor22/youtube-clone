import Link from "next/link";
import Image from "next/image";
import { usePress } from "@/shared/ui/hooks/usePress";
import { LiveIcon } from "@/shared/ui/icons/side-menu-icons";
import { useCursorTooltip } from "@/shared/ui/hooks/useCursorTooltip";

type Props = {
  pfp: string;
  title: string;
  url: string;
  live: boolean;
  newVideoChecked: boolean;
};

export function SubsProfile({ pfp, title, url, live, newVideoChecked }: Props) {
  const { pressed, onPress, onRelease } = usePress();
  const tooltip = useCursorTooltip(title, { delay: 500 });

  return (
    <Link
      href={url}
      onMouseEnter={(e) => tooltip.show(e.nativeEvent)}
      onMouseLeave={() => {
        tooltip.hide();
        onRelease();
      }}
      onMouseDown={onPress}
      onMouseUp={onRelease}
      className={`flex items-center gap-x-4 rounded-xl px-2 py-1 pr-2 mt-1 text-white text-[14px]
        ${
          pressed
            ? "bg-(--active-btn-color)"
            : "hover:bg-(--hover-btn-color) bg-transparent"
        }
        
        `}
    >
      <Image
        className="rounded-full"
        src={pfp}
        width={28}
        height={28}
        alt={title}
      ></Image>
      <p className="whitespace-nowrap truncate">{title}</p>
      {tooltip.tooltip}
      <div
        className={`ml-auto pr-[-10px]
          
          ${newVideoChecked && !live ? "w-1 h-1 rounded-full bg-(--video-blue-checked) mr-1.5" : ""}
        `}
      >
        {live && <LiveIcon />}
      </div>
    </Link>
  );
}
