"use client";

export function SkeletonCard() {
  return (
    <div className=" w-full min-h-89.75 flex items-center flex-col gap-y-3 px-2">
      <div className="w-full h-50 bg-gray-400 rounded-xl"></div>

      <div className="flex gap-x-3 w-full">
        <div>
          <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
        </div>
        <div className="gap-2 w-full flex flex-col">
          <div className="w-[80%] h-4 bg-gray-400 rounded-sm"></div>

          <div className="w-[40%] h-4 bg-gray-400 rounded-sm"></div>
        </div>
      </div>
    </div>
  );
}
