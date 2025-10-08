import { h } from 'preact';
import styles from './Button.module.css';
import clsx from 'clsx';

type ButtonProps = {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary';
  children: string;
  onClick: () => void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  signal?: 'neutral' | 'success' | 'warning' | 'error';
  disabled?: boolean;
  fullWidth?: boolean;
};

export const Button = ({
  size = 'medium',
  color = 'secondary',
  startIcon,
  endIcon,
  signal,
  fullWidth,
  onClick,
  children,
  disabled,
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        styles.button,
        styles[color],
        styles[size],
        signal && styles[signal],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {startIcon && <span className={styles.startIcon}>{startIcon}</span>}
      <span className={styles.label}>{children}</span>
      {endIcon && <span className={styles.endIcon}>{endIcon}</span>}
    </button>
  );
};
