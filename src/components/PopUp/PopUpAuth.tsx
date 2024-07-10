import styles from './PopUpAuth.module.css';
import { Form } from '../Auth/Form';

type Props = {
  popUpAuth: boolean;
  setPopUpAuth: (popUpAuth: boolean) => void;
};

export const PopUpAuth = ({ popUpAuth, setPopUpAuth }: Props ) => {
  return (
    // popUpAuth меняет стейт на true при нажатии на войти в header
    // на true срабатывает класс popup_visibl, на false установлен класс popup по умолчанию
    // useState используется прямо в className={ }

    <section className={`${styles.popup} ${popUpAuth ? styles.popup_visible : ''}`}>
      <div className={styles.popup_content}>
        <button className={styles.close} onClick={() => setPopUpAuth(false)}>
          &times;
        </button>
        <Form />
      </div>
      <div className={styles.popup_overlay} onClick={() => setPopUpAuth(false)}></div>
    </section>
  );
};
