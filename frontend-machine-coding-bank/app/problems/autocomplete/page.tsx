/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import AutoComplete from "@/src/features/autocomplete/components/AutoComplete";
import { items } from "@/src/features/autocomplete/list";
import { useEffect, useState } from "react";

export default function Page() {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(items);
      }, 2000);
    }).then((data: any) => {
      setIsLoading(false);
      setSuggestions(data);
    });
  }, []);

  function onChange(value: any) {
    console.log("MAKE API CALL:", value);
  }

  return (
    <div className="flex flex-col gap-3 min-h-screen items-center justify-center">
      <AutoComplete
        debounceInput={true}
        suggestions={suggestions}
        isLoading={isLoading}
        onChange={onChange}
      />
    </div>
  );
}
