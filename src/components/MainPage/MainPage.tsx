import styles from './MainPage.module.css';
import Shoppers from '../../assets/images/shoppers.jpg';

export const MainPage = () => {
  return (
    <div className={styles.mainPageWrap}>
      <div className={styles.contentBox}>
        <strong>Наша компания является одним из лидеров рынка по продаже цифровой техники в России</strong>
        <span>
          Наша цель изменить жизнь людей, сделав простым доступ к большому количеству качественных и недорогих товаров,
          предоставляя лучший сервис
        </span>
      </div>

      <div className={styles.bannerWrap}>
        <span>Мы:</span>

        <div className={`${styles.banner1} ${styles.visible}`}>Только оригинальная продукция</div>
        <div className={`${styles.banner2} ${styles.visible}`}>2 года гарантии</div>

      </div>
      <div className={styles.privilegeImageWrap}>
        <div className={styles.privilege}>
          <h2>Наши преимущества</h2>
          <strong>Только оригинальная продукция</strong>
          <p>
            У нас вы найдёте только оригинальные устройства. Для вас мы выбираем лучшие гаджеты и тщательно следим за
            качеством каждого товара в нашем магазине.
          </p>
          <strong>2 года гарантии</strong>
          <p>
            Наша продукция становится частью жизни каждого клиента. Мы уверены в ней и даём гарантию на первые два года
            эксплуатации.
          </p>
          <strong>Профессиональные консультанты</strong>
          <p>
            Наши продавцы всегда открыты к диалогу и рады вам помочь с выбором или просто рассказать подробнее про любое
            устройство из нашего магазина.
          </p>
          <strong>Поддержка после покупки</strong>
          <p>После покупки мы остаёмся на связи и готовы помочь с любым запросом.</p>
        </div>
        <img src={Shoppers} className={styles.image} alt="picture" />
      </div>
    </div>
  );
};
