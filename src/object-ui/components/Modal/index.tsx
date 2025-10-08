import { h } from 'preact';
import clsx from 'clsx';
import styles from './Modal.module.css';
import { IconButton } from '../IconButton';
import { AiOutlineClose } from 'react-icons/ai';
import { Group } from '../Group';

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  actions: React.ReactNode;
};

export const Modal = ({
  children,
  title,
  isOpen,
  actions,
  onClose,
}: ModalProps) => {
  return (
    <div className={clsx(styles.modal, isOpen && styles.open)}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>{title}</h2>
          <IconButton size="small" onClick={onClose}>
            <AiOutlineClose />
          </IconButton>
        </div>
        <div className={styles.content}>{children}</div>
        <div className={styles.actions}>
          <Group fullWidth>{actions}</Group>
        </div>
      </div>
    </div>
  );
};
