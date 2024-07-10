import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './RegisterPage.module.css';
import { validateEmail, validateName, validatePassword, validateTel } from './validate';
import axios from 'axios';

type Props = {
  setForm: (form: string) => void;
};
type User = {
  user: {
    data: {
      avatar: string | null;
      email: string | null;
      fullName: string | null;
      id: number | null;
      role: string | null;
    };
    token: string | null;
  };
};


export const RegisterPage = ({ setForm }: Props) => {
  const [registration, setRegistration] = useState<User>({
    user: {
      data: {
        avatar: '',
        email: '',
        fullName: '',
        id: null,
        role: '',
      },
      token: '',
    },
  });
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    tel: '',
    role: 'client',
  });

  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  const [telError, setTelError] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));

    // Передаю функции setState как параметры в функции валидации в другой модуль
    if (name === 'fullName' && value !== ' ') {
      validateName({value, setNameError});
    }
    if (name === 'email' && value !== ' ') {
      validateEmail({value, setEmailError});
    }
    if (name === 'password' && value !== ' ') {
      validatePassword({value, setPasswordError});
    }
    if (name === 'tel' && value !== ' ') {
      validateTel({value, setTelError});
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const fetchData = async () => {
      const res = await axios.post('https://8a705e193c725f80.mokky.dev/register', formData);
      // console.log(res.data);
      setRegistration(res.data);
    };
    fetchData();
  };

  return (
    <div className={styles.authWrap}>
      {registration.user.token && <div className={styles.registration}>Вы зарегистрированны!</div>}
      <div>
        <button className={styles.selectАctive} onClick={() => setForm('login')}>
          Вход /{' '}
        </button>
        <span className={styles.select}>Регистрация</span>
      </div>

      <form className={styles.inputWrap} onSubmit={handleSubmit} noValidate>
        {nameError && nameError}
        <input
          className={styles.input}
          type="text"
          value={formData.fullName}
          name="fullName"
          onChange={handleChange}
          placeholder="Ваше имя*"
          required
          autoComplete="off"
        ></input>

        {emailError && emailError}
        <input
          className={styles.input}
          type="email"
          value={formData.email}
          name="email"
          onChange={handleChange}
          placeholder="Email*"
          required
          autoComplete="off"
        ></input>

        {passwordError && passwordError}
        <input
          className={styles.input}
          type="password"
          value={formData.password}
          name="password"
          onChange={handleChange}
          placeholder="Придумайте пароль*"
          required
          autoComplete="off"
        ></input>

        {telError && telError}
        <input
          className={styles.input}
          type="tel"
          value={formData.tel}
          name="tel"
          onChange={handleChange}
          placeholder="Телефон, не обязательное поле"
        ></input>

        <button type="submit" className={styles.buttonSubmit}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

// const handleSubmit = event => {
//   event.preventDefault();

//   const fetchData = async () => {
//     const res = await fetch('https://8a705e193c725f80.mokky.dev/register', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     });
//     const data = await res.json();
//     console.log(res);
//     console.log(data);
//   };
//   fetchData();
// };
