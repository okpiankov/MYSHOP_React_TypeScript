import { ReactNode, useState } from 'react';
import { Footer } from '../../Footer/Footer';
import { HeaderMenu } from '../HeaderMenu/HeaderMenu';
import { LeftMenuCabinet } from '../LeftMenu/LeftMenu';
import { PopUpAuth } from '../../PopUp/PopUpAuth';
import styles from './Container.module.css';
import { MainContent } from './MainContent';

export const PageWrapper = ({ children }: { children: ReactNode }) => {
  const [popUpAuth, setPopUpAuth] = useState(false);

  // состояние для бургер меню при адаптации под планшет
  const [leftMenu, setLeftMenu] = useState(true);

  return (
    <div className={styles.mainWrap}>
      <HeaderMenu setPopUpAuth={setPopUpAuth} setLeftMenu={setLeftMenu} leftMenu={leftMenu}/>
      <div className={`${styles.container} ${styles.innerWrap} ${leftMenu === true ? styles.innerWrapTrue : ''}`}>
      {leftMenu && <LeftMenuCabinet />}
        <MainContent>{children}</MainContent>
      </div>
      <Footer />
    </div>
  );
};
