/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Button from "./Button";
import InputText from "./InputText";
import Suggestions from "./Suggestions";

export default function AutoComplete({ suggestions }: any) {
  const [query, setQuery] = useState("");
  const [showList, setShowList] = useState(false);

  const filteredSuggestions = suggestions.filter(
    (suggestion: { name?: string }) =>
      suggestion?.name?.toLowerCase().includes(query?.toLowerCase()),
  );

  const handleInputChange = (value: any) => {
    setQuery(value);
    setShowList(!!value.length);
  };

  const handleClearInput = () => {
    setQuery("");
    setShowList(false);
  };

  const handleSelectedSuggestion = (selectedSuggestion: string) => {
    setQuery(selectedSuggestion);
    setShowList(false);
  };

  return (
    <div className="autocomplete">
      <div className="flex gap-2">
        <InputText value={query} onChange={handleInputChange} />
        <Button label="Clear" onClick={handleClearInput} />
      </div>
      {!!showList && (
        <Suggestions
          suggestions={filteredSuggestions}
          onSelect={handleSelectedSuggestion}
          selectedSuggestion={query}
        />
      )}
    </div>
  );
}
