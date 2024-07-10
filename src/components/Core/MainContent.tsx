import styles from './Container.module.css';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../router/routes';
import { ReactNode } from 'react';

export const MainContent = ({ children }: { children: ReactNode }) => {
  return <div className={styles.mainContentWrap}>{children}</div>;
};
