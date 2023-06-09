import styles from '../styles.module.scss';

const CentralRightBlock = () => {
   return (
      <div className={styles.internal_container} data-side="right">
         <p className={styles.title}>Проблемы с пополнением баланса?</p>
         <p className={styles.text}>
            У тебя нет банковской карты, или выбранный способ оплаты не тебе не
            подходит.
         </p>
         <p className={styles.text}>
            В таком случае, тебе стоит написать нам в ВК
         </p>
         <a target="_blank" href="https://vk.com/write-217895304">
            <button className={styles.enter_button}>Перейти в диалог</button>
         </a>
      </div>
   );
};

export default CentralRightBlock;
