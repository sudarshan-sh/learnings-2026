"use client";
import { useState } from "react";
import { StarRatingProps } from "../types/rating.types";
import Star from "./Star";

export default function StarRating({
  defaultValue = 0,
  maxStars = 5,
  readOnly = false,
  onChange,
}: StarRatingProps) {
  const [selectedRating, setSelectedRating] = useState(defaultValue);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const currentRating = hoverRating || selectedRating;

  const handleSelect = (rating: number) => {
    if (readOnly) return;
    setSelectedRating(rating);
    onChange?.(rating);
  };

  return (
    <div className="flex gap-2">
      {Array.from({ length: maxStars }, (_, idx) => {
        const rating = idx + 1;

        return (
          <Star
            key={rating}
            filled={rating <= currentRating}
            onClick={() => handleSelect(rating)}
            onMouseEnter={() => !readOnly && setHoverRating(rating)}
          />
        );
      })}
    </div>
  );
}
