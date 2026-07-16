"use client";
import AutoComplete from "@/src/features/autocomplete/components/AutoComplete";
import { items } from "@/src/features/autocomplete/list";
import { useState } from "react";

export default function Page() {
  const [suggestions, setSuggestions] = useState(items);

  return (
    <div className="flex flex-col gap-3 min-h-screen items-center justify-center">
      <AutoComplete suggestions={suggestions} />
    </div>
  );
}
