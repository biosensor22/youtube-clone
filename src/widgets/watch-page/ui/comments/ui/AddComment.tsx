import { EmojiIcon } from "@/shared/ui/icons/video-icons/EmojiIcon";
import Image from "next/image";
import { useState } from "react";

interface AddCommentProps {
  onChangeNewComment: (value: string) => void;
  onCancel: () => void;
  onCreate: () => void;
  newCommentText: string;
}

export function AddComment({
  onCancel,
  onCreate,
  onChangeNewComment,
  newCommentText,
}: AddCommentProps) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="mt-3 flex items-start gap-3">
      <Image
        src="https://i.pravatar.cc/96?u=local-user"
        alt="You"
        width={40}
        height={40}
        className="h-10 w-10 rounded-full"
      />
      <div className="w-full mb-5">
        <input
          onFocus={() => setFocused(true)}
          value={newCommentText}
          onChange={(event) => onChangeNewComment(event.target.value)}
          placeholder="Add a comment..."
          className="h-8 w-full border-b border-(--border-color) bg-transparent px-1 text-sm outline-none placeholder:text-(--grey-text-color) focus:border-white"
        />

        {focused && (
          <div className="flex mt-2 justify-between">
            <div
              className="p-2 relative -ml-2 rounded-full cursor-pointer justify-between
             hover:bg-(--hover-btn-color)"
            >
              <EmojiIcon />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={onCancel}
                className="h-9 rounded-full px-4 text-sm font-medium hover:bg-(--hover-btn-color)"
              >
                Cancel
              </button>
              <button
                onClick={onCreate}
                className="h-9 rounded-full bg-(--btn-bg-color) px-4 text-sm font-medium hover:bg-(--hover-btn-color)"
              >
                Comment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
