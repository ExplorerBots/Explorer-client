import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import { registrationUser } from '@/app/store/slices/user'
import { motion } from 'framer-motion'
import Link from 'next/link'
import router from 'next/router'
import { FC, useState } from 'react'
import styles from './RegistrationForm.module.scss'

const RegistrationForm: FC = () => {
   const [username, setUsername] = useState('')
   const [usernameDirty, setUsernameDirty] = useState(false)
   const [usernameError, setUsernameError] = useState('')
   const [password, setPassword] = useState('')
   const [passwordDirty, setPasswordDirty] = useState(false)
   const [passwordError, setPasswordError] = useState('')
   const [email, setEmail] = useState('')
   const [emailDirty, setEmailDirty] = useState(false)
   const [emailError, setEmailError] = useState('')

   const dispatch = useAppDispatch()
   const { _isLoading, data } = useAppSelector(state => state.user)

   const onSubmit = async () => {
      dispatch(registrationUser({ username, password, email }))
      router.push('/')
   }



   return <div className={styles.screen}>
      <motion.div className={styles.form}
         initial={{ y: 20, opacity: 0 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.1 }}
      >
         <div className={styles.title_container}>
            <p className={styles.title}>Регистрация аккаунта</p>
         </div>

         <div className={styles.form_field}>
            <div className={styles.prefix}>
               <img className={styles.svg} src='/auth/user.svg' alt="" />
            </div>
            <input className={styles.input} type="text" placeholder='Никнейм' value={username} onChange={(e) => setUsername(e.target.value)} />
         </div>
         <div className={styles.form_field}>
            <div className={styles.prefix}>
               <img className={styles.svg} src='/auth/mail.svg' alt="" />
            </div>
            <input className={styles.input} type="text" placeholder='Почта' value={email} onChange={(e) => setEmail(e.target.value)} />
         </div>
         <div className={styles.form_field}>
            <div className={styles.prefix}>
               <img className={styles.svg} src='/auth/lock.svg' alt="" />
            </div>
            <input className={styles.input} type="text" placeholder='Пароль' value={password} onChange={(e) => setPassword(e.target.value)} />
         </div>

         <div className={styles.cont}>
            <button className={styles.btn} onClick={() => onSubmit()}>Зарегистрироваться</button>
            <p className={styles.answer}>Есть аккаунт? <Link href="/authorize" className={styles.link}>Авторизируйся</Link>
            </p>
         </div>

      </motion.div >
   </div>
}

export default RegistrationForm