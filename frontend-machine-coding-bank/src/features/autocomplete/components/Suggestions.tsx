/* eslint-disable @typescript-eslint/no-explicit-any */
import ListItem from "./ListItem";

export default function Suggestions({
  suggestions,
  onSelect,
  selectedSuggestion,
}: any) {
  return (
    <div className="suggestions">
      {suggestions?.map((suggestion: { name?: string }, index: number) => {
        return (
          <ListItem
            key={index}
            suggestion={suggestion}
            onSelect={onSelect}
            selectedSuggestion={selectedSuggestion}
          />
        );
      })}
    </div>
  );
}
