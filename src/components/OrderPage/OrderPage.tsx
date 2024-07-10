import { useEffect, useState } from 'react';
import { OrderCard } from './OrderCard';
import styles from './OrderPage.module.css';

type Goods = [
  {
    id: number;
    name: string | null;
    quantity: string | null;
    price: string | null;
  },
];

type Props = {
  user: { fullName: string | null; email: string | null };
  tel: string | null;
  delivery: string | null;
  id: number;
  goods: Goods;
  total_price: number | null;
};

export const OrderPage = () => {
  const [order, setOrder] = useState<Props[] | []>([]);

  useEffect(() => {
    fetch('https://8a705e193c725f80.mokky.dev/orders?_relations=users')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setOrder(data);
      })
      // .then(data => console.log(data))
      .catch(console.error);
  }, []);

  return (
    <>
      <div className={styles.orderWrap}>
        <strong className={styles.title}>Мои заказы</strong>
        {order?.map(item => (
          <OrderCard
            key={item.id}
            fullName={item.user?.fullName}
            email={item.user?.email}
            tel={item?.tel}
            delivery={item?.delivery}
            id={item?.id}
            goods={item?.goods}
            totalPrice={item?.total_price}
            // name={order.name}
            // quantity={order.quantity}
          />
        ))}
      </div>
    </>
  );
};
