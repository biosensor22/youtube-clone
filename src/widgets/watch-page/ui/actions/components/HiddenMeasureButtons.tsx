import type { MutableRefObject } from "react";
import type { SecondaryActionItem } from "../model";

type HiddenMeasureButtonsProps = {
  secondaryActions: SecondaryActionItem[];
  measureRefs: MutableRefObject<Record<string, HTMLButtonElement | null>>;
};

export function HiddenMeasureButtons({
  secondaryActions,
  measureRefs,
}: HiddenMeasureButtonsProps) {
  return (
    <div className="pointer-events-none absolute -z-10 opacity-0">
      <div className="flex items-center gap-2">
        {secondaryActions.map((action) => (
          <button
            key={`measure-${action.id}`}
            ref={(node) => {
              measureRefs.current[action.id] = node;
            }}
            className="flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-(--btn-bg-color) px-3 text-[15px] font-medium"
          >
            {action.icon}
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}
