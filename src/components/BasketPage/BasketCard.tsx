import { NavLink } from 'react-router-dom';
import styles from './BasketCard.module.css';
// не забывай ипортировать ROUTES:
import { ROUTES } from '../../router/routes';
import DeletIcon from '../../assets/icons/delete1.svg';

type Props = {
  image: string | '';
  name: string | null;
  description: string | null;
  id: number | null;
  price: number | null;
  handlelDeleteClick: (id: number | null) => void;
  handlelQuantityClick:(id: number | null, action: string) => void;
  quantity: number | null | undefined;
  items: any[];
  setItems: (items: any[]) => void;
};

export const BasketCard = ({
  image,
  name,
  description,
  id,
  price,
  handlelDeleteClick,
  handlelQuantityClick,
  quantity,
  items,
  setItems,
}: Props) => {
  return (
    <div className={styles.basketCardWrap}>
      <NavLink to={`${ROUTES.productID}/${id}`}>
        <img src={image} className={styles.image}></img>
      </NavLink>
      <div className={styles.descriptionWrap}>
        <span>{name}</span>
        <span>{description}</span>
      </div>
      <strong>{price} руб.</strong>

      <div className={styles.counter}>
        {/* параметры для вызова функций: id приходит как пропс из компонента BasketPage,
      а action НЕ ПРИХОДИТ как пропс, а просто передается в вызов функции прямо в этом компоненте */}
        <button className={styles.button} onClick={() => handlelQuantityClick(id, 'remove')}>
          &#8211;
        </button>
        <span>{quantity}</span>
        <button className={styles.button} onClick={() => handlelQuantityClick(id, 'add')}>
          +
        </button>
        <button className={styles.svgButton} onClick={() => handlelDeleteClick(id)}>
          <DeletIcon className={styles.svgDelete} />
        </button>
      </div>
    </div>
  );
};
