import Preloader from '@/app/components/ui/general/preloader/Preloader';
import { IChatNotify, IMessage } from '@/app/interfaces';
import { FC, PropsWithChildren, useContext } from 'react';
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
   // const [dictionary, setDictionary] = useState<(IMessage | IChatNotify)[]>([]);

   const { currentBot } = useContext(CurrentBotContext);

   return (
      <div className={styles.chat_container}>
         {!currentBot && (
            <div className={styles.chat_container_loading}>
               <Preloader width={100} height={100} />
            </div>
         )}
         <>
            <ul className={styles.chat}>
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
         </>
      </div>
   );
};

export default ChatContainer;
