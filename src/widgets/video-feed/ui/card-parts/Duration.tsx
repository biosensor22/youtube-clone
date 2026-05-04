import { NoteIcon } from "@/shared/ui";

interface DurationProps {
  id: string;
  duration: string;
}

export function Duration({ id, duration }: DurationProps) {
  return (
    <div
      className="absolute justify-center items-center flex bottom-2 right-2 text-[12px]
         font-medium bg-black/70 rounded-md px-1 py-px gap-1"
    >
      {id.startsWith("music") ? <NoteIcon /> : ""}
      <p>{duration}</p>
    </div>
  );
}
