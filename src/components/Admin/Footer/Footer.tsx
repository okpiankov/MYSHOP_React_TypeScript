import { NavLink } from 'react-router-dom';
import styles from './Footer.module.css';
import { ROUTES } from '../../../router/routes';

export const FooterAdmin = () => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} ${styles.footerWrap}`}></div>
    </footer>
  );
};
