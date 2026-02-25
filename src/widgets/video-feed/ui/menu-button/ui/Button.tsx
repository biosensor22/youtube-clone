import { buttonsVideo, type BtnItems } from "@/widgets/video-feed";
import clsx from "clsx";

export function Button({ id, label, icon }: BtnItems) {
  return (
    <button
      className={clsx(
        "hover:bg-(--hover-btn-color) text-start px-4 py-2 flex gap-2 cursor-pointer",
        {
          "rounded-t-xl": id === 1,
          "rounded-b-xl": id === buttonsVideo.length,
        },
      )}
    >
      {icon}
      <div className="text-[14px]">{label}</div>
    </button>
  );
}
