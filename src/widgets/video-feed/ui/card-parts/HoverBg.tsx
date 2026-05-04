import { useDominantColor } from "../../model";

interface HoverBgProps {
  thumbnail: string;
}

export function HoverBg({ thumbnail }: HoverBgProps) {
  const dominantColor = useDominantColor(thumbnail);

  return (
    <div
      className={`w-full h-full absolute rounded-xl cursor-pointer
        group-hover:bg-[rgba(var(--bg),0.2)] bg-[rgba(var(--bg),0)] duration-150 group-hover:scale-105
        `}
      style={{ "--bg": dominantColor } as React.CSSProperties}
    />
  );
}
