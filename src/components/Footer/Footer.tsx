import { NavLink } from 'react-router-dom';
import styles from './Footer.module.css';
import { ROUTES } from '../../router/routes';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} ${styles.footerWrap}`}>
        <div className={styles.blockFooter2}>
          <p>
            <strong>О проекте</strong>
          </p>
          <p>
            Интернет-магазин<br></br>
            Используемые технологии при разработке:<br></br>
            html, css, JavaScript, React, Redux, TypeScript
          </p>
          <p>
            Автор:<br></br>
            Пьянков Олег Константинович
          </p>
          <p>Дата: 2024 г.</p>
        </div>
        <div className={styles.blockFooter}>
          <p>
            <strong>Покупателям</strong>
          </p>
          <p>
            {' '}
            <NavLink to={ROUTES.plug} className={styles.link}>
              Как сделать заказ
            </NavLink>
          </p>
          <p>
            {' '}
            <NavLink to={ROUTES.plug} className={styles.link}>
              Вопросы и ответы
            </NavLink>
          </p>
          <p>
            {' '}
            <NavLink to={ROUTES.plug} className={styles.link}>
              Возврат товара
            </NavLink>
          </p>
          <p>
            {' '}
            <NavLink to={ROUTES.plug} className={styles.link}>
              Обратиться в поддержку
            </NavLink>
          </p>
        </div>
        <div className={styles.blockFooter}>
          <p>
            <strong>Компания</strong>
          </p>
          <p>
            {' '}
            <NavLink to={ROUTES.root} className={styles.link}>
              О нас
            </NavLink>
          </p>
          <p>
            {' '}
            <NavLink to={ROUTES.plug} className={styles.link}>
              Мы на карте
            </NavLink>
          </p>
          <p>
            {' '}
            <NavLink to={ROUTES.plug} className={styles.link}>
              Реквизиты
            </NavLink>
          </p>
        </div>
      </div>
    </footer>
  );
};
