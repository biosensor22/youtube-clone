import Image from "next/image";

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
  return (
    <div className="mt-2.5 flex items-start gap-3">
      <Image
        src="https://i.pravatar.cc/96?u=local-user"
        alt="You"
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="w-full">
        <input
          value={newCommentText}
          onChange={(event) => onChangeNewComment(event.target.value)}
          placeholder="Add a comment..."
          className="w-full border-b border-(--border-color) bg-transparent px-1 py-2 outline-none focus:border-white"
        />
        <div className="mt-2 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="rounded-full px-4 py-1.5 text-sm hover:bg-(--hover-btn-color)"
          >
            Cancel
          </button>
          <button
            onClick={onCreate}
            className="rounded-full bg-(--btn-bg-color) px-4 py-1.5 text-sm hover:bg-(--hover-btn-color)"
          >
            Comment
          </button>
        </div>
      </div>
    </div>
  );
}
