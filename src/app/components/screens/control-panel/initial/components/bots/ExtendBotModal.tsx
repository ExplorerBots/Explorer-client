import DefaultModal from '@/app/components/ui/modals/defaultModal/DefaultModal';
import { IBot } from '@/app/interfaces';
import styles from '@/assets/modal.module.scss';
import { useState } from 'react';
import { useExtendBot } from '../../hooks/useExtendBot';

interface Props {
   active: boolean;
   setActive: (bool: boolean) => void;
   currentBot: IBot | null;
}

export const ExtendBotModal = ({ active, setActive }: Props) => {
   const [period, setPeriod] = useState<number>(0);

   const { extendBot, isLoading, error } = useExtendBot();

   const handleSubmit = () => {};
   const handleClose = () => setActive(false);

   return (
      <DefaultModal
         active={active}
         loading={isLoading}
         title={'Продление бота'}
      >
         <div className={styles.modal_body}>
            <div className={styles.modal_field}>
               <input
                  type="range"
                  value={period}
                  onChange={(e) => setPeriod(Number(e.currentTarget.value))}
                  className={styles.input}
                  min={5}
                  max={90}
               />
            </div>
            <div className={styles.result}>Бот будет продлен на </div>
         </div>
      </DefaultModal>
   );
};
