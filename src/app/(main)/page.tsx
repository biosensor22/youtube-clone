import { CategoriesList } from "@/widgets/category/ui";
import { SideBar } from "@/widgets/sidebar/ui";
import { MediaSection } from "@/widgets/video-feed/ui/MediaSection";

export default function Home() {
  return (
    <div className="h-1000 mt-29 duration-200 @mdxs:ml-18 @container">
      <div
        className="w-full @mdxs:w-[calc(100%-70px)] h-17
       top-0 fixed mt-12 z-10"
      >
        <div className="md:px-5 px-3 h-full">
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
