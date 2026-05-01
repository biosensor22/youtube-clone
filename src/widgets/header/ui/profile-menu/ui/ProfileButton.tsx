import Image from "next/image";

import { useDropProfileContext } from "./DropProfileContext";
import { useCurrentUser } from "@/entities/user/model/useCurrentUser";

export function ProfileButton() {
  const { toggle, triggerRef } = useDropProfileContext();
  const { data: user } = useCurrentUser();
  if (!user?.[0].pfp) return;
  return (
    <div
      ref={triggerRef}
      onClick={toggle}
      className="w-8 h-8 flex rounded-full"
    >
      <Image
        width={64}
        height={64}
        src={user?.[0].pfp}
        alt="profile"
        className="rounded-full border-(--profile-border-color) cursor-pointer select-none"
      />
    </div>
  );
}
