import { lazy, Suspense } from "react";

const SideBar = lazy(() =>
  import("@/widgets/sidebar/ui").then((mod) => ({ default: mod.SideBar })),
);

export default function Shorts() {
  return (
    <div className="h-1000 mt-29 duration-200 @mdxs:ml-18 ">
      <div
        className="w-full @mdxs:w-[calc(100%-70px)] h-17
			 top-0 fixed mt-12 bg-(--glass-bg) backdrop-blur-3xl"
      ></div>
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <SideBar />
        </div>
      </Suspense>
    </div>
  );
}
