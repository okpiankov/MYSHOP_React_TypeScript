import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styles from './OrderID.module.css';
import { useParams } from 'react-router-dom';

type Goods = {
  id: number;
  name: string | null;
  quantity: string;
  price: string;
};
type Order = {
  id: string;
  tel: string | null;
  delivery: string | null;
  pay: string | null;
  total_price: number | null;
  user_id: string;
  goods: Goods[];
};

export const OrderID = () => {
  const { id } = useParams();

  const getOrder = async (id: number) => {
    try {
      const res = await fetch(`https://8a705e193c725f80.mokky.dev/orders/${id}`);
      const order = await res.json();

      return order;
    } catch (error) {
      console.log(error);
    }
  };

  const [order, setOrder] = useState<Order>({
    id: '',
    tel: '',
    delivery: '',
    pay: '',
    total_price: null,
    user_id: '',
    goods: [],
  });

  const [resultMessage, setResultMessage] = useState({
    text: '',
    status: 'success',
  });

  useEffect(() => {
    if (typeof id === 'string') {
      const res = getOrder(parseInt(id));
      res.then(order => setOrder(order));
    }
  }, [id]);

  // console.log(order);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value);
    const { name, value } = event.target;
    setOrder(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const deleteGood = (id: number) => {
    const newGoodsList = order.goods.filter(good => good.id !== id);

    setOrder(prevState => ({
      ...prevState,
      total_price: newGoodsList.reduce((acc, curr) => {
        return acc + +curr.quantity * +curr.price;
      }, 0),
      goods: newGoodsList,
    }));
  };

  // Функция изменения количества товара в заказе
  const handleChangeGoodQuantity = (event: ChangeEvent<HTMLInputElement>, id: number) => {
    const changedGoodIdx = order.goods.findIndex(good => good.id === id);
    if (changedGoodIdx !== -1) {
      const changedGood = { ...order.goods[changedGoodIdx], quantity: event.target.value };
      console.log(changedGood);
      const newGoodsList = order.goods.toSpliced(changedGoodIdx, 1, changedGood);
      console.log(newGoodsList);
      if (+event.target.value <= 0) {
        return deleteGood(id);
      }
      setOrder(prevState => ({
        ...prevState,
        total_price: newGoodsList.reduce((acc, curr) => {
          return acc + +curr.quantity * +curr.price;
        }, 0),
        goods: newGoodsList,
      }));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    fetch(`https://8a705e193c725f80.mokky.dev/orders/${order.id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setOrder(res);
        setResultMessage({ text: 'Заказ обновлен', status: 'success' });
      })
      .catch(error => {
        console.log(error);
        setResultMessage({
          text: `Ошибка обновления: ${error.message}`,
          status: 'error',
        });
      });
  };

  return (
    <section className={styles.order}>
      {resultMessage.text && (
        <span
          className={`${styles.message} ${
            resultMessage.status === 'error' ? styles.messageError : styles.messageSuccess
          }`}
        >
          {resultMessage.text}
        </span>
      )}

      <strong>Заказ номер {order.id}</strong>
      <span>Сумма: {order.total_price} руб.</span>
      <span>Заполните нужные поля для редактирования:</span>

      <form className={styles.inputWrap} onSubmit={handleSubmit}>
        <label>
          Телефон:&nbsp;
          <input
            className={styles.input}
            type="number"
            value={order.tel !== null ? order.tel : ''}
            name="tel"
            onChange={handleChange}
            placeholder="Телефон"
          ></input>
        </label>
        <label>
          Доставка:&nbsp;
          <input
            className={styles.input}
            type="text"
            value={order.delivery !== null ? order.delivery : ''}
            name="delivery"
            onChange={handleChange}
            placeholder="Способ доставки"
          ></input>
        </label>
        <label>
          Оплата:&nbsp;
          <input
            className={styles.input}
            type="text"
            value={order.pay !== null ? order.pay : ''}
            name="pay"
            onChange={handleChange}
            placeholder="Способ оплаты"
          ></input>
        </label>

        <strong>Список товаров в заказе:</strong>
        <ul>
          {order.goods.map(good => (
            <li key={good.id} className={styles.order_goods}>
              <p>
                {good.name},&nbsp;&nbsp; кол-во: {good.quantity}
              </p>

              <input
                className={styles.inputQuantity}
                type="number"
                value={good.quantity}
                name="quantity"
                onChange={event => handleChangeGoodQuantity(event, good.id)}
                placeholder="Кол-во"
              ></input>

              <button className={styles.button} type="button" onClick={() => deleteGood(good.id)}>
                удалить_товар
              </button>
            </li>
          ))}
        </ul>
        {/* <select name="" id="">
          <option value="">Товар_1</option>
          <option value="">Товар_2</option>
          <option value="">Товар_3</option>
        </select> */}
        <button type="submit" className={styles.button2}>
          Обновить заказ
        </button>
      </form>
    </section>
  );
};

{
  /* <input
className={styles.inputQuantity}
type="number"
// value={good.quantity}
value={order?.goods?.map(item => item.quantity)}
name="quantity"
// onChange={() => handleChangeGoodQuantity(good.id)}
onChange={handleChange}
placeholder="Количество"
></input>

<input
className={styles.inputQuantity}
type="number"
value={quantity.quantity}
name="quantity"
onChange={() => handleChangeGoodQuantity(good.id)}
placeholder="Количество"
></input>  */
}
