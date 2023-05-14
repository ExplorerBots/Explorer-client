import { IFullUser } from '@/app/interfaces/user.interface'
import { getRoleDescription } from '@/app/lib/role-description'
import Link from 'next/link'
import { FC, PropsWithChildren } from 'react'
import styles from './AdminUserItem.module.scss'

interface userProps {
   user: IFullUser
}

const AdminUserItem: FC<PropsWithChildren<userProps>> = ({ user }) => {

   const createData = new Date(user.createdAt).toLocaleString()
   const roleDescription = getRoleDescription(user.role)

   return <>
      <li className={styles.user}>
         <div className={styles.left_cont}>
            <Link className={styles.username} href={`/admin-panel/users/${String(user.id)}`}><span className={styles.id}>{user.id}</span> {user.username}</Link>
            <p className={styles.email}>{user.email}</p>
            <p className={styles.create_data}>Дата регистрации: {createData}</p>
         </div>

         <div className={styles.right_cont}>
            <p className={styles.role}>{roleDescription}</p>
            <p className={styles.balance}>{user.balance} ₽</p>


            <Link className={styles.profile_link} href={`/admin-panel/users/${String(user.id)}`}>
               <svg className={styles.svg_link} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
            </Link>
         </div>
      </li>
   </>
}

export default AdminUserItem