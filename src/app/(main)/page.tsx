import { CategoriesList } from "@/widgets/category/ui";
import { SideBar } from "@/widgets/sidebar/ui";

import { MediaSection } from "@/widgets/video-feed/ui/MediaSection";

export default function Home() {
  return (
    <div className="mt-29 duration-200 @mdxs:ml-18 @container">
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
