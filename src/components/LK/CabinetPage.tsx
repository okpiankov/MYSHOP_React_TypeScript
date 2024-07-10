import styles from './CabinetPage.module.css';

export const СabinetPage = () => {
  return (
    <div className={styles.cabinetPageWrap}>
      <div className={styles.contentBox}>
        <h2>Поздравляю вы находитесь в личном кабинете</h2>
        <h3>Это закрытый роут</h3>
      </div>
    </div>
  );
};
