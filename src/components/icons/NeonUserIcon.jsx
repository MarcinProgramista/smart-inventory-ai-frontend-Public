export default function NeonUserIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="#6fe3ff"
        strokeWidth="2"
        style={{ filter: "drop-shadow(0 0 8px #00baff)" }}
      />
      <circle
        cx="12"
        cy="9"
        r="3.5"
        stroke="#6fe3ff"
        strokeWidth="2"
        style={{ filter: "drop-shadow(0 0 6px #00baff)" }}
      />
      <path
        d="M5 19c1.5-3 4-5 7-5s5.5 2 7 5"
        stroke="#6fe3ff"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ filter: "drop-shadow(0 0 6px #00baff)" }}
      />
    </svg>
  );
}
