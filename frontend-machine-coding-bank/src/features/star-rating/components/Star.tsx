import type { StarProps } from "../types/rating.types";

export default function Star({ filled, onClick, onMouseEnter }: StarProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={28}
      height={28}
      fill={filled ? "#f59e0b" : "#d4d4d8"}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className="cursor-pointer transition-colors"
    >
      <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" />
    </svg>
  );
}
