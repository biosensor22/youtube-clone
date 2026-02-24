import { buttonsVideo, type BtnItems } from "@/widgets/video-feed";

export function Button({ id, label, icon }: BtnItems) {
  return (
    <button
      key={id}
      className={`hover:bg-(--hover-btn-color) text-start px-4 py-2 flex gap-2 cursor-pointer
								${id === 1 ? "rounded-t-xl" : ""} ${
                  id === buttonsVideo.length ? "rounded-b-xl" : ""
                }`}
    >
      {icon}
      <p className="text-[14px]">{label}</p>
    </button>
  );
}
