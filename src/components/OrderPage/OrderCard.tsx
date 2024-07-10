import { NavLink } from 'react-router-dom';
import styles from './OrderCard.module.css';
// не забывай ипортировать ROUTES:
import { ROUTES } from '../../router/routes';

type Props = {
  fullName: string | null;
  email: string | null;
  tel: string | null;
  delivery: string | null;
  id: number;
  goods: any[];
  totalPrice: number | null;
};

export const OrderCard = ({ fullName, email, tel, delivery, id, goods, totalPrice }: Props) => {
  return (
    <div className={styles.orderCardWrap}>
      {/* <ul>
        {goods.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul> */}
      <div className={styles.contentBox1}>
        <div className={styles.order}>Заказ № {id}</div>
        <div className={styles.name}>
          <ul className={styles.li}>
            {goods.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
          <div className={styles.text}>оплачено {totalPrice} руб. </div>
        </div>
      </div>
      <div className={styles.contentBox2}>
        <div className={styles.delivery}>
          <span>Доставка в пункт выдачи</span>
          <span>Пункт СДЭК, Россия, Нижний Новгород, Ошарская улица, 14</span>
          <NavLink to={ROUTES.plug} className={styles.link}>
            Информация о пункте выдачи
          </NavLink>
          <span className={styles.date}>Ожидаемая дата доставки: 1 июня</span>
          <div className={styles.status}>Передается в доставку</div>
        </div>
        <div className={styles.name}>
          <span>Пользователь:</span>
          <span>{fullName}</span>
          <span>{tel}</span>
          <span>{email}</span>
        </div>
      </div>
    </div>
  );
};
