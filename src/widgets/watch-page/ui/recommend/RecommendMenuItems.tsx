import {
  BlockIcon,
  ClockIcon,
  NotIcon,
  QueueIcon,
  ReportIcon,
} from "@/shared/ui/icons";

export const RecommendMenuItems = [
  {
    id: "queue",
    label: "Add to queue",
    icon: <QueueIcon className="h-5 w-5" />,
  },
  {
    id: "watch-later",
    label: "Save to Watch later",
    icon: <ClockIcon className="h-5 w-5" />,
  },
  { id: "not", label: "Not interested", icon: <NotIcon className="h-5 w-5" /> },
  {
    id: "block",
    label: "Don't recommend channel",
    icon: <BlockIcon className="h-5 w-5" />,
  },
  { id: "report", label: "Report", icon: <ReportIcon className="h-5 w-5" /> },
];
