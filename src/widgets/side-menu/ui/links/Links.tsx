export function Links() {
  return (
    <div className="gap-y-2 flex flex-col px-2 text-(--links-color-grey) font-medium text-[13px]">
      <div className="flex flex-col">
        <div className="gap-x-2">
          <a href="#">About </a>
          <a href="#">Press </a>
          <a href="#">Copyrigth</a>
        </div>
        <div>
          <a href="#">Contact us </a>
          <a href="#">Creator </a>
          <a href="#">Advertise </a>
        </div>

        <a href="#">Developers</a>
      </div>
      <div className="flex flex-col">
        <div>
          <a href="#">Terms </a>
          <a href="#">Privacy </a>
          <a href="#">Policy & Safety </a>
        </div>
        <a href="#">How Youtube works </a>
        <a href="#">Test new features </a>
      </div>
      <div>
        <span className="font-light text-[12px] text-(--google-copyright-color)">
          © 2026 Google LLC
        </span>
      </div>
    </div>
  );
}
