interface InputProps extends React.ComponentProps<'input'> {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ startAdornment, endAdornment, ...props }) => (
  <label className="flex h-10 w-full cursor-text items-center gap-2 rounded border border-neutral-200 bg-neutral-100 px-4 text-neutral-700 focus-within:bg-neutral-50 focus-within:outline focus-within:outline-4 focus-within:-outline-offset-1 focus-within:outline-blue-400">
    {startAdornment}
    <input
      type="text"
      {...props}
      className="flex-grow self-stretch bg-transparent font-normal text-neutral-950 outline-none placeholder:select-none placeholder:text-neutral-500"
    />
    {endAdornment}
  </label>
);
