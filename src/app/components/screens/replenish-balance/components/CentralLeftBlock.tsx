import styles from '../styles.module.scss';

const CentralLeftBlock = () => {
   return (
      <div className={styles.internal_container}>
         <p className={styles.title}>Имеешь популярность?</p>
         <p className={styles.text}>
            У тебя на ютубе больше 2000 подписчиков, или стабильные 20 зрителей
            на твиче.
         </p>
         <p className={styles.text}>
            У нас есть для тебя партнерская программа
         </p>
         <a target="_blank" href="https://vk.com/write-217895304">
            <button className={styles.enter_button}>Напиши нам</button>
         </a>
      </div>
   );
};

export default CentralLeftBlock;
