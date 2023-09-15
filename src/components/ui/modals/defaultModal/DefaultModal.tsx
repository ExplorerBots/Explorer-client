import { motion } from 'framer-motion';
import Image from 'next/image';
import { FC, PropsWithChildren, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.module.scss';

interface IDefaultModalProps {
   active: boolean;
   loading: boolean;
   title: string;

   // handleSubmit: (func: () => void) => void;

   onSubmit?: (data?: any) => void;
   onClose?: () => void;
   success?: boolean;
   successText?: string;
   error?: boolean;
   errorText?: string;
   submitDisable?: boolean;
   showSubmitButton?: boolean;
   showCloseButton?: boolean;
   submitButtonText?: string;
   submitButtonId?: string;
   closeButtonText?: string;
   closeDisable?: boolean;
}

const DefaultModal: FC<PropsWithChildren<IDefaultModalProps>> = ({
   active,
   loading,
   title,
   onSubmit = () => {},
   onClose = () => {},
   children,
   success = false,
   successText,
   error = false,
   errorText,
   submitDisable = false,
   closeDisable = false,
   showSubmitButton = true,
   showCloseButton = true,
   submitButtonText = 'Подтвердить',
   closeButtonText = 'Закрыть',
   submitButtonId,
}) => {
   const escFunction = useCallback((event: any) => {
      if (event.key === 'Escape') {
         !loading && onClose();
      }
   }, []);

   useEffect(() => {
      if (loading) return;
      document.addEventListener('keydown', escFunction, false);

      return () => {
         document.removeEventListener('keydown', escFunction, false);
      };
   }, [escFunction, loading]);

   if (!active) return null;
   if (typeof window === 'object') {
      const portalContainer = document.getElementById('modal_portal');
      if (portalContainer) {
         return ReactDOM.createPortal(
            <motion.div
               className={styles.modal}
               onClick={() => !loading && onClose()}
               initial={{ y: 20, opacity: 0 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.1 }}
            >
               <div
                  className={styles.modal_content}
                  onClick={(e) => e.stopPropagation()}
                  data-loading={loading}
               >
                  <div className={styles.modal_header}>
                     <div className={styles.modal_title}>{title}</div>
                  </div>
                  {success ? (
                     <div className={styles.modal_result}>
                        <Image
                           src="/svg/confirm-icon.svg"
                           alt=""
                           width={100}
                           height={100}
                           className={styles.image}
                        />
                        <div className={styles.text}>{successText}</div>
                     </div>
                  ) : error ? (
                     <div className={styles.modal_result}>
                        <Image
                           src="/svg/close-red-icon.svg"
                           alt=""
                           width={100}
                           height={100}
                           className={styles.image}
                        />
                        <div className={styles.text}>{errorText}</div>
                     </div>
                  ) : (
                     <div className={styles.modal_body}>{children}</div>
                  )}
                  <div className={styles.modal_footer}>
                     {showSubmitButton && (
                        <button
                           onClick={onSubmit}
                           className={styles.modal_submit_button}
                           data-loading={loading}
                           disabled={loading || submitDisable}
                           type="submit"
                           form={submitButtonId}
                        >
                           {loading ? (
                              <Image
                                 src="/svg/preloader.svg"
                                 alt=""
                                 width={20}
                                 height={20}
                              ></Image>
                           ) : (
                              submitButtonText
                           )}
                        </button>
                     )}

                     {showCloseButton && (
                        <button
                           onClick={() => !loading && onClose()}
                           className={styles.modal_close_button}
                           disabled={closeDisable}
                           data-full-width={!showSubmitButton}
                        >
                           {closeButtonText}
                        </button>
                     )}
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
