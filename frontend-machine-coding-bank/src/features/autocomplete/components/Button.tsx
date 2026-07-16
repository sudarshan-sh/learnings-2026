/* eslint-disable @typescript-eslint/no-explicit-any */

export default function Button({ label, onClick = () => {}, ...rest }: any) {
  return (
    <button onClick={onClick} {...rest}>
      {label}
    </button>
  );
}
