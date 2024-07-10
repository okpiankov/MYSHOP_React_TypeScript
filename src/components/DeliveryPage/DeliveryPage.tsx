import styles from './DeliveryPage.module.css';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../router/routes';
import Ozon from '../../assets/images/ozon.jpg';
import Sdek from '../../assets/images/sdek.jpg';

export const DeliveryPage = () => {
  return (
    <div className={styles.deliveryWrap}>
      <div className={styles.contentBox}><h2>Доставка транспортной компанией</h2>
      <p>
        Доставка товаров осуществляется из г. Нижний Новгород. Вы можете выбрать доставку другой транспортной компанией,
        оформив заказ через менеджера по телефону.
      </p>
      <h3>Наши основные партнеры</h3>
</div>
      
      <div className={styles.partnersWrap}>
        <div className={styles.partnerWrap}>
        <img src={Sdek} className={styles.img} alt="picture" />
          <div className={styles.innerWrap}>
            <h3>СДЭК</h3>
            <div className={styles.textWrap}>
              <NavLink to={ROUTES.plug}>Уточнить условия</NavLink>
              <NavLink to={ROUTES.plug}>Отследить груз</NavLink>
            </div>
          </div>
        </div>

        <div className={styles.partnerWrap}>
          <img src={Ozon} className={styles.img} alt="picture" />
          <div className={styles.innerWrap}>
            <h3>ОЗОН</h3>
            <div className={styles.textWrap}>
              <NavLink to={ROUTES.plug}>Уточнить условия</NavLink>
              <NavLink to={ROUTES.plug}>Отследить груз</NavLink>
            </div>
          </div>
        </div>
      </div>
<div className={styles.contentBox}>
   <h2>Самовывоз</h2>
      <p>Забронируйте нужный товар. После оформления заказа и подтверждения оператором наличия данного товара  приедьте, оплатите и заберите заказ. Срок бронирования товара в магазине составляет до 3-х дней с момента подтверждения заказа.<br></br>
      Самовывоз осуществляется по адресу:<br></br>
      603024 г. Нижний Новгород, улица Тургенева, д. 30. График работы пн. – вс. с 10:00 до 19:00</p>
</div>
     
    </div>
  );
}; 
