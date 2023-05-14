import PanelOfBot from '@/app/components/ui/controlPanel/PanelOfBot'
import styles from '@/app/styles/control-panel.module.scss'
import { FC } from 'react'

const ControlPanelPage: FC = () => {
   return <>
         <div className={styles.page}>
         <main className={styles.content}>
            <div className={styles.bot_panel}>
               <PanelOfBot />
               <PanelOfBot />
               <PanelOfBot />
               <PanelOfBot />
               <PanelOfBot />
               <PanelOfBot />
               <PanelOfBot />
               <PanelOfBot />
               <PanelOfBot />
            </div>
         </main>
      </div>
      </>
}

export default ControlPanelPage