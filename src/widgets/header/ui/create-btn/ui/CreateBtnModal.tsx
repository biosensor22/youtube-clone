"use client";

import { LiveIcon, VideoIcon } from "@/shared/ui/icons";
import { CreatePostIcon } from "@/shared/ui/icons";
import Link from "next/link";
import { close } from "../model";
import { useDispatch } from "react-redux";
import { useCreateBtnContext } from "./CreateBtnContext";
import { useClickOutside } from "@/shared/lib/hooks";

export function CreateBtnModal() {
  const createItems = [
    {
      id: 1,
      title: "Upload video",
      url: "/upload",
      icon: <VideoIcon className="w-6 h-6" />,
    },
    {
      id: 2,
      title: "Go live",
      url: "/",
      icon: <LiveIcon className="w-6 h-6" />,
    },
    {
      id: 3,
      title: "Create post",
      url: "/",
      icon: <CreatePostIcon className="w-6 h-6" />,
    },
  ];
  const { triggerRef } = useCreateBtnContext();
  const dispatch = useDispatch();

  const { modalRef } = useClickOutside(triggerRef, () => dispatch(close()));

  return (
    <div
      ref={modalRef}
      className="w-44 h-32.5 py-2 rounded-xl fixed top-14 right-13 z-11 bg-(--bg-drop-menu) flex flex-col"
    >
      {createItems.map((item) => (
        <Link
          className="w-full px-4 py-1.75 cursor-pointer hover:bg-(--hover-btn-color) text-white text-[14px]"
          key={item.id}
          href={item.url}
        >
          <div className="flex gap-3">
            {item.icon}
            <p>{item.title}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
