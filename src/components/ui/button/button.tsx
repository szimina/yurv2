import { FC, MouseEvent } from 'react';
import { ButtonProps } from './type';
import styles from './button.module.css';

export const Button: FC<ButtonProps> = ({
  onClick,
  children,
  disabled = false,
  type = 'button',
  className,
  href,
  openInNewTab = false, // По умолчанию false
}) => {
  const styleClasses = `${styles.button} ${className}`;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    // Если есть href, открываем ссылку
    if (href) {
      if (openInNewTab) {
        window.open(href, '_blank', 'noopener,noreferrer'); // Безопасное открытие
      } else {
        window.location.href = href; // Обычный переход
      }
    }

    // Вызываем пользовательский onClick, если он есть
    onClick?.();
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={styleClasses}
    >
      {children}
    </button>
  );
};