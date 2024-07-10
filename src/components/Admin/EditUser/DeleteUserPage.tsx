import styles from './DeleteUserPage.module.css';
import { ChangeEvent, FormEvent, useState } from 'react';

export const DeleteUserPage = () => {
  const [formData, setFormData] = useState({
    id: '',
  });

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
      method: 'DELETE',
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

          <button type="submit" className={styles.buttonSubmit}>
            Удалить пользователя
          </button>
        </form>
      </div>
    </div>
  );
};
