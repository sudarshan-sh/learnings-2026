/* eslint-disable @typescript-eslint/no-explicit-any */

export default function InputText({ value, onChange }: any) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </>
  );
}
