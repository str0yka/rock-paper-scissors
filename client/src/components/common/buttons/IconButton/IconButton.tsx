import cn from 'classnames';

interface IconButtonProps extends React.ComponentProps<'button'> {
  color?: 'success' | 'primary' | 'error' | 'warning' | 'neutral';
  children?: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = ({
  color = 'neutral',
  children,
  ...props
}) => (
  <button
    className={cn(
      'rounded border border-neutral-950/20 p-2 transition-transform',
      'enabled:hover:bg-neutral-950/10 enabled:active:scale-95',
      'focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2',
      'dark:border-neutral-50/10 dark:text-neutral-50',
      {
        neutral:
          'focus-visible:outline-blue-400 dark:bg-neutral-800 dark:enabled:hover:bg-neutral-700',
        primary: 'bg-blue-400 focus-visible:outline-blue-400 enabled:hover:bg-blue-500',
        success: 'bg-green-400 focus-visible:outline-green-400 enabled:hover:bg-green-500',
        error: 'bg-red-400 focus-visible:outline-red-400 enabled:hover:bg-red-500',
        warning: 'bg-orange-400 focus-visible:outline-orange-400 enabled:hover:bg-orange-500',
      }[color],
    )}
    {...props}
  >
    {children}
  </button>
);
