import { NextListIcon } from "@/shared/ui";

type ReplyToggleProps = {
  repliesCount: number;
  onToggleReplies: () => void;
  isRepliesOpen: boolean;
};

export function ReplyToggle({
  repliesCount,
  onToggleReplies,
  isRepliesOpen,
}: ReplyToggleProps) {
  return (
    <div>
      {repliesCount > 0 ? (
        <button
          onClick={onToggleReplies}
          className="mt-1.5 inline-flex h-8 items-center gap-2 rounded-full px-2 text-[14px] font-semibold text-(--main-text-color) hover:bg-(--hover-btn-color)"
        >
          <span>
            {isRepliesOpen
              ? "Hide replies"
              : `${repliesCount > 1 ? `• ${repliesCount} replies` : `• ${repliesCount} reply`} `}
          </span>

          <NextListIcon
            className={`h-4 w-4 transition-transform ${isRepliesOpen ? "rotate-270" : "rotate-90"}`}
          />
        </button>
      ) : null}
    </div>
  );
}
