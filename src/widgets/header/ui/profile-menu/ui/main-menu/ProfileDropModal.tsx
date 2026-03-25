"use client";

import { SplitLine } from "@/shared/ui";
import { useClickOutside } from "@/shared/lib/hooks";
import { profileMenuSections } from "@/widgets/header/ui/profile-menu";
import {
  MenuBtn,
  User,
  useDropProfileContext,
} from "@/widgets/header/ui/profile-menu";

export function ProfileDropModal() {
  const { triggerRef, close, position } = useDropProfileContext();
  const { modalRef } = useClickOutside(triggerRef, close);

  if (!position.width) return null;

  return (
    <div
      ref={modalRef}
      className="fixed z-30 flex flex-col overflow-hidden rounded-xl bg-[#282828] text-[#f1f1f1] shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
      style={{
        width: 300,
        left: position.left + position.width - 300 + 12,
        top: position.top + 5,
        maxHeight: `min(750px, calc(100vh - ${position.top + 8}px))`,
      }}
    >
      <div className="shrink-0 bg-[#282828]">
        <div className="px-4 pb-4 pt-3">
          <User />
        </div>
        <SplitLine className="border-white/12" />
      </div>

      <div className="my-2 min-h-0 flex-1 overflow-y-auto">
        {profileMenuSections.map((section, index) => (
          <div key={section[0]?.id ?? index}>
            {index > 0 ? (
              <SplitLine className="border-white/12 mb-2 pt-2" />
            ) : null}
            <div>
              {section.map((item) => (
                <MenuBtn key={item.id} {...item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
