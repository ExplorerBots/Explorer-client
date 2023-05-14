import BlockTitle from '@/app/components/ui/blockTitle/BlockTitle'
import styles from '@/app/styles/replenish-balance.module.scss'
import { FC, PropsWithChildren, useEffect, useState } from 'react'

const ReplenishBalancePage: FC = () => {
   const [amount, setAmount] = useState<number>(1)
   useEffect(() => {
      console.log(amount)
      amount && console.log(true)
   }, [amount])

   return <>
      <div className={styles.screen}>

         <div className={styles.bonus_container}>
            <BlockTitle text='Бонусы'/>

               <div className={styles.content}>
                  <NotyBlock title='5%' description='При пополнении на сумму от 100 до 999руб'/>
                  <NotyBlock title='15%' description='При пополнении на сумму от 1000 до 10000руб'/>
               </div>
         </div>
         
         <div className={styles.container}>
            <BlockTitle text='Пополнение баланса'/>
            <div className={styles.content}>
               
               <div className={styles.input_field}>
                  <label className={styles.input_label}>Сумма пополнения</label>
                  <input 
                  defaultValue={amount} 
                  type="number" 
                  className={styles.input_number} 
                  value={amount} 
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(Number(e.target.value))}/>
               </div>

               <div className={styles.input_result}>
                  <p>Баланс будет пополнен на {}</p>
               </div>

            </div>
         </div>
      </div>
   </>
}

const NotyBlock: FC<PropsWithChildren<{title: string, description: string}>> = ({title, description}) => {
   return (
      <div className={styles.noty_block}>
         <p className={styles.noty_title}>{title}</p>
         <p className={styles.noty_description}>{description}</p> 
      </div>
   )
}

export default ReplenishBalancePage