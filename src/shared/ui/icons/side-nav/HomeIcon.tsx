import { urlPaths } from "@/shared/api/urlPaths";

interface HomeSVGProps extends React.SVGProps<SVGSVGElement> {
  isActive: string;
  onSwitch?: () => void;
}

export function HomeIcon({ isActive, ...props }: HomeSVGProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      width="24"
      viewBox="0 0 24 24"
      focusable="false"
      aria-hidden="true"
      {...props}
    >
      <path
        fill="currentColor"
        d={
          isActive === urlPaths.home
            ? "m11.485 2.143-8 4.8-2 1.2a1 1 0 001.03 1.714L3 9.567V20a2 2 0 002 2h5v-8h4v8h5a2 2 0 002-2V9.567l.485.29a1 1 0 001.03-1.714l-2-1.2-8-4.8a1 1 0 00-1.03 0Z"
            : "m11.485 2.143-8 4.8-2 1.2a1 1 0 001.03 1.714L3 9.567V20a2 2 0 002 2h6v-7h2v7h6a2 2 0 002-2V9.567l.485.29a1 1 0 001.03-1.714l-2-1.2-8-4.8a1 1 0 00-1.03 0ZM5 8.366l7-4.2 7 4.2V20h-4v-5.5a1.5 1.5 0 00-1.5-1.5h-3A1.5 1.5 0 009 14.5V20H5V8.366Z"
        }
      />
    </svg>
  );
}
