import { h } from 'preact';
import styles from './Switch.module.css';
import clsx from 'clsx';

type SwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};
export const Switch = ({ checked, onChange }: SwitchProps) => {
  return (
    <div
      className={clsx(styles.switch, checked && styles.checked)}
      onClick={() => onChange(!checked)}
    >
      <div className={styles.track}>
        <div className={styles.thumb}></div>
        <div className={styles.status}> {checked ? 'On' : 'Off'} </div>
      </div>
    </div>
  );
};
