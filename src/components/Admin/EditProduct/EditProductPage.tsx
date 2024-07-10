import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './EditProductPage.module.css';
import { ResJson } from './AddProductPage';

export const EditProductPage = () => {
  //Стейт для загрузки на mokky.dev значений из инпутов формы
  const [formData, setFormData] = useState({
    id: '',
    type: '',
    name: '',
    description: '',
    price: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  //Стейт для загрузки картинки на mokky.dev
  const [stateUrl, setStateUrl] = useState<ResJson>({
    bytes: 0,
    fileName: '',
    format: '',
    height: 0,
    id: 0,
    url: '',
    width: 0,
  });

  const fileFormData = new FormData();

  const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null)
      return;
    console.log(event.target.files[0]);
    const file = event.target.files[0];
    fileFormData.append('file', file);
  };

  const handleSubmit1 = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch('https://8a705e193c725f80.mokky.dev/uploads', {
      method: 'POST',
      body: fileFormData,
    });

    const resJson = await res.json();
    setStateUrl(resJson);

    const { url } = await resJson;
    console.log(url);
  };

  const { type, name, description, price } = formData;

  const { url } = stateUrl;
  const image = url;

  const handleSubmit2 = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch(`https://8a705e193c725f80.mokky.dev/product/${formData.id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image, type, name, description, price }),
    });
  };

  return (
    <div className={styles.contentBox}>
      
      {/* Форма для загрузки картинки на mokky.dev */}
      <div className={styles.editFileWrap}>
        <span>Сначала добавьте картинку товара</span>
        <span>Ограничение на mokky.dev 10 файлов</span>
        <form className={styles.inputWrap} onSubmit={handleSubmit1}>
          <input
            id="fileInput"
            className={styles.input}
            type="file"
            value={stateUrl.fileName}
            name="fileName"
            onChange={handleChangeFile}
            placeholder="Введите URL image"
          ></input>

          <button type="submit" className={styles.buttonSubmit}>
            Добавить картинку
          </button>
        </form>
      </div>

      {/* Форма для загрузки на mokky.dev все значений остальных параметров товара  */}
      <div className={styles.editProductWrap}>
        <form className={styles.inputWrap} onSubmit={handleSubmit2}>
          <input
            className={styles.input}
            type="numder"
            value={formData.id}
            name="id"
            onChange={handleChange}
            placeholder="Введите id товара"
          ></input>

          <input
            className={styles.input}
            type="text"
            value={formData.type}
            name="type"
            onChange={handleChange}
            placeholder="Введите тип: laptop/phone/TV"
          ></input>

          <input
            className={styles.input}
            type="text"
            value={formData.name}
            name="name"
            onChange={handleChange}
            placeholder="Введите название"
          ></input>

          <input
            className={styles.input}
            type="text"
            value={formData.description}
            name="description"
            onChange={handleChange}
            placeholder="Введите описание"
          ></input>

          <input
            className={styles.input}
            type="text"
            value={formData.price}
            name="price"
            onChange={handleChange}
            placeholder="Введите цену(число)"
          ></input>

          <button type="submit" className={styles.buttonSubmit}>
            Редактировать товар
          </button>
        </form>
      </div>

      <div className={styles.patternWrap}>
      <span>Скопируйте пример данных отсюда:</span>
        <span>тип: phone</span>
        <span>название: Смартфон Apple iPhone 15</span>
        <span>описание: Pro Max 256GB Black Titanium</span>
        <span>цена: 153999</span>
        <span>Перейдите в категорию всех товаров и проверьте товар</span>
      </div>
    </div>
  );
};

// import styles from './EditProductPage.module.css';
// import { useState } from 'react';

// export const EditProductPage = () => {
//   const [formData, setFormData] = useState({
//     id: '',
//     type: '',
//     image: '',
//     name: '',
//     description: '',
//     price: '',
//   });

//   const { type, image, name, description, price } = formData;

//   const handleChange = event => {
//     console.log(event.target.value);
//     const { name, value } = event.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = event => {
//     event.preventDefault();

//     fetch(`https://8a705e193c725f80.mokky.dev/product/${formData.id}`, {
//       method: 'PATCH',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ type, image, name, description, price }),
//     });
//     // .then(res => res.json())
//     // .then(res => console.log(res));
//   };

//   return (
//     <div className={styles.contentBox}>
//       <div className={styles.editProductWrap}>
//         <form className={styles.inputWrap} onSubmit={handleSubmit}>
//           <input
//             className={styles.input}
//             type="numder"
//             value={formData.id}
//             name="id"
//             onChange={handleChange}
//             placeholder="Введите id"
//           ></input>

//           <input
//             className={styles.input}
//             type="text"
//             value={formData.type}
//             name="type"
//             onChange={handleChange}
//             placeholder="Введите type: laptop/phone/TV"
//           ></input>

//           <input
//             className={styles.input}
//             type="text"
//             value={formData.image}
//             name="image"
//             onChange={handleChange}
//             placeholder="Введите URL image"
//           ></input>

//           <input
//             className={styles.input}
//             type="text"
//             value={formData.name}
//             name="name"
//             onChange={handleChange}
//             placeholder="Введите name"
//           ></input>

//           <input
//             className={styles.input}
//             type="text"
//             value={formData.description}
//             name="description"
//             onChange={handleChange}
//             placeholder="Введите description"
//           ></input>

//           <input
//             className={styles.input}
//             type="text"
//             value={formData.price}
//             name="price"
//             onChange={handleChange}
//             placeholder="Введите price ₽"
//           ></input>

//           <button type="submit" className={styles.buttonSubmit}>
//             Редактировать товар
//           </button>
//         </form>
//       </div>
//       <div className={styles.patternWrap}>
//         <h4>Скопируй данные отсюда:</h4>
//         <p>name: Смартфон Apple iPhone 15</p>
//         <p>type: phone</p>
//         <p>description: Pro Max 256GB Black Titanium</p>
//         <p>price: 153 999 ₽</p>
//         <p>URL image: https://img.mvideo.ru/Big/30069510bb.jpg</p>
//         <p>Перейди в категории товаров и убедись что все работает</p>
//       </div>
//     </div>
//   );
// };
