import Logo from '@/app/components/ui/logo/Logo'
import NavProfile from '@/app/components/ui/navProfile/NavProfile'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren } from 'react'
import styles from './Header.module.scss'


const Header: FC<PropsWithChildren> = () => {

   const { pathname } = useRouter()

   return (
      <header className={styles.header}>
         <div className={styles.container}>
         
         <Logo />
         <div className={styles.item}>
            <img className={styles.svg} src='/header/user-plus.svg' alt="" />
            <Link href='/create-bot'>Создать бота</Link>
         </div>
         <div className={styles.item}>
            <img className={styles.svg} src='/header/control.svg' alt="" />
            <Link href='/control-panel'>Панель управления</Link>
         </div>
         <div className={styles.item}>
            <img className={styles.svg} src='/header/help-circle.svg' alt="" />
            <Link href='/help'>Помощь</Link>
         </div>
            <NavProfile />
         </div>
      </header>
   )
}

export default Header