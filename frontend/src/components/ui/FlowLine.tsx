// src/components/ui/FlowLine.tsx
export function FlowLine() {
  return (
    <svg
      viewBox="0 0 400 500"
      fill="none"
      className="h-full w-full"
      aria-hidden="true"
    >
      <path
        d="M40 20 C 40 140, 200 120, 200 250 C 200 380, 360 360, 360 480"
        stroke="#0F766E"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="40" cy="20" r="5" fill="#0F766E" />
      <circle cx="200" cy="250" r="5" fill="#0F766E" />
      <circle cx="360" cy="480" r="5" fill="#0F766E" />
      <path
        d="M40 20 C 40 140, 200 120, 200 250 C 200 380, 360 360, 360 480"
        stroke="#CCFBF1"
        strokeWidth="14"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  );
}