import Image from "next/image";
import { numberConvert } from "@/shared/lib/hooks";
import { VerifyIcon } from "@/shared/ui/icons";

type ChannelInfoProps = {
  channelAvatar: string;
  channelName: string;
  subscribers: number;
  verified: boolean;
  isSubscribed: boolean;
  onToggleSubscribe: () => void;
};

export function ChannelInfo({
  channelAvatar,
  channelName,
  subscribers,
  verified,
  isSubscribed,
  onToggleSubscribe,
}: ChannelInfoProps) {
  return (
    <div className="flex min-w-0 items-center gap-3.5">
      <Image
        src={channelAvatar}
        alt={channelName}
        width={40}
        height={40}
        className="h-10 w-10 shrink-0 rounded-full"
      />
      <div className="min-w-0">
        <div className="flex items-center gap-1">
          <p className="truncate text-[17px] font-semibold leading-5">
            {channelName}
          </p>
          {verified ? (
            <VerifyIcon className="h-4 w-4 text-(--grey-text-color)" />
          ) : null}
        </div>
        <p className="mt-0.5 text-xs text-(--grey-text-color)">
          {numberConvert(subscribers)} subscribers
        </p>
      </div>
      <button
        onClick={onToggleSubscribe}
        className={`ml-1 h-9 rounded-full px-3 text-[15px] font-medium ${
          isSubscribed
            ? "bg-(--btn-bg-color) text-(--main-text-color)) hover:bg-(--hover-btn-color)"
            : "bg-white text-black hover:bg-white/90"
        }`}
      >
        {isSubscribed ? "Subscribed" : "Subscribe"}
      </button>
    </div>
  );
}
