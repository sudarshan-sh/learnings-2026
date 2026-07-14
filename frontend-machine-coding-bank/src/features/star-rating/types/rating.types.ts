export interface StarRatingProps {
  defaultValue?: number;
  maxStars?: number;
  readOnly?: boolean;
  onChange?: (rating: number) => void;
}

export interface StarProps {
  filled?: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
}
