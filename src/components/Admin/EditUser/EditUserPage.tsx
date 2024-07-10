import styles from './EditUserPage.module.css';
import { ChangeEvent, FormEvent, useState } from 'react';

export const EditUserPage = () => {
  const [formData, setFormData] = useState({
    id: '',
    fullName: '',
    role: 'client',
    email: '',
    password: '',
    avatar: '',
    tel: '',
  });

  const { fullName, role, email, password, avatar, tel } = formData;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch(`https://8a705e193c725f80.mokky.dev/users/${formData.id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fullName, role, email, password, avatar, tel }),
    });
    // .then(res => res.json())
    // .then(res => console.log(res));
  };

  return (
    <div className={styles.contentBox}>
      <div className={styles.editProductWrap}>
        <form className={styles.inputWrap} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="numder"
            value={formData.id}
            name="id"
            onChange={handleChange}
            placeholder="Введите id пользователя"
          ></input>

          <input
            className={styles.input}
            type="text"
            value={formData.fullName}
            name="fullName"
            onChange={handleChange}
            placeholder="Введите имя пользователя"
          ></input>

          <input
            className={styles.input}
            type="text"
            value={formData.email}
            name="email"
            onChange={handleChange}
            placeholder="Введите email"
          ></input>

          <input
            className={styles.input}
            type="text"
            value={formData.password}
            name="password"
            onChange={handleChange}
            placeholder="Введите пароль"
          ></input>

          <input
            className={styles.input}
            type="text"
            value={formData.avatar}
            name="avatar"
            onChange={handleChange}
            placeholder="Введите ссылку на аватар"
          ></input>
          
          <input
            className={styles.input}
            type="text"
            value={formData.tel}
            name="tel"
            onChange={handleChange}
            placeholder="Введите телефон"
          ></input>

          <button type="submit" className={styles.buttonSubmit}>
            Редактировать данные
          </button>
        </form>
      </div>
      <div className={styles.patternWrap}>
      <span>Скопируйте пример данных отсюда:</span>
        <span>имя пользователя: Владимир</span>
        <span>email: newuser@test.com</span>
        <span>пароль: 1234</span>
        <span>аватар: https://img.freepik.com/free-photo/view-funny-animal_23-2151098397.jpg</span>
        <span>аватар: https://img.freepik.com/free-vector/hand-drawn-cartoon-moose-illustration_23-2150443667.jpg</span>
      </div>
    </div>
  );
};
