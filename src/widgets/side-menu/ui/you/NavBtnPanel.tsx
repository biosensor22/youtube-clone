"use client";

import { useState } from "react";
import {
  ClipIcon,
  CoursesIcon,
  DownloadIcon,
  HistoryIcon,
  LikeIcon,
  PlaylistsIcon,
  PodcastsIcon,
  VideoIcon,
  WatchIcon,
} from "@/shared/ui/icons";
import { ShowMore, NavBtn } from "@/widgets/side-menu";

export function NavBtnPanel() {
  const [active, setActive] = useState(false);
  const [slice, setSlice] = useState(7);
  const navItems = [
    {
      id: 1,
      label: "History",
      path: "/",
      icon: <HistoryIcon />,
    },
    {
      id: 2,
      label: "Playlists",
      path: "/",
      icon: <PlaylistsIcon />,
    },
    {
      id: 3,
      label: "Watch Later",
      path: "/",
      icon: <WatchIcon />,
    },
    {
      id: 4,
      label: "Liked videos",
      path: "/",
      icon: <LikeIcon />,
    },
    {
      id: 5,
      label: "Your videos",
      path: "/",
      icon: <VideoIcon />,
    },
    {
      id: 6,
      label: "Downloads",
      path: "/",
      icon: <DownloadIcon />,
    },
    {
      id: 7,
      label: "Podcasts",
      path: "/",
      icon: <PodcastsIcon />,
    },
    {
      id: 8,
      label: "Courses",
      path: "/",
      icon: <CoursesIcon />,
    },
    {
      id: 9,
      label: "Clips",
      path: "/",
      icon: <ClipIcon />,
    },
  ];
  return (
    <div>
      {navItems.slice(0, slice).map((n) => (
        <NavBtn key={n.id} label={n.label} path={n.path} icon={n.icon} />
      ))}
      <div
        onClick={() => {
          setActive((prev) => !prev);
          setSlice(slice === 7 ? 99 : 7);
        }}
        className="mt-1"
      >
        <ShowMore isActive={active} />
      </div>
    </div>
  );
}
