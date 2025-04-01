import { FC, MouseEvent } from 'react';
import styles from './button.module.css';
import { ButtonUIProps } from './type';

export const ButtonUI: FC<ButtonUIProps> = ({
  label,
  onClick,
  disabled = false,
  type = 'button',
  className = '',
  href,
  openInNewTab = false,
}) => {
  const styleClasses = `${styles.button} ${className}`.trim();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    if (href) {
      openInNewTab 
        ? window.open(href, '_blank', 'noopener,noreferrer')
        : (window.location.href = href);
    }

    onClick?.();
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={styleClasses}
      aria-label={label} // Для доступности
    >
      {label}
    </button>
  );
};