import Image from 'next/image';
import styles from '../../styles.module.scss';

const Title = () => {
   return (
      <div className={styles.title_container}>
         <Image
            src="/controlSidebar/titleCube.svg"
            alt=""
            width={32}
            height={32}
            className={styles.title_svg}
         />
         <div className={styles.title_text}>Аддоны</div>
      </div>
   );
};

export default Title;
