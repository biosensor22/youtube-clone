"use client";

import { useRef } from "react";
import { MenuIcon, ShareIcon } from "@/shared/ui/icons";
import {
  SECONDARY_ACTIONS,
  VIDEO_OPTIONS_MENU,
  useActionsMenu,
  useActionsOverflow,
  type WatchActionRowProps,
} from "./model";
import {
  ActionPillButton,
  ChannelInfo,
  HiddenMeasureButtons,
  OptionsMenu,
  ReactionsButtons,
} from "./components";

export function Actions({
  channelAvatar,
  channelName,
  subscribers,
  verified,
  isSubscribed,
  onToggleSubscribe,
  videoReaction,
  displayedLikeCount,
  dislikeCount,
  likeRollKey,
  onLike,
  onDislike,
}: WatchActionRowProps) {
  const actionsWrapRef = useRef<HTMLDivElement>(null);
  const reactionsRef = useRef<HTMLDivElement>(null);
  const shareRef = useRef<HTMLButtonElement>(null);
  const optionsButtonWrapRef = useRef<HTMLDivElement>(null);
  const measureRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const {
    isOptionsOpen,
    optionsTriggerRef,
    modalRef,
    toggleOptions,
    closeOptions,
  } = useActionsMenu();

  const { visibleSecondaryActions, overflowSecondaryActions } =
    useActionsOverflow({
      secondaryActions: SECONDARY_ACTIONS,
      actionsWrapRef,
      reactionsRef,
      shareRef,
      optionsButtonWrapRef,
      measureRefs,
      dependencyKey: displayedLikeCount,
    });

  return (
    <div className="mt-3 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
      <ChannelInfo
        channelAvatar={channelAvatar}
        channelName={channelName}
        subscribers={subscribers}
        verified={verified}
        isSubscribed={isSubscribed}
        onToggleSubscribe={onToggleSubscribe}
      />

      <div
        ref={actionsWrapRef}
        className="relative flex min-w-0 items-center gap-2 xl:ml-8 xl:justify-end"
      >
        <HiddenMeasureButtons
          secondaryActions={SECONDARY_ACTIONS}
          measureRefs={measureRefs}
        />

        <div ref={reactionsRef}>
          <ReactionsButtons
            videoReaction={videoReaction}
            displayedLikeCount={displayedLikeCount}
            dislikeCount={dislikeCount}
            likeRollKey={likeRollKey}
            onLike={onLike}
            onDislike={onDislike}
          />
        </div>

        <ActionPillButton
          ref={shareRef}
          label="Share"
          icon={<ShareIcon className="h-5 w-5" />}
        />

        {visibleSecondaryActions.map((action) => (
          <ActionPillButton
            key={action.id}
            label={action.label}
            icon={action.icon}
          />
        ))}

        <div ref={optionsButtonWrapRef} className="relative shrink-0">
          <button
            ref={optionsTriggerRef}
            onClick={toggleOptions}
            className="rounded-full bg-(--btn-bg-color) p-2 hover:bg-(--hover-btn-color)"
            aria-label="Video options"
            aria-expanded={isOptionsOpen}
            aria-haspopup="menu"
          >
            <MenuIcon className="h-5 w-5" />
          </button>

          <OptionsMenu
            isOpen={isOptionsOpen}
            modalRef={modalRef}
            overflowSecondaryActions={overflowSecondaryActions}
            videoOptions={VIDEO_OPTIONS_MENU}
            onClose={closeOptions}
          />
        </div>
      </div>
    </div>
  );
}
