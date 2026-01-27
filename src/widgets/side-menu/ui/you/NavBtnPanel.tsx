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
} from "@/shared/ui/icons/side-menu-icons";
import { NavBtn } from "./NavBtn";
import { ShowMore } from "../utils";

export function NavBtnPanel() {
  const [active, setActive] = useState(false);
  const [slice, setSlice] = useState(7);
  const navItems = [
    {
      id: 1,
      label: "History",
      path: "/history",
      icon: <HistoryIcon />,
    },
    {
      id: 2,
      label: "Playlists",
      path: "/playlists",
      icon: <PlaylistsIcon />,
    },
    {
      id: 3,
      label: "Watch Later",
      path: "/playlist/watch-later",
      icon: <WatchIcon />,
    },
    {
      id: 4,
      label: "Liked videos",
      path: "/playlist/liked-videos",
      icon: <LikeIcon />,
    },
    {
      id: 5,
      label: "Your videos",
      path: "/your-videos",
      icon: <VideoIcon />,
    },
    {
      id: 6,
      label: "Downloads",
      path: "/downloads",
      icon: <DownloadIcon />,
    },
    {
      id: 7,
      label: "Podcasts",
      path: "/podcasts",
      icon: <PodcastsIcon />,
    },
    {
      id: 8,
      label: "Courses",
      path: "/courses",
      icon: <CoursesIcon />,
    },
    {
      id: 9,
      label: "Clips",
      path: "/clips",
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
