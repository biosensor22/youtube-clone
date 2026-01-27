export function SideMenuContainer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-x-2 px-4 relative scrollbar-side h-[95%] mt-12 pt-3 scrollbar-side">
      {children}
    </div>
  );
}
