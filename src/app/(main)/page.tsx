"use client";

import dynamic from "next/dynamic";
const CategoriesList = dynamic(
  () =>
    import("@/widgets/category").then((mod) => ({
      default: mod.CategoriesList,
    })),
  { ssr: false },
);
const MediaSection = dynamic(
  () =>
    import("@/widgets/video-feed").then((mod) => ({
      default: mod.MediaSection,
    })),
  { ssr: false },
);
const SideBar = dynamic(() => import("@/widgets/sidebar"), { ssr: false });
export default function Home() {
  return (
    <div className="mt-29 duration-200 @mdxs:ml-18 overflow-y-hidden">
      <div
        className="sm:w-full w-screen @mdxs:w-[calc(100%-70px)] h-17
       top-0 fixed mt-12 z-10"
      >
        <div className="md:px-5 px-3 w-screen h-full">
          <CategoriesList />
        </div>
      </div>
      <div>
        <SideBar />
      </div>

      <MediaSection />
    </div>
  );
}
