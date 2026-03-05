import { CrossIcon } from "@/shared/ui";
import { clearSearchHistory } from "../api/clearSearchHistory";

interface ClearSearchHistoryProps {
  id: string;
}

export function ClearSearchHistory({ id }: ClearSearchHistoryProps) {
  return (
    <span>
      <CrossIcon
        onClick={() => clearSearchHistory(id)}
        className="w-3.25 font-bold text-(--main-text-color) cursor-pointer"
      />
    </span>
  );
}
