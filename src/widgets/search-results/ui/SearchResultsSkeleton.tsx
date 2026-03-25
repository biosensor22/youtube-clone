export function SearchResultsSkeleton() {
  return (
    <div className="animate-pulse rounded-xl bg-(--btn-bg-color) p-2.5 sm:p-3">
      <div className="grid grid-cols-[minmax(0,46vw)_1fr] gap-3.5 md:grid-cols-[420px_minmax(0,1fr)] lg:grid-cols-[460px_minmax(0,1fr)] md:gap-5">
        <div className="aspect-video rounded-xl bg-(--hover-btn-color)" />
        <div className="min-w-0 py-1">
          <div className="h-6 w-[88%] rounded-full bg-(--hover-btn-color)" />
          <div className="mt-2.5 h-6 w-[70%] rounded-full bg-(--hover-btn-color)" />
          <div className="mt-4 h-4 w-32 rounded-full bg-(--hover-btn-color)" />
          <div className="mt-2.5 h-4 w-48 rounded-full bg-(--hover-btn-color)" />
        </div>
      </div>
    </div>
  );
}
