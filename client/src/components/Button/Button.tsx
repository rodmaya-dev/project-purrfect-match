import type { ComponentPropsWithoutRef } from 'react';
import './Button.css';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary';
}

function Button({
  variant = 'primary',
  type = 'button',
  className,
  ...rest
}: ButtonProps) {
  const classes = ['button', `button_${variant}`, className]
    .filter(Boolean)
    .join(' ');

  return <button type={type} className={classes} {...rest} />;
}

export default Button;