"use client";

import clsx from "clsx";
import { forwardRef, RefObject } from "react";

import {
  usePosition,
  buttonsVideo,
  buttonsPlaylist,
  Button,
} from "@/widgets/video-feed";

type MenuBtnProps = {
  type: string;
};

export const MenuCard = forwardRef<HTMLDivElement, MenuBtnProps>(
  ({ type }, ref) => {
    const { position } = usePosition(ref as RefObject<HTMLDivElement>);

    return (
      <div
        ref={ref}
        className={clsx("bg-(--dark-grey-bg) rounded-xl w-65 flex flex-col", {
          "right-0": position.horizontal === "left",
          "left-0": position.horizontal === "right",
          "bottom-9": position.vertical === "top",
          "top-3": position.vertical === "bottom",
        })}
        style={{ position: "absolute" }}
      >
        {type === "video" &&
          buttonsVideo.map((i) => (
            <Button key={i.id} id={i.id} label={i.label} icon={i.icon} />
          ))}

        {type === "stream" &&
          buttonsVideo.map((i) => (
            <Button key={i.id} id={i.id} label={i.label} icon={i.icon} />
          ))}

        {type === "playlist" &&
          buttonsPlaylist.map((i) => (
            <Button key={i.id} id={i.id} label={i.label} icon={i.icon} />
          ))}
      </div>
    );
  },
);

MenuCard.displayName = "ModalMenu";
