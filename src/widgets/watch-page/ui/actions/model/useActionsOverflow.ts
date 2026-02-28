"use client";

import { useLayoutEffect, useState } from "react";
import type { MutableRefObject, RefObject } from "react";
import type { SecondaryActionItem } from "./types";

type UseActionsOverflowArgs = {
  secondaryActions: SecondaryActionItem[];
  actionsWrapRef: RefObject<HTMLDivElement | null>;
  reactionsRef: RefObject<HTMLDivElement | null>;
  shareRef: RefObject<HTMLButtonElement | null>;
  optionsButtonWrapRef: RefObject<HTMLDivElement | null>;
  measureRefs: MutableRefObject<Record<string, HTMLButtonElement | null>>;
  dependencyKey: number;
};

export function useActionsOverflow({
  secondaryActions,
  actionsWrapRef,
  reactionsRef,
  shareRef,
  optionsButtonWrapRef,
  measureRefs,
  dependencyKey,
}: UseActionsOverflowArgs) {
  const [overflowActionIds, setOverflowActionIds] = useState<string[]>([]);

  useLayoutEffect(() => {
    if (
      !actionsWrapRef.current ||
      !reactionsRef.current ||
      !shareRef.current ||
      !optionsButtonWrapRef.current
    ) {
      return;
    }

    const GAP = 8;

    const recalcOverflow = () => {
      if (
        !actionsWrapRef.current ||
        !reactionsRef.current ||
        !shareRef.current ||
        !optionsButtonWrapRef.current
      ) {
        return;
      }

      const containerWidth = actionsWrapRef.current.clientWidth;
      const fixedWidth =
        reactionsRef.current.offsetWidth +
        shareRef.current.offsetWidth +
        optionsButtonWrapRef.current.offsetWidth;
      const availableSecondarySpace = Math.max(
        0,
        containerWidth - fixedWidth - GAP * 2,
      );

      let usedWidth = 0;
      let visibleCount = 0;
      const nextOverflow: string[] = [];

      for (const action of secondaryActions) {
        const measuredWidth = measureRefs.current[action.id]?.offsetWidth ?? 0;
        const widthWithGap = measuredWidth + (visibleCount > 0 ? GAP : 0);

        if (usedWidth + widthWithGap <= availableSecondarySpace) {
          usedWidth += widthWithGap;
          visibleCount += 1;
          continue;
        }

        nextOverflow.push(action.id);
      }

      setOverflowActionIds((prev) => {
        if (
          prev.length === nextOverflow.length &&
          prev.every((id, index) => id === nextOverflow[index])
        ) {
          return prev;
        }
        return nextOverflow;
      });
    };

    const observer = new ResizeObserver(recalcOverflow);
    const actionsWrap = actionsWrapRef.current;
    const reactions = reactionsRef.current;
    const shareButton = shareRef.current;
    const optionsWrap = optionsButtonWrapRef.current;

    observer.observe(actionsWrap);
    observer.observe(reactions);
    observer.observe(shareButton);
    observer.observe(optionsWrap);

    recalcOverflow();

    return () => observer.disconnect();
  }, [
    actionsWrapRef,
    reactionsRef,
    shareRef,
    optionsButtonWrapRef,
    measureRefs,
    secondaryActions,
    dependencyKey,
  ]);

  const visibleSecondaryActions = secondaryActions.filter(
    (action) => !overflowActionIds.includes(action.id),
  );
  const overflowSecondaryActions = secondaryActions.filter((action) =>
    overflowActionIds.includes(action.id),
  );

  return {
    visibleSecondaryActions,
    overflowSecondaryActions,
  };
}
