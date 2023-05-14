import styles from '@/app/styles/admin-panel.module.scss'
import Link from 'next/link'
import { FC } from 'react'

const AdminPanelPage: FC = () => {
return (
<div className={styles.screen}>
   <div className={styles.container}>
      <div className={styles.title}>Выбор панели</div>
      <Link href='/admin-panel/users' className={styles.link}>Пользователи</Link>
      <Link href='/admin-panel/promo' className={styles.link}>Промокоды</Link>
   </div>
</div>
)
}


export default AdminPanelPage