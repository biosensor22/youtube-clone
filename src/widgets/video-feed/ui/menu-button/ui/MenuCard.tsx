import { forwardRef, RefObject } from "react";
import { usePosition } from "../model/usePosition";
import { buttonsVideo, buttonsPlaylist } from "../model/buttons";
import { Button } from "./Button";

type MenuBtnProps = {
  type: string;
};

export const MenuCard = forwardRef<HTMLDivElement, MenuBtnProps>(
  ({ type }, ref) => {
    const { position } = usePosition(ref as RefObject<HTMLDivElement>);

    return (
      <div
        ref={ref}
        className={`bg-(--dark-grey-bg) rounded-xl w-65 flex flex-col ${
          position === "left" ? "right-0" : "left-0"
        }`}
        style={{ position: "absolute" }}
      >
        {type === "video" &&
          buttonsVideo.map((i) => (
            <Button id={i.id} label={i.label} icon={i.icon} />
          ))}

        {type === "stream" &&
          buttonsVideo.map((i) => (
            <Button id={i.id} label={i.label} icon={i.icon} />
          ))}

        {type === "playlist" &&
          buttonsPlaylist.map((i) => (
            <Button id={i.id} label={i.label} icon={i.icon} />
          ))}
      </div>
    );
  },
);
