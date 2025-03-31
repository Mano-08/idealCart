import { exampleThemeStorage } from '@extension/storage';
import { useStorage } from '@extension/shared';
import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

type ToggleButtonProps = ComponentPropsWithoutRef<'button'>;

export const ToggleButton = ({ className, children, ...props }: ToggleButtonProps) => {
  const theme = useStorage(exampleThemeStorage);

  return (
    <button className={className} onClick={exampleThemeStorage.toggle} {...props}>
      {children}
    </button>
  );
};
