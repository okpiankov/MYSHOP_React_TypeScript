import styles from './PayPage.module.css';
import PersonIcon from '../../assets/icons/user2.svg';
import BriefcaseIcon from '../../assets/icons/briefcase2.svg';
import { useState } from 'react';

export const PayPage = () => {
  const [popUpPay_1, setpopUpPay_1] = useState<boolean>(true);
  const handlePopUp_1 = () => setpopUpPay_1(!popUpPay_1);

  const [popUpPay_2, setpopUpPay_2] = useState(false);
  const handlePopUp_2 = () => setpopUpPay_2(!popUpPay_2);

  return (
    <>
      <h2 className={styles.h2}>Способы оплаты</h2>

      <div className={styles.payWrap}>

        {/* div кнопка*/}
        <div onClick={handlePopUp_1} className={styles.personWrap}>
          <PersonIcon className={styles.person} />

          <div className={styles.innerWrap}>
            <strong>Для физических лиц</strong>
            <span>Прозрачные и удобные платежи</span>
          </div>
        </div>
        
        {/* div кнопка*/}
        <div onClick={handlePopUp_2} className={styles.personWrap}>
          <BriefcaseIcon className={styles.briefcase} />

          <div className={styles.innerWrap}>
            <strong>Для юридических лиц</strong>
            <span>Безопасность и особые условия</span>
          </div>
        </div>

        <div className={`${styles.description} ${popUpPay_1 ? styles.description_visible : ''}`}>
          <strong>Онлайн-оплата</strong>
          <span>Картами Мир. Без комиссии</span>
          <strong>Оплата через СБП</strong>
          <span>
            Платите через QR-код или ссылку. Вводить реквизиты карты не понадобится! Нужен только смартфон с приложением
            банка и интернетом
          </span>
          <strong>По QR-коду</strong>
          <span>
            Откройте приложение банка и выберите пункт с оплатой через QR-код.C помощью камеры распознайте QR-код и
            подтвердите оплату
          </span>
          <strong>Наличными курьеру</strong>
          <span>
            Доставка товаров с оплатой наличными курьеру доступна для некоторых групп товаров. Подробнее уточняйте у
            менеджера по телефону{' '}
          </span>
        </div>

        <div className={`${styles.description} ${popUpPay_2 ? styles.description_visible : ''} ${styles.media}`}>
          <strong>Оплата счета</strong>
          <span>
            Ссылка для скачивания счета и информация о заказе будет доступна после оформления заказа на финальной
            странице, в личном кабинете на странице «Заказы» и в письме на вашей электронной почте. Срок оплаты
            выставленного менеджером счета – до 3 дней. В некоторых случаях по согласованию с менеджером его можно
            продлить. Мы отгрузим товар в течение суток после поступления денежных средств на наш счет.
          </span>
        </div>
      </div>
    </>
  );
};
