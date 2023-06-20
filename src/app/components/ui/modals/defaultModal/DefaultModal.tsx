import { motion } from 'framer-motion';
import { FC, PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.module.scss';

interface IDefaultModalProps {
   active: boolean;
   title: string;
   onSubmit: () => void;
   onClose: () => void;
}

const DefaultModal: FC<PropsWithChildren<IDefaultModalProps>> = ({
   active,
   title,
   onSubmit,
   onClose,
   children,
}) => {
   if (!active) return null;
   if (typeof window === 'object') {
      const portalContainer = document.getElementById('modal_portal');
      if (portalContainer) {
         return ReactDOM.createPortal(
            <motion.div
               className={styles.modal}
               onClick={onClose}
               initial={{ y: 20, opacity: 0 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.1 }}
            >
               <div
                  className={styles.modal_content}
                  onClick={(e) => e.stopPropagation()}
               >
                  <div className={styles.modal_header}>
                     <div className={styles.modal_title}>{title}</div>
                  </div>
                  <div className={styles.modal_body}>{children}</div>
                  <div className={styles.modal_footer}>
                     <button
                        onClick={onSubmit}
                        className={styles.modal_submit_button}
                     >
                        Подтвердить
                     </button>
                     <button
                        onClick={onClose}
                        className={styles.modal_close_button}
                     >
                        Закрыть
                     </button>
                  </div>
               </div>
            </motion.div>,
            portalContainer
         );
      }
   }
   return null;
};

export default DefaultModal;
