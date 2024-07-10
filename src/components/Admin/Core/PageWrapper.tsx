import { ReactNode, useState,} from 'react';
import { FooterAdmin } from '../Footer/Footer';
import { HeaderMenuAdmin } from '../HeaderMenu/HeaderMenu';
import { LeftMenuAdmin } from '../LeftMenu/LeftMenu';
import { PopUpAuth } from '../../PopUp/PopUpAuth';
import styles from './Container.module.css';
import { MainContent } from './MainContent';

export const PageWrapper = ({ children}:{children: ReactNode}) => {
  const [popUpAuth, setPopUpAuth] = useState(false);

  return (
    <div className={styles.mainWrap}>
      <HeaderMenuAdmin setPopUpAuth={setPopUpAuth} />
      <div className={`${styles.container} ${styles.innerWrap}`}>
        <LeftMenuAdmin />
        <MainContent>{children}</MainContent>
      </div>
      <FooterAdmin />
    </div>
  );
};
