import { h } from 'preact';
import styles from './Page.module.css';

type PageProps = {
  children?: React.ReactNode;
};
export const Page = ({ children }: PageProps) => {
  return <div className={styles.page}>{children}</div>;
};
