import { UserService } from '@/app/services/user.service'
import { useAppDispatch } from '@/app/store/hooks'
import { setUserData } from '@/app/store/slices/user'
import { NextPage } from 'next'
import { parseCookies } from 'nookies'
import { useEffect } from 'react'
import Footer from './footer/Footer'
import Header from './header/Header'
import styles from './Layout.module.scss'

interface Props {
   children: any
}

const Layout: NextPage<Props> = ({ children }) => {
   const dispatch = useAppDispatch()

   useEffect(() => {
      const { authToken } = parseCookies()
      if (authToken) {
         const user = UserService.tokenDecode(authToken)
         dispatch(setUserData(user))
      }
   }, [])

   return (
      <div className={styles.wrapper}>
         <Header />
         {children}
         <Footer/>
      </div>
   )
}

export default Layout