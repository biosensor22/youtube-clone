import Image from "next/image";
import { useCurrentUser } from "@/entities/user/model/useCurrentUser";

export function User() {
  const { data: user } = useCurrentUser();

  if (!user?.[0].pfp || !user?.[0].name || !user?.[0].username) return;
  return (
    <div className="flex items-start gap-3">
      <Image
        src={user?.[0].pfp}
        alt="profile picture"
        width={40}
        height={40}
        className="h-10 mt-1.5 w-10 rounded-full"
      />
      <div className="min-w-0 ml-1">
        <p className="truncate text-[16px] font-normal leading-6">
          {user?.[0].name}
        </p>
        <p className="truncate text-[16px] font-normal leading-5">
          {user?.[0].username}
        </p>
        <button
          type="button"
          className="mt-2 text-[14px] text-[#3ea6ff] transition-colors cursor-pointer"
        >
          View your channel
        </button>
      </div>
    </div>
  );
}
