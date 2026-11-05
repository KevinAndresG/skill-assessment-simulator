import type { ButtonHTMLAttributes } from 'react';
import { cx } from '@/lib/utils';

type Variant = 'default' | 'primary' | 'ghost' | 'warn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const VARIANT_CLASS: Record<Variant, string> = { default: '', primary: 'pri', ghost: 'ghost', warn: 'warn' };

export function Button({ variant = 'default', className, type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={cx('btn', VARIANT_CLASS[variant], className)} {...props} />;
}
