import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ProductCardID.module.css';
// import {handleAddItemId} from '../../services/localStorage';
import { getCart, productActions, TypeProducts } from '../../store/basket/slice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

export const ProductCardID = () => {
  const [product, setProduct] = useState<TypeProducts | null>(null);
  const { id } = useParams();
  // console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      const respons = await axios.get(`https://8a705e193c725f80.mokky.dev/product/${id}`);
      setProduct(respons.data);
      // console.log(respons);
      // console.log(data);
    };
    fetchData();
  }, [id]);

  // Запись данных карточек товаров в Redux:
  const dispatch = useDispatch();
  const prevArrayItems = useSelector(getCart);
  // console.log(prevArrayItems);

  const handleAddItemId = () => {
    if (!prevArrayItems && product !== null) {
      const item = [{ ...product, quantity: 1 }];

      dispatch(productActions.setCart(item));
      return;
    }
    // console.log(prevArrayItems);

    const ItemInPrevArray = prevArrayItems.find(item => item.id === product?.id);
    // console.log(ItemInPrevArray);

    if (ItemInPrevArray || product === null) {
      return;
    }
    const item = [...prevArrayItems, { ...product, quantity: 1 }];
    dispatch(productActions.setCart(item));
  };

  return (
    <div className={styles.productsWrap}>
      <div className={styles.cardWrapID}>
        <img src={product?.image} className={styles.image}></img>
        <div className={styles.description}>
          <h3>{product?.name}</h3>

          <span>Технические характеристики:</span>
          <p>
            <strong>{product?.description}</strong>
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis sunt ipsum inventore impedit voluptate
            dolorum quidem ratione ea eligendi iste eaque, quibusdam nam laudantium. Libero nisi aliquam magni odit qui?
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis sunt ipsum inventore impedit voluptate
            dolorum quidem ratione ea eligendi iste eaque, quibusdam nam laudantium. Libero nisi aliquam magni odit qui?
          </p>

          <span> Цена:</span>
          <strong className={styles.price}>{product?.price} руб.</strong>

          {/* <button className={styles.button} onClick={() => handleAddItemId(product)}> */}
          <button className={styles.button} onClick={handleAddItemId}>
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  );
};

// useEffect(() => {
//   const fetchData = async () => {
//     const respons = await fetch(`https://8a705e193c725f80.mokky.dev/product/${id}`);
//     const data = await respons.json();
//     setProduct(data);
//     // console.log(respons);
//     // console.log(data);
//   };
//   fetchData();
// }, [id]);


// const handleAddItem = () => {
//   // При записи в LS обязательно перевожу в формат JSON.stringify(что записываем)
//   // Чтение/ запись LS: ключ в ковычках ' ' getItem('ключ')

//   // Получаю для проверки из localStorage []  по ключу 'cartItems' данные в формате JSON
//   const prevArrayItems = localStorage.getItem('itemCart');

//   // Проверка есть ли уже в ls запись по ключу 'cartItems'
//   if (!prevArrayItems) {
//     // Записываю ЕДИНОЖДЫ в localStorage в формате JSON по ключу 'cartItems' массив
//     //  в него будут добавляться объекты, 1я запись в [] - только 1 объект
//     //При 2й и далее записях в этот массив, запись будет происходить смотри код ниже
//     const item = [{ ...product, quantity: 1 }];
//     localStorage.setItem('itemCart', JSON.stringify(item));
//     return; // пустой return - СТОП функция! Нужен только при первой записи [] в ls,
//     // иначе скрип выполниться ниже и на find будет ошибка тк пока в [] только 1 {}
//   }
//   console.log(prevArrayItems);

//   // Полученный []  из JSON конвектирую в js формат пересохраняю в другую переменную
//   const prevArrayCarts = JSON.parse(prevArrayItems);

//   // Проверяю есть ли такой же объект в массиве по id
//   const ItemInPrevArray = prevArrayCarts.find(item => item.id === product.id);
//   console.log(ItemInPrevArray); //либо объект который уже есть в [] либо undefined

//   if (ItemInPrevArray) {
//     return; // если объект по id есть - пустой return - СТОП функция! и код ниже не выполнится:
//   }

//   // Раскладываю распарсиный предыдущий массив на объекты в нем ...prevArrayCarts
//   // И дозаписываю  в localStorage объект которого нет в ls по id через {...product}
//   const item = [...prevArrayCarts, { ...product, quantity: 1 }];
//   localStorage.setItem('itemCart', JSON.stringify(item));
// };

// Ошибки:
// 1. Приходит по id не массив, а объект поэтому методы массива(map) не работают:
//    {product?.map(({ id, image, name, description, price }) => (
//    обращение к значению объекта только через ИмяОбъекта.значение {products.name}

// 2. Сразу нельзя из fetch() получить оъект с полями:
//    <p>{data.name}</p>
//    только через  хук const [products, setProducts] = useState(" ");
//    ВАЖНО в useState(" "); указать либо null но тогда нужно прописывать проверку: {product?.name} через ?
//    либо тот тип данных который ожидается через fetch() т.е. объект  { }
//    в fetch() через setProduct(data)  изменить состояние product
