/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from "react";
import Button from "./Button";
import InputText from "./InputText";
import Suggestions from "./Suggestions";

function debounce(callback: any, delay: number) {
  let timeoutId: any; // store the timeout ID
  return function (...args: any) {
    clearTimeout(timeoutId); // clear the previous timeout
    // set a new timeout to call the callback after the specified delay
    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

export default function AutoComplete({
  debounceInput,
  suggestions,
  isLoading,
  onChange,
}: any) {
  const [query, setQuery] = useState("");
  const [showList, setShowList] = useState(false);

  const debouncedFunction = useCallback(debounce(onChange, 500), [onChange]); // create a debounced version of the onChange function

  const filteredSuggestions = suggestions.filter(
    (suggestion: { name?: string }) =>
      suggestion?.name?.toLowerCase().includes(query?.toLowerCase()),
  );

  const handleInputChange = (value: any) => {
    setQuery(value);
    setShowList(!!value.length);
    manageDebounceInput(value);
  };

  function manageDebounceInput(value: any) {
    if (debounceInput) {
      debouncedFunction(value); // call the debounced function if debounceInput is true
    } else {
      onChange(value);
    }
  }

  const handleClearInput = () => {
    setQuery("");
    setShowList(false);
  };

  const handleSelectedSuggestion = (selectedSuggestion: string) => {
    setQuery(selectedSuggestion);
    manageDebounceInput(selectedSuggestion);
    setShowList(false);
  };

  let showSuggestionsWithLoader = !!query.length && showList;

  if (isLoading && query.length) {
    showSuggestionsWithLoader = true;
  }

  return (
    <div className="autocomplete">
      <div className="flex gap-2">
        <InputText value={query} onChange={handleInputChange} />
        <Button label="Clear" onClick={handleClearInput} />
      </div>
      {showSuggestionsWithLoader && (
        <Suggestions
          isLoading={isLoading}
          suggestions={filteredSuggestions}
          onSelect={handleSelectedSuggestion}
          selectedSuggestion={query}
        />
      )}
    </div>
  );
}
