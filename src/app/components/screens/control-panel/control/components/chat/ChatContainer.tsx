import Preloader from '@/app/components/ui/general/preloader/Preloader';
import { IChatNotify, IMessage } from '@/app/interfaces';
import Image from 'next/image';
import {
   FC,
   PropsWithChildren,
   useContext,
   useEffect,
   useRef,
   useState,
} from 'react';
import { CurrentBotContext } from '../../context/CurrentBotContext';
import styles from '../../styles.module.scss';
import Message from './Message';
import Notify from './Notify';

interface Props {
   dictionary: (IMessage | IChatNotify)[];
   setDictionary: (e: any) => void;
}

const ChatContainer: FC<PropsWithChildren<Props>> = ({
   dictionary,
   setDictionary,
}) => {
   const { currentBot } = useContext(CurrentBotContext);
   const chatRef = useRef<HTMLUListElement | null>(null);
   const [showScrollToBottomButton, setShowScrollToBottomButton] =
      useState<boolean>(false);
   let prevScrollTop = 0;
   const [firstScroll, setFirstScroll] = useState<boolean>(true);

   useEffect(() => {
      const chatElement = chatRef.current;
      if (!chatElement) return;

      if (firstScroll) {
         chatElement.scrollTo({
            top: chatElement.scrollHeight,
            behavior: 'smooth',
         });
         setFirstScroll(false);
      }

      const scrolled = chatElement.scrollHeight - (chatElement.scrollTop + 500);
      console.log(scrolled);
      if (scrolled < 50) {
         chatElement.scrollTo({
            top: chatElement.scrollHeight,
            behavior: 'smooth',
         });
      }
   }, [dictionary]);

   useEffect(() => {
      const chatElement = chatRef.current;
      if (!chatElement) return;

      const handleScroll = () => {
         const scrolled =
            chatElement.scrollHeight - (chatElement.scrollTop + 500);
         const scrollTop = chatElement.scrollTop;
         if (scrolled > 10) {
            setShowScrollToBottomButton(true);
         } else {
            setShowScrollToBottomButton(false);
         }

         prevScrollTop = scrollTop;
      };

      if (chatElement) {
         chatElement.addEventListener('scroll', handleScroll);
      }

      return () => {
         if (chatElement) {
            chatElement.removeEventListener('scroll', handleScroll);
         }
      };
   }, []);

   const handleScrollToBottomClick = () => {
      const chatElement = chatRef.current;
      if (!chatElement) return;
      chatElement.scrollTo({
         top: chatElement.scrollHeight,
         behavior: 'smooth',
      });
   };

   return (
      <div className={styles.chat_container}>
         {!currentBot && (
            <div className={styles.chat_container_loading}>
               <Preloader width={100} height={100} />
            </div>
         )}
         {showScrollToBottomButton && (
            <button
               className={styles.chat_scroll_button}
               onClick={handleScrollToBottomClick}
            >
               <Image
                  src="/svg/chevron-down.svg"
                  alt=""
                  width={30}
                  height={30}
               />
            </button>
         )}
         <ul
            className={styles.chat}
            ref={chatRef}
            // onScroll={handleScroll}
         >
            {currentBot?.status === 'online' || dictionary.length ? (
               <>
                  {dictionary.map((word, i) =>
                     word.type === 'message' ? (
                        <Message
                           key={i}
                           timestamp={word.timestamp}
                           text={word.text}
                        />
                     ) : (
                        <Notify
                           key={i}
                           type={word.temperature}
                           title={word.title}
                           description={word.description}
                           timestamp={word.timestamp}
                        />
                     )
                  )}
               </>
            ) : (
               <p className={styles.empty_message}>Бот отключен..</p>
            )}
         </ul>
      </div>
   );
};

export default ChatContainer;
