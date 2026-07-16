/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "./Button";

export default function ListItem({
  suggestion,
  onSelect,
  selectedSuggestion,
}: any) {
  const handleSelect = () => {
    onSelect(suggestion.name);
  };
  return (
    <Button
      label={suggestion.name}
      onClick={handleSelect}
      data-selected={suggestion.name.toLowerCase() === selectedSuggestion}
    />
  );
}
