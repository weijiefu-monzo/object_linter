import { h } from 'preact';
import styles from './ListItem.module.css';
import clsx from 'clsx';
type ListItemProps = {
  avatar?: React.ReactNode;
  label?: string;
  description?: string;
  action?: React.ReactNode;
  onClick?: () => void;
};
export const ListItem = ({
  avatar,
  label,
  description,
  action,
  onClick,
}: ListItemProps) => {
  const handleActionClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <li
      className={clsx(styles.listItem, onClick && styles.clickable)}
      onClick={onClick}
    >
      {avatar && <div className={styles.avatar}>{avatar}</div>}
      <div className={styles.content}>
        {label && <div className={styles.label}>{label}</div>}
        {description && <div className={styles.description}>{description}</div>}
      </div>
      {action && (
        <div className={styles.action} onClick={handleActionClick}>
          {action}
        </div>
      )}
    </li>
  );
};
