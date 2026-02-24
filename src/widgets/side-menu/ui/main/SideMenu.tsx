"use client";

import { LogoHome } from "@/widgets/header";
import { SideMenuBtn } from "@/widgets/header/ui/side-menu-btn";

import {
  NavPanel,
  Subscriptions,
  YouPanel,
  useSideMenuScroll,
  ModalBg,
  SideMenuLayer,
  SideMenuContainer,
  NavBtnPanel,
} from "@/widgets/side-menu";

import { Links } from "@/widgets/side-menu";
import { SplitLine } from "@/shared/ui/ui/SplitLine";

export function SideMenu() {
  useSideMenuScroll();

  return (
    <div>
      <ModalBg />
      <SideMenuLayer>
        <div className="flex z-100 items-center gap-x-4 px-2.5 bg-(--bg-dark) fixed w-full top-0 left-0 mt-2 ">
          <SideMenuBtn />
          <LogoHome />
        </div>

        <SideMenuContainer>
          <div>
            <NavPanel />
          </div>

          <SplitLine className="top-3" />

          <div className="mt-6 flex flex-col h-10 w-full">
            <Subscriptions />
            <SplitLine className="top-3" />

            <div className="mt-6">
              <YouPanel />
              <NavBtnPanel />
              <SplitLine className="top-3" />
              <div className="mt-7 mb-6">
                <Links />
              </div>
            </div>
          </div>
        </SideMenuContainer>
      </SideMenuLayer>
    </div>
  );
}
