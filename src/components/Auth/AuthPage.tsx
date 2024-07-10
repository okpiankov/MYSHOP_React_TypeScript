import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './AuthPage.module.css';
import { validateEmail, validatePassword } from './validate';
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/routes';
import { userActions, getUserToken, getUser } from '../../store/user/slice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
// import { AuthData } from '../../store/user/effects';

type Props = {
  setForm: (form: string) => void;
};
type User = {
  data: {
    avatar:  string | null;
    email:  string | null;
    fullName:  string | null;
    id:  number | null;
    role:  string | null;
  };
  token: string | null;
}; 

export const AuthPage = ({ setForm }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '123',
  });

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'email' && value !== ' ') {
      validateEmail({value: value, setEmailError: setEmailError});
    }
    if (name === 'password' && value !== ' ') {
      validatePassword({value: value, setPasswordError: setPasswordError});
    } 
  };

  // Запись  user в redux:
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // dispatch(AuthData(formData)); // При использовании AsyncThunk

    dispatch(userActions.setIsLoading(true));

    axios
      .post<User>('https://8a705e193c725f80.mokky.dev/auth', formData)
      .then( userData => {
        dispatch(userActions.setUser(userData.data));
        // console.log(userData.data);

        const {
          token,
          data: { role },
        } = userData.data;

        if (token && role === 'client') navigate('/cabinet');
        if (token && role === 'admin') navigate('/admin');
      })
      .catch(error => console.error(error))
      .finally(() => dispatch(userActions.setIsLoading(false)));
  };

  return (
    <div className={styles.authWrap}>
      <div>
        <span className={styles.select}>Вход</span>
        {/* В setForm можно передавать любую строку например: 'register' */}
        <button className={styles.selectАctive} onClick={() => setForm('register')}>
          / Регистрация{' '}
        </button>
      </div>

      <form className={styles.inputWrap} onSubmit={handleSubmit} noValidate>
        {emailError && emailError}
        <input
          className={styles.input}
          type="email"
          value={formData.email}
          name="email"
          onChange={handleChange}
          placeholder="Email* user@test.com / admin@test.com"
        ></input>
        {passwordError && passwordError}
        <input
          className={styles.input}
          type="password"
          value={formData.password}
          name="password"
          onChange={handleChange}
          placeholder="Пароль* 123"
        ></input>

        <button type="submit" className={styles.buttonSubmit}>
          Войти
        </button>
      </form>
    </div>
  );
};

// const data = useSelector(getUser);

//Обычный fetch
// fetch('https://8a705e193c725f80.mokky.dev/auth', {
//   method: 'POST',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(formData),
// })
//   .then(res => res.json())
//   .then(userData => {
//     dispatch(userActions.setUser(userData));
//     // console.log(userData);

//     const {
//       token,
//       data: { role },
//     } = userData;

//     if (token && role === 'client') navigate('/cabinet');
//     if (token && role === 'admin') navigate('/admin');
//   })
//   .catch(error => console.error(error))
//   .finally(() => dispatch(userActions.setIsLoading(false)));

// // Запись  user  в localStorage:
// const handleSubmit = event => {
//   event.preventDefault();

//   fetch('https://8a705e193c725f80.mokky.dev/auth', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(formData),
//   })
//     .then(res => res.json())
//     .then(userData => {
//       localStorage.setItem('user', JSON.stringify(userData));

//       const {
//         token,
//         data: { role },
//       } = userData;

//       if (token && role === 'client') navigate('/cabinet');
//       if (token && role === 'admin') navigate('/admin');
//     })
//     .catch(error => console.error(error));
// };

// // Тип данных в State и setState д/б одинаковый
// const [emailError, setEmailError] = useState('');

// Конкретный вид event приходит автоматически в функции в зависимости
// от используемого обаботчика событий onChange={handleChange}, onSubmit={handleSubmit} и т.д.
//
// const handleChange = event => {
//   console.log(event.target.value);
//   const { name, value } = event.target;
//   setFormData(prevState => ({
//     ...prevState,
//     [name]: value,
//   }));
//   // За место [name] подставляется конкретное имя(идинтификатор) инпута
//   // За место value подставляется динамически меняющееся значение в поле инпута

// Запись в localStorage д/б в .then( здесь ) где приходят данные там и записывать!
// Если вне .then(  ) то будет задействован везде рендер попапа
// .then(res => {
// setAuthData(res);
// localStorage.setItem('user', JSON.stringify(res));
// });

// Это только перенаправление на страницу, но авторизацию нужно делать только через закрытие роуты
//   if (token && role === 'client') navigate('/cabinet');
//   if (token && role === 'admin') navigate('/admin');
// });
