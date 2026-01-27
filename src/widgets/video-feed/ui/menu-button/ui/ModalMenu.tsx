"use client";

import { BlockIcon } from "@/shared/ui/icons/feed-icons/BlockIcon";
import { ClockIcon } from "@/shared/ui/icons/feed-icons/ClockIcon";
import { NotIcon } from "@/shared/ui/icons/feed-icons/NotIcon";
import { QueueIcon } from "@/shared/ui/icons/feed-icons/QueueIcon";
import { ReportIcon } from "@/shared/ui/icons/feed-icons/ReportIcon";
import { SaveIcon } from "@/shared/ui/icons/feed-icons/SaveIcon";
import { ShareIcon } from "@/shared/ui/icons/feed-icons/ShareIcon";

type MenuBtnProps = {
  type: string;
};

type BtnItems = {
  id: number;
  label: string;
  icon: React.ReactNode;
};

export function ModalMenu({ type }: MenuBtnProps) {
  const buttons: BtnItems[] = [
    { id: 1, label: "Add to queue", icon: <QueueIcon /> },
    { id: 2, label: "Save to Watch Later", icon: <ClockIcon /> },
    { id: 3, label: "Save to playlist", icon: <SaveIcon /> },
    { id: 4, label: "Share", icon: <ShareIcon /> },
    { id: 5, label: "Not interested", icon: <NotIcon /> },
    { id: 6, label: "Don't recommend channel", icon: <BlockIcon /> },
    { id: 7, label: "Report", icon: <ReportIcon /> },
  ];
  if (type === "playlist") return <div></div>;
  return (
    <div className="bg-(--dark-grey-bg) rounded-xl w-65 flex flex-col">
      {buttons.map((i) => (
        <button
          className={`hover:bg-(--hover-btn-color) text-start px-4 py-2 flex gap-2 cursor-pointer
					${i.id === 1 ? "rounded-t-xl" : ""} ${i.id === buttons.length ? "rounded-b-xl" : ""}
				`}
        >
          {i.icon}
          <p className="text-[14px]">{i.label}</p>
        </button>
      ))}
    </div>
  );
}
