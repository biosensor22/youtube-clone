import { BlockIcon } from "@/shared/ui/icons/feed-icons/BlockIcon";
import { ClockIcon } from "@/shared/ui/icons/feed-icons/ClockIcon";
import { NotIcon } from "@/shared/ui/icons/feed-icons/NotIcon";
import { QueueIcon } from "@/shared/ui/icons/feed-icons/QueueIcon";
import { ReportIcon } from "@/shared/ui/icons/feed-icons/ReportIcon";
import { SaveIcon } from "@/shared/ui/icons/feed-icons/SaveIcon";
import { ShareIcon } from "@/shared/ui/icons/feed-icons/ShareIcon";

export type BtnItems = {
  id: number;
  label: string;
  icon: React.ReactNode;
};

export const buttonsVideo: BtnItems[] = [
  { id: 1, label: "Add to queue", icon: <QueueIcon /> },
  { id: 2, label: "Save to Watch Later", icon: <ClockIcon /> },
  { id: 3, label: "Save to playlist", icon: <SaveIcon /> },
  { id: 4, label: "Share", icon: <ShareIcon /> },
  { id: 5, label: "Not interested", icon: <NotIcon /> },
  { id: 6, label: "Don't recommend channel", icon: <BlockIcon /> },
  { id: 7, label: "Report", icon: <ReportIcon /> },
];

export const buttonsPlaylist: BtnItems[] = [
  { id: 1, label: "Save to library", icon: <SaveIcon /> },
  { id: 2, label: "Not interested", icon: <NotIcon /> },
];
