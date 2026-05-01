import { numberConvert } from "@/shared/lib/hooks";
import { ThumbUpIcon, ThumbDownIcon } from "@/shared/ui";
import { HeartIcon } from "@/shared/ui/icons/video-icons/HeartIcon";
import Image from "next/image";

type ActionsProps = {
  id: string;
  onLike: (id: string) => void;
  likes: number;
  showCreatorLike: boolean;
  creatorAvatar: string;
};

export function Actions({
  id,
  onLike,
  likes,
  showCreatorLike,
  creatorAvatar,
}: ActionsProps) {
  return (
    <div className="mt-1.5 flex items-center gap-2 text-sm -ml-2">
      <div className="flex items-center">
        <button
          onClick={() => onLike(id)}
          className="inline-flex text-(--main-text-color) h-8 w-8 items-center gap-1 rounded-full px-1.5  hover:bg-(--hover-btn-color) hover:text-(--main-text-color)"
        >
          <ThumbUpIcon className="h-4 rotate-180" />
        </button>
        <span className="text-[13px]">{numberConvert(likes)}</span>
      </div>

      <button className="inline-flex h-8 w-8 items-center justify-center rounded-full text-(--main-text-color) hover:bg-(--hover-btn-color) hover:text-(--main-text-color)">
        <ThumbDownIcon className="h-4 " />
      </button>

      {showCreatorLike ? (
        <div className="relative h-6 w-6">
          <div className="h-6 w-6 relative">
            <Image
              src={creatorAvatar}
              alt="Creator liked"
              width={24}
              height={24}
              className="rounded-full"
            />
            <span className="absolute -bottom-1 -right-1 rounded-full px-1 text-[9px] leading-3 text-(--main-text-color)">
              <HeartIcon className="text-red-500 w-3.5 absolute right-0.5 -bottom-0.5" />
            </span>
          </div>
        </div>
      ) : null}

      <button
        className="h-8 rounded-full px-2 text-[13px] font-semibold text-(--main-text-color)
       hover:bg-(--hover-btn-color) hover:text-(--main-text-color)
      "
      >
        Reply
      </button>
    </div>
  );
}
