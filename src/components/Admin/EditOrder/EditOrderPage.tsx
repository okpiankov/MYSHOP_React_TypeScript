import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../../router/routes';
import { useEffect, useState } from 'react';
import styles from './EditOrderPage.module.css';

type Goods = [
  {
    id: number;
    name: string | null;
    quantity: string | null;
    price: string | null;
  },
];
type Order = {
  id: string;
  tel: string | null;
  delivery: string | null;
  pay: string | null;
  total_price: number | null;
  user_id: string;
  goods: Goods[];
};

const getOrders = async () => {
  try {
    const res = await fetch(`https://8a705e193c725f80.mokky.dev/orders`);
    const orders = await res.json();

    return orders.sort((a: Order, b: Order) => parseInt(b.id) - parseInt(a.id));
  } catch (error) {
    console.log(error);
  }
};

export const EditOrderPage = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '',
      tel: '',
      delivery: '',
      pay: '',
      total_price: null,
      user_id: '',
      goods: [],
    },
  ]);

  useEffect(() => {
    const res = getOrders();
    res.then(data => setOrders(data));
  }, []);

  // console.log(orders);

  //Функция удаления заказа по id
  const deleteOrder = (id: number) => {
    fetch(`https://8a705e193c725f80.mokky.dev/orders/${id}`, {
      method: 'DELETE',
    }).then(res => {
      console.log(res);

      if (res.ok) {
        setOrders(prev => prev.filter(order => parseInt(order.id) !== id));
      } else {
        console.log('Error', res);
      }
    });
  };

  return (
    <div className={styles.wrap}>
      <ul className={styles.list}>
        <p className={styles.wrap2}>
          Для редактирования оформите заказы в корзине
          <strong>Список всех заказов:</strong>
        </p>
        {orders?.length > 0 &&
          orders?.map(order => (
            <li key={order.id} className={styles.item}>
              <NavLink to={`${ROUTES.orderID}/${order.id}`}>
                {' '}
                <strong className={styles.title}>Заказ номер - {order.id}</strong>
              </NavLink>
              <div className={styles.details}>
                <p>
                  <strong>Сумма:</strong> {order.total_price?.toLocaleString()}_руб.
                </p>
                <p>
                  <strong>Кол-во товаров:</strong>_{order.goods?.length}
                </p>
                <p>
                  <strong>Телефон:</strong> {order?.tel}
                </p>
                <p>
                  <strong>Доставка:</strong> {order?.delivery}
                </p>
                <p>
                  <strong>Оплата:</strong> {order?.pay}
                </p>

                <button type="button" className={styles.button1} onClick={() => deleteOrder(parseInt(order?.id))}>
                  удалить
                </button>

                <NavLink to={`${ROUTES.orderID}/${order.id}`} className={styles.button2}>
                  редактировать
                </NavLink>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};
