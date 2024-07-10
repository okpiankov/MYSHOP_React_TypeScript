import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { ROUTES } from '../../../router/routes';
import UserIcon from '../../../assets/icons/user1.svg';
import { userActions } from '../../../store/user/slice';
import { useDispatch } from 'react-redux';

type Props = {
  setPopUpAuth: (popUpAuth: boolean) => void;
}; 
export const HeaderMenuAdmin = ({ setPopUpAuth }: Props) => {
  //передача пропса {setPopUpAuth} через скобки{}
  const handleVisiblePopUp = () => setPopUpAuth(true);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Функция выхода из авторизации
  const handleLogout = () => {
    dispatch(userActions.clearUserStore());

    if (pathname.includes(ROUTES.admin)) {
      navigate('/');
    }
  };
  return (
    <header className={styles.headerMenu}>
      <div className={`${styles.container} ${styles.headerMenuWrap}`}>
        <NavLink to={ROUTES.root} className={styles.link}>
          На сайт
        </NavLink>

        <button className={styles.buttonLogout} onClick={handleLogout}>
          Выйти
        </button>
      </div>
    </header>
  );
};
