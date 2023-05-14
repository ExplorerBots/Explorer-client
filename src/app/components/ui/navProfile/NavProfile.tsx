import { getRoleDescription } from '@/app/lib/role-description'
import { useAppDispatch } from '@/app/store/hooks'
import { setUserData } from '@/app/store/slices/user'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { destroyCookie } from 'nookies'
import { FC, useEffect, useState } from 'react'
import LinkItem from './linkItem/LinkItem'
import styles from './NavProfile.module.scss'

const NavProfile: FC = () => {
   // const userData = useAppSelector(state => state.user.data)
   const userData = {
      username: 'Sapok',
      balance: 12000,
      role: 'ADMIN'
   }
   // const userData = false
   const dispatch = useAppDispatch()
   const router = useRouter()
   const [showProfile, setShowProfile] = useState<boolean>(false)

   const logout = () => {
      destroyCookie(null, 'authToken')
      setShowProfile(false)
      router.push('/authorize')
      dispatch(setUserData(null))
   }

   useEffect(() => {
      console.log(showProfile)
   }, [showProfile])

   return <div className={styles.profile}>
      {userData ? <>
       <div className={styles.balance_container}>
               <span className={styles.balance}>{userData.balance} </span>
               <Link href='/replenish-balance' className={styles.btn_replenish}>+</Link>
         </div><div className={styles.profile_container} onClick={() => setShowProfile(!showProfile)} style={showProfile ? {} : {}}>
               <div className={styles.info}>
                  <p className={styles.username}>{userData.username}</p>
                  <span className={styles.role}>{getRoleDescription(userData.role)}</span>
               </div>
            </div>
            </>
         :
         <div className={styles.profile_authorization}>
            <button className={styles.authorization_btn}>
               <Link href="/authorize">Авторизоваться</Link>
            </button>
         </div>
      }

      <AnimatePresence>
         {showProfile &&
            <motion.div className={styles.items_container}
               initial={{ y: -20, opacity: 0 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.08 }}
               exit={{ y: -20, opacity: 0 }}
            >
               {userData?.role === 'ADMIN' &&
                  <LinkItem href='/admin-panel' title='Админ панель' onclick={setShowProfile} state={!showProfile} />
               }
               {/* <LinkItem href='/profile' title='Профиль' onclick={setShowProfile} state={!showProfile} /> */}
               <LinkItem href='/replenish-balance' title='Пополнить баланс' onclick={setShowProfile} state={!showProfile} />
               <LinkItem href='/authorize' title='Выйти из аккаунта' onclick={logout} />
            </motion.div>}
      </AnimatePresence>

   </div>
}

export default NavProfile