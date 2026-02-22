import { NotifOptionsBtn } from "../options/NotifOptionsBtn";
import { timeAgo } from "@/shared/lib/hooks";
import Image from "next/image";

interface NotificationProps {
  id: string;
  type: string;
  checked: boolean;
  icon: string;
  thumbnail: string;
  date: string;
  by: string;
  message: string;
}

export function Notification({
  id,
  type,
  checked,
  icon,
  thumbnail,
  date,
  by,
  message,
}: NotificationProps) {
  return (
    <div className="relative flex justify-between px-1 py-4 pr-4 hover:bg-(--hover-btn-color)">
      <div className="flex gap-2 justify-center h-11">
        <div className="w-1 h-1 rounded-full self-center bg-(--video-blue-checked)" />
        <Image
          className=" rounded-full cursor-pointer w-11 h-11"
          src={icon}
          width={100}
          height={100}
          alt="notification"
        />
      </div>
      <div className="max-w-59 text-[14px] cursor-pointer">
        <p>
          {type === "reply" ? `${by} replied: ${message}` : ""}
          {type === "liked" ? `👍 Someone liked your ${type}: ${message}` : ""}
          {type === "video" ? `${by} uploaded: ${message}` : ""}
        </p>
        <p className="text-(--grey-text-color) mt-1 font-normal">
          {timeAgo(date)}
        </p>
      </div>

      <Image
        className="w-21.5 h-12 rounded-sm object-cover cursor-pointer"
        src={thumbnail}
        width={200}
        height={200}
        alt="video"
      />

      <NotifOptionsBtn />
    </div>
  );
}
