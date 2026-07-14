"use client";
import StarRating from "@/src/features/star-rating/components/StarRating";
import { useState } from "react";

export default function Page() {
  const [rating, setRating] = useState(0);

  const handleRating = (rating: number) => {
    console.log(rating);
    setRating(rating);
  };

  return (
    <main className="flex flex-col gap-3 min-h-screen items-center justify-center">
      <StarRating defaultValue={2} onChange={handleRating} maxStars={5} />
      <p>Selected: {rating}</p>
    </main>
  );
}
