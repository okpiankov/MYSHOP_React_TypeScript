import { ReactNode, useState } from 'react';
import { Footer } from '../Footer/Footer';
import { HeaderMenu } from '../HeaderMenu/HeaderMenu';
import { LeftMenu } from '../LeftMenu/LeftMenu';
import { PopUpAuth } from '../PopUp/PopUpAuth';
import styles from './Container.module.css';
import { MainContent } from './MainContent';
import { getUser } from '../../store/user/slice';
import { useSelector } from 'react-redux';


export const PageWrapper = ({ children }: { children: ReactNode }) => {
  // объект user нужно получать из глобального состояния типа: редакс или контекст:
  // const user = JSON.parse(localStorage.getItem('user'));
  const user = useSelector(getUser);
  // console.log(user)

  const [popUpAuth, setPopUpAuth] = useState<boolean>(false);

  // состояние для бургер меню при адаптации под планшет
  const [leftMenu, setLeftMenu] = useState<boolean>(true);

  return (
    <div className={styles.mainWrap}>
      <HeaderMenu setPopUpAuth={setPopUpAuth} setLeftMenu={setLeftMenu} leftMenu={leftMenu} />
      <div className={`${styles.container} ${styles.innerWrap} ${leftMenu === true ? styles.innerWrapTrue : ''}`}>
        {leftMenu && <LeftMenu />}
        <MainContent>{children}</MainContent>
      </div>
      <Footer />
      {/* <PopUpAuth popUpAuth={popUpAuth} setPopUpAuth={setPopUpAuth} /> */}
      {/* Чтобы не рендерился постоянно PopUp в личном кабинете:*/}
      {!user?.token && <PopUpAuth popUpAuth={popUpAuth} setPopUpAuth={setPopUpAuth} />}
    </div>
  );
};
