"use client";

import { useState } from "react";
import { ShowMore } from "../utils/ShowMore";
import { SubsBtn } from "./SubsBtn";
import { SubsProfile } from "./SubsProfile";
import { useSubscriptionsSide } from "@/entities/subscriptions-side-menu/model/useSubscriptionsSide";

export function Subscriptions() {
  const [active, setActive] = useState(false);
  const [slice, setSlice] = useState(7);

  const userId = "12w3";
  const { subscriptions, isLoading, error } = useSubscriptionsSide(userId);

  if (isLoading) return <div>Loading</div>;
  return (
    <div className="">
      <SubsBtn />
      {subscriptions.slice(0, slice).map((s) => (
        <SubsProfile
          key={s.channelId}
          pfp={s.pfp}
          title={s.title}
          url={s.url}
          live={s.live}
          newVideoChecked={s.newVideoChecked}
        />
      ))}
      <div
        onClick={() => {
          setActive((prev) => !prev);
          setSlice(slice === 7 ? 99 : 7);
        }}
        className="mt-1"
      >
        <ShowMore isActive={active} />
      </div>
    </div>
  );
}
