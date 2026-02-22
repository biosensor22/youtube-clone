export function SplitLine({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={`w-full relative border-b left-0 border-white/20
      ${className || ""}`}
      {...props}
    ></div>
  );
}
