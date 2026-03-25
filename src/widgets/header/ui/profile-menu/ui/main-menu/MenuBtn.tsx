"use client";

import { ChevronRightIcon } from "@/shared/ui/icons";
import type { ProfileMenuItem } from "@/widgets/header/ui/profile-menu";
import { useMenuLogic } from "@/widgets/header/ui/profile-menu";

export function MenuBtn({
  id,
  label,
  icon: Icon,
  hasChevron,
}: ProfileMenuItem) {
  const handleClick = useMenuLogic(id);

  return (
    <button
      onClick={handleClick}
      type="button"
      className="flex w-full cursor-pointer items-center gap-4 py-2 px-4 text-left font-semibold text-[14px] hover:bg-white/10"
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center text-white">
        <Icon className="h-6 w-6" />
      </span>

      <span className="min-w-0 flex-1 truncate font-normal">{label}</span>
      {hasChevron ? (
        <ChevronRightIcon className="h-5 w-5 shrink-0 text-white/85" />
      ) : null}
    </button>
  );
}
