import {
  BlockIcon,
  ClipIcon,
  DownloadIcon,
  ReportIcon,
  SaveIcon,
} from "@/shared/ui/icons";
import type { ActionMenuItem, SecondaryActionItem } from "./types";

export const VIDEO_OPTIONS_MENU: ActionMenuItem[] = [
  {
    id: "remove-ads",
    label: "Remove ads",
    icon: <BlockIcon className="h-6 w-6" />,
  },
  {
    id: "download",
    label: "Download",
    icon: <DownloadIcon props={{ className: "h-6 w-6" }} />,
  },
  {
    id: "report",
    label: "Report",
    icon: <ReportIcon className="h-6 w-6" />,
  },
];

export const SECONDARY_ACTIONS: SecondaryActionItem[] = [
  {
    id: "save",
    label: "Save",
    icon: <SaveIcon className="h-5 w-5" />,
  },
  {
    id: "clip",
    label: "Clip",
    icon: <ClipIcon props={{ className: "h-5 w-5" }} />,
  },
];
