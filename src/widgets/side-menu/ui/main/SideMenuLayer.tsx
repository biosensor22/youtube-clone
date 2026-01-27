import { useAppSelector } from "@/app/providers/hooks";

export function SideMenuLayer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isOpen = useAppSelector((state) => state.menu.isOpen);

  return (
    <div
      className={`fixed z-100 top-0 w-0 transition-all ease-in-out duration-300 -left-60 h-full bg-(--bg-dark) pt-2
        
					${isOpen ? "translate-x-60 w-60 pointer-events-auto z-10 opacity-100" : "w-0 pointer-events-none opacity-0 -z-10"}
			`}
    >
      {children}
    </div>
  );
}
