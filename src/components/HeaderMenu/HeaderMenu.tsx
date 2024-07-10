import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import CartIcon from '../../assets/icons/cart2.svg';
import DeliveryIcon from '../../assets/icons/delivery2.svg';
import HomeIcon from '../../assets/icons/home1.svg';
import MenuIcon from '../../assets/icons/menu2.svg';
import PayIcon from '../../assets/icons/pay2.svg';
import TelIcon from '../../assets/icons/tel.svg';
import UserIcon from '../../assets/icons/user1.svg';
import { ROUTES } from '../../router/routes';
import { getCart } from '../../store/basket/slice';
import { getUser, userActions } from '../../store/user/slice';
import { Search } from '../SearchPage/Search';
import styles from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
  leftMenu: boolean;
  setPopUpAuth: (popUpAuth: boolean) => void;
  setLeftMenu: (leftMenu: boolean) => void;
}; 

type User = {
  data: {
    avatar: string | null;
    email: string | null;
    fullName: string | null;
    id: number | null;
    role: string | null;
  };
  token: string | null;
};

export const HeaderMenu = ({ leftMenu, setPopUpAuth, setLeftMenu }: Props) => {
  const handleVisiblePopUp = () => setPopUpAuth(true);
  const handleVisibleLeftMenu = () => setLeftMenu(!leftMenu);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //user - это состояние страницы (это не объект из LS)  обрабатываю через useState+useEffect
  const [user, setUser] = useState<User | null>(null);

  //Подписка на user из Redux
  const userRedux = useSelector(getUser);
  // console.log( userRedux)
  useEffect(() => {
    setUser(userRedux);
  }, [userRedux]);

  // //Подписка на user из localStorage
  // useEffect(() => {
  //   const userLS = JSON.parse(localStorage.getItem('user'));
  //   setUser(userLS);
  // }, []);

  // Функция проверки роли, редиректа и смены состояния PopUp
  const handleUserClick = () => {
    if (user?.data?.role === 'client') {
      navigate('/cabinet');
      return;
    }

    if (user?.data?.role === 'admin') {
      navigate('/admin');
      return;
    }
    handleVisiblePopUp();
  };

  //Функция выхода из авторизации
  const handleLogout = () => {
    // localStorage.removeItem('user');
    // setUser(prev => {});
    dispatch(userActions.clearUserStore());

    if (pathname.includes(ROUTES.admin) || pathname.includes(ROUTES.cabinet)) {
      navigate('/');
    }
  };
  //Получаю значение счетчика корзины
  // const count = JSON.parse(localStorage.getItem('itemCart')).length;
  const count = useSelector(getCart)?.length;

  return (
    <>
      {/* Хедер для ПК и Планшетов */}
      <header className={styles.headerMenu}>
        <div className={`${styles.container} ${styles.headerMenuWrap}`}>
          <button onClick={handleVisibleLeftMenu} className={`${styles.burger} ${styles.button} ${styles.item3}`}>
            <MenuIcon className={styles.svgMenu} />
          </button>
          <NavLink to={ROUTES.root} className={`${styles.link} ${styles.item4}`}>
            О нас
          </NavLink>
          <NavLink to={ROUTES.pay} className={`${styles.link} ${styles.item5}`}>
            Оплата
          </NavLink>
          {/* <Link to={ROUTES.pay} >Оплата</Link> */}
          <NavLink to={ROUTES.delivery} className={`${styles.link} ${styles.item6}`}>
            Доставка
          </NavLink>
          <div className={styles.item1}>
            <Search />
          </div>

          {/* На одной кнопке  несколько  событий onClick
         и поэтому все эти действия включены в одну функцию handleUserClick */}
          <button type="button" onClick={handleUserClick} className={`${styles.button} ${styles.item7}`}>
            {/* <UserIcon className={styles.svgButton} /> */}
            <UserIcon className={`${styles.svgButton} ${user?.token ? styles.LogInButton : ''}`} />
          </button>

          {user?.token && (
            <button className={`${styles.buttonLogout} ${styles.item8}`} onClick={handleLogout}>
              Выйти
            </button>
          )}

          <NavLink to={ROUTES.basket} className={`${styles.countCart} ${styles.item9}`}>
            <CartIcon className={styles.svgCart} />
            {+count !== 0 && <div className={styles.count}>{count}</div>}
          </NavLink>
          <div className={styles.item2}>
            <TelIcon className={styles.svgTel} />
            +7-777-77-77-77
          </div>
        </div>
      </header>

      {/* Хедер для мобильных устройств(адаптация (max-width: 430px)) */}
      <header className={styles.headerMenuPhone}>
        <div className={`${styles.container} ${styles.headerMenuWrap}`}>
          <button onClick={handleVisibleLeftMenu} className={`${styles.burger} ${styles.button} ${styles.item3}`}>
            <MenuIcon className={styles.svgMenu} />
          </button>

          <NavLink to={ROUTES.root} className={`${styles.link} ${styles.item4}`}>
            <HomeIcon className={styles.svgHome} />
          </NavLink>

          <NavLink to={ROUTES.pay} className={`${styles.link} ${styles.item5}`}>
            <PayIcon className={styles.svgPay} />
          </NavLink>

          {/* <Link to={ROUTES.pay} >Оплата</Link> */}
          <NavLink to={ROUTES.delivery} className={`${styles.link} ${styles.item6}`}>
            <DeliveryIcon className={styles.svgDelivery} />
          </NavLink>
          <div className={styles.item1}>
            <Search />
          </div>

          {/* На одной кнопке  несколько  событий onClick
         и поэтому все эти действия включены в одну функцию handleUserClick */}
          <button type="button" onClick={handleUserClick} className={`${styles.button} ${styles.item7}`}>
            {/* <UserIcon className={styles.svgButton} /> */}
            <UserIcon className={`${styles.svgButton} ${user?.token ? styles.LogInButton : ''}`} />
          </button>

          {user?.token && (
            <button className={`${styles.buttonLogout} ${styles.item8}`} onClick={handleLogout}>
              Выйти
            </button>
          )}

          <NavLink to={ROUTES.basket} className={`${styles.countCart} ${styles.item9}`}>
            <CartIcon className={styles.svgCart} />
            {count !== 0 && <div className={styles.count}>{count}</div>}
          </NavLink>
          <div className={styles.item2}>
            <TelIcon className={styles.svgTel} />
            +7-777-77-77-77
          </div>
        </div>
      </header>
    </>
  );
};

// export const HeaderMenu = ({ setPopUpAuth }) => {
//   //передача пропса {setPopUpAuth} через скобки{}
//   const handleVisiblePopUp = () => setPopUpAuth(true);
//   const { pathname } = useLocation();
//   // console.log(pathname)

//   //Использовать нужно не компонент <Navigate to="/" /> а хук useNavigate, тк хук более передсказуемо работает
//   //и если авторизованный пользователь находясь не на стр. лич.кабинета нажмет на иконку, то попадет снова в личный кабинет
//   const navigate = useNavigate();

//   //user - это состояние страницы (это не объект из LS)  обрабатываю через useState+useEffect
//   const [user, setUser] = useState({});

//   useEffect(() => {
//     const userLS = JSON.parse(localStorage.getItem('user'));
//     setUser(userLS);
//   }, []);
//   // const user = JSON.parse(localStorage.getItem('user'));

//   // В функции на иконку одновременно присутствуют несколько действий:
//   // проверка на admin/client редирект и вызов функции смены состояния PopUp
//   // user это переменная - начальное состояние из  useState
//   // При повторном нажатии после авторизации на иконку авторизации происходит переход на стр. кабинет/админ тк navigate('/url')
//   // Функция проверки роли редиректа и смены состояния PopUp

//   const handleUserClick = () => {
//     // не нужен объект из LS тк user - это состояние страницы
//     // const user = JSON.parse(localStorage.getItem('user'));

//     if (user?.data?.role === 'client') {
//       navigate('/cabinet');
//       return;
//     }

//     if (user?.data?.role === 'admin') {
//       navigate('/admin');
//       return;
//     }
//     // Передается именно вызов функции а не сама функция
//     handleVisiblePopUp();
//   };

//   //Функция выхода из авторизации
//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     setUser(prev => {});

//     if (pathname.includes(ROUTES.admin) || pathname.includes(ROUTES.cabinet)) {
//       navigate('/');
//     }
//   };

{
  /* <NavLink to={ROUTES.cabinet} className={styles.link}>
Кабинет
</NavLink>
<NavLink to={ROUTES.admin} className={styles.link}>
Админ
</NavLink>

<NavLink to={ROUTES.auth}>Войти</NavLink>
<NavLink to={ROUTES.authFormik}>Войти</NavLink> */
}
