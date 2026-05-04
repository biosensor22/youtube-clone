import {
  BlockIcon,
  ClockIcon,
  DownloadIcon,
  NotIcon,
  QueueIcon,
  ReportIcon,
  SaveIcon,
} from "@/shared/ui/icons";

export const RecommendMenuItems = [
  {
    id: 1,
    label: "Add to queue",
    icon: <QueueIcon className="h-6 w-6" />,
  },
  {
    id: 2,
    label: "Save to Watch later",
    icon: <ClockIcon className="h-6 w-6" />,
  },
  {
    id: 3,
    label: "Save to Playlist",
    icon: <SaveIcon className="h-6 w-6" />,
  },
  {
    id: 4,
    label: "Download",
    icon: <DownloadIcon className="h-6 w-6" />,
  },
  { id: 5, label: "Not interested", icon: <NotIcon className="h-6 w-6" /> },
  {
    id: 6,
    label: "Don't recommend channel",
    icon: <BlockIcon className="h-6 w-6" />,
  },
  { id: 7, label: "Report", icon: <ReportIcon className="h-6 w-6" /> },
];
