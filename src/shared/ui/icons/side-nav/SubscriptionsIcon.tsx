interface SubscriptionsSVGProps {
  props?: React.SVGProps<SVGSVGElement>;
  onSwitch: () => void;
  isActive: string;
}

export function SubscriptionsIcon({ props, isActive }: SubscriptionsSVGProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      focusable="false"
      aria-hidden="true"
      {...props}
    >
      {isActive === "subscriptions" ? (
        <path
          fill={`white`}
          d="M6 1a2 2 0 00-2 2h16a2 2 0 00-2-2H6ZM1 7v13a2 2 0 002 2h18a2 2 0 002-2V7a2 2 0 00-2-2H3a2 2 0 00-2 2Zm9 10v-7l6 3.5-6 3.5Z"
        ></path>
      ) : (
        <path
          fill={`white`}
          d="M18 1H6a2 2 0 00-2 2h16a2 2 0 00-2-2Zm3 4H3a2 2 0 00-2 2v13a2 2 0 002 2h18a2 2 0 002-2V7a2
         2 0 00-2-2ZM3 20V7h18v13H3Zm13-6.5L10 10v7l6-3.5Z"
        ></path>
      )}
    </svg>
  );
}
