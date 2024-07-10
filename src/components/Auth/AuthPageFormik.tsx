// import { Field, Formik, Form } from 'formik';
// import styles from './AuthPage.module.css';

// export const AuthPageFormik = ({setForm}) => {
   
//   // в values хранятся поля со значениями которые мы определили в initialValues
//   // значения полей автоматически сохраняются при вводе символов в эти инпуты
//   const handleSubmit = values => {
//     // e.preventDefault(); не нужно
//     console.log(values);
    
//     fetch('https://8a705e193c725f80.mokky.dev/auth', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(values),
//     })
//       .then(res => res.json())
//       .then(res => console.log(res));
//   };

//   return (
//     <div className={styles.authWrap}>
//       <div>
//         <span className={styles.select}>Вход</span>
//         {/* В setForm можно передавать любую строку например: 'register' */}
//         <button className={styles.selectАctive} onClick={() => setForm('register')}>
//           / Регистрация{' '}
//         </button>
//       </div>

//       <Formik initialValues={{ email: '', password: '', }} onSubmit={handleSubmit}>
//         <Form className={styles.inputWrap}>
//           <Field
//             className={styles.input}
//             type="email"
//             name="email"
//             placeholder="Email* user@test.com"
//           />
//           <Field
//             className={styles.input}
//             type="password"
//             name="password"
//             placeholder="Пароль* 123"
//           />
//           <button type="submit" className={styles.buttonSubmit}>
//             Войти
//           </button>
//         </Form>
//       </Formik>
//     </div>
//   );
// };
