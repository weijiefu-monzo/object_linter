import { h } from 'preact';
import styles, { fullWidth } from './IconButton.module.css';
import clsx from 'clsx';
import { useEffect } from 'preact/hooks';
type IconButtonProps = {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick: () => void;
  signal?: 'disabled' | 'success' | 'warning' | 'error';
  fullWidth?: boolean;
};
export const IconButton = ({
  size = 'medium',
  color = 'secondary',
  signal,
  children,
  fullWidth,
  onClick,
}: IconButtonProps) => {
  return (
    <button
      className={clsx(
        styles.iconButton,
        styles[size],
        styles[color],
        signal && styles[signal],
        fullWidth && styles.fullWidth
      )}
      onClick={onClick}
      disabled={signal === 'disabled'}
    >
      <span className={styles.icon}>{children}</span>
    </button>
  );
};
