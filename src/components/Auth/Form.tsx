import { useState } from 'react';
import { AuthPage } from './AuthPage';
import { RegisterPage } from './RegisterPage';
// import { AuthPageFormik } from './AuthPageFormik';

export const Form = () => {
  const [form, setForm] = useState('login');
// В setForm можно передавать любую строку например: 'register' т.к. условный рендеринг

  return <>{form === 'login' ? <AuthPage setForm={setForm} /> : <RegisterPage setForm={setForm} />}</>;
};
