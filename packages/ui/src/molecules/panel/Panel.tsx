import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { PanelProps } from './Panel.types';

export const Panel = (props: PanelProps) => {
  const { className = '', children } = props;
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div
      className={twMerge(
        'transition-all ease-in-out duration-500',
        'p-4 rounded-sm',
        show ? 'shadow-[var(--shadow-panel)]' : 'shadow-none',
        className
      )}
    >
      {children}
    </div>
  );
};

Panel.displayName = 'Panel';
