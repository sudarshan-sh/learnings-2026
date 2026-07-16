/* eslint-disable @typescript-eslint/no-explicit-any */
import ListItem from "./ListItem";

export default function Suggestions({
  isLoading,
  suggestions,
  onSelect,
  selectedSuggestion,
}: any) {
  if (isLoading) {
    return (
      <div className="suggestions">
        <div>Loading...</div>
      </div>
    );
  }

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
