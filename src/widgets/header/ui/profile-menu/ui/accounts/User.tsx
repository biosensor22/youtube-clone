import { CheckIcon } from "@/shared/ui/icons/profile-menu-icons/accounts/CheckIcon";
import Image from "next/image";

type UserProps = {
  pfp: string;
  name: string;
  username: string;
  subsctibers: number;
};

export function User({ pfp, name, username, subsctibers }: UserProps) {
  return (
    <div className="px-3 py-2 flex justify-between items-center hover:bg-(--hover-btn-color) cursor-pointer">
      <div className="flex gap-x-2">
        <div className="border-(--profile-border-color) border-2 rounded-full">
          <Image
            className="rounded-full"
            src={pfp}
            width={50}
            height={50}
            alt={name}
          />
        </div>
        <div className="leading-4">
          <h2 className="text-[14px] pb-0.75">{name}</h2>
          <p className="text-[12px] text-(--grey-text-color)">{username}</p>
          <p className="text-[12px] text-(--grey-text-color)">
            {subsctibers} subscribers
          </p>
        </div>
      </div>
      <div className="mr-2">
        <CheckIcon />
      </div>
    </div>
  );
}
