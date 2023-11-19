import cn from 'classnames';

interface ButtonProps extends React.ComponentProps<'button'> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <button
    className={cn(
      'min-h-[32px] min-w-[32px] rounded bg-blue-400 px-4 py-1 font-medium text-neutral-50 transition-transform',
      'hover:bg-blue-500',
      'active:scale-95',
      'focus-within:outline-offset-2',
      'focus-visible:outline focus-visible:outline-4 focus-visible:outline-blue-400',
      'dark:text-neutral-950',
    )}
    {...props}
  >
    {children}
  </button>
);
