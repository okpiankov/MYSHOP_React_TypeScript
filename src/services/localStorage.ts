
 type TypeProducts = {
  image: string | '';
  type: string | null;
  name: string | null;
  description: string | null;
  price: number | null;
  id: number | null;
  quantity?: number | null;
};

// Функция записи в localStorage товара из массива приходящего с сервера в котором хранятся все товары 
export const handleAddItem = (id: number, products:TypeProducts[]) => {
  // Ищу продукт по id  в массиве всех продуктов
  const productID = products.find(item => item.id === id);

  // Получю для проверки из localStorage []  по ключу 'itemCart' данные в формате JSON
  const prevArrayItems = localStorage.getItem('itemCart');

  // Проверяю и записываю ЕДИНОЖДЫ в LS по ключу 'itemCart'  массив с объектом найденным по id
  if (!prevArrayItems) {
    
    const item = [{ ...productID, quantity: 1 }];
    localStorage.setItem('itemCart', JSON.stringify(item));
    return;
  }

  const prevArrayCarts = JSON.parse(prevArrayItems);

  // Проверяю есть ли такой же объект в массиве по id
  const ItemInPrevArray = prevArrayCarts.find((item: { id: number; }) => item.id === id);
  console.log(ItemInPrevArray);

  if (ItemInPrevArray) {
    return;
  }
  // Дозаписываю  в localStorage объект которого нет в ls по id через {...productID}
  const item = [...prevArrayCarts, { ...productID, quantity: 1 }];
  localStorage.setItem('itemCart', JSON.stringify(item));
};


// Функция записи в localStorage конкретного товара как объекта приходящего с сервера
export const handleAddItemId = (product: TypeProducts) => {
  const prevArrayItems = localStorage.getItem('itemCart');

  if (!prevArrayItems) {
    const item = [{ ...product, quantity: 1 }];
    localStorage.setItem('itemCart', JSON.stringify(item));
    return;
  }
  console.log(prevArrayItems);

  const prevArrayCarts = JSON.parse(prevArrayItems);

  const ItemInPrevArray = prevArrayCarts.find((item: { id: number | null; }) => item.id === product.id);
  console.log(ItemInPrevArray);

  if (ItemInPrevArray) {
    return;
  }

  const item = [...prevArrayCarts, { ...product, quantity: 1 }];
  localStorage.setItem('itemCart', JSON.stringify(item));
};


// // Функция удаления товара из корзины и localStorage
// export const handlelDeleteClick = (id,setItems) => {
//   const arrayProducts = JSON.parse(localStorage.getItem('itemCart'));

//   //получаю новый массив исключающий объект по id, не равно в JS !=
//   const newArray = arrayProducts.filter(item => item.id != id);
//   // console.log(newArray);

//   //записываю новый массив товаров в LS после каждого удаления товара
//   localStorage.setItem('itemCart', JSON.stringify(newArray));

//   setItems(prev => newArray);
// };


// // Функция увеличения и уменьшения колличества товара в корзине и localStorage
// export const handlelQuantityClick = (id, action, items, setItems) => {
//   //Делаю копию массива
//   const newArrayInCart = [...items];

//   //Достаю объект из массива
//   const product = newArrayInCart.find(item => item.id === id);

//   //Обращаюсь в объекте к полю quantity
//   product.quantity = action === 'add' ? product.quantity + 1 : product.quantity - 1;
//   if (product.quantity <= 0) {
//     return handlelDeleteClick(id);
//   }
//   // Записываю копию массива в LS
//   localStorage.setItem('itemCart', JSON.stringify(newArrayInCart));
//   setItems(newArrayInCart);
// };