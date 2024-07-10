import { useEffect, useState } from 'react';
import styles from './PersonalDataPage.module.css';
import { getUser } from '../../../store/user/slice';
import { useSelector } from 'react-redux';

type User = {
  data: {
    avatar: string | null;
    email: string | null;
    fullName: string | null;
    id: number | null;
    role: string | null;
    tel?: string | null;
  };
  token: string | null;
};

export const PersonalDataPage = () => {
  const [user, setUser] = useState<User | null>(null);

  //Подписка на user из Redux
  const userRedux = useSelector(getUser);
  useEffect(() => {
    if (!userRedux) {
      return;
    }
    setUser(userRedux);
  }, [userRedux]);

  // //Подписка на user из localStorage
  // useEffect(() => {
  //   const user = localStorage.getItem('user');

  //   if (!user) {
  //     return;
  //   }
  //   setUser(JSON.parse(user));
  // }, []);

  return (
    <div className={styles.wrap}>
      <strong>Личная информация:</strong>
      <div>Имя пользователя:</div>
      <strong>{user?.data?.fullName}</strong>
      <div>Электронная почта:</div>
      <strong>{user?.data?.email}</strong>
      <div>Ваш id:</div>
      <strong>{user?.data?.id}</strong>
      <div>Телефон:</div>
      <strong>{user?.data?.tel}</strong>
    </div>
  );
};
