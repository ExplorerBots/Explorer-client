import { IChatNotify, IMessage } from '@/app/interfaces';
import { FC, PropsWithChildren, useContext } from 'react';
import { CurrentBotContext } from '../../context/CurrentBotContext';
import styles from '../../styles.module.scss';
import Message from './Message';
import Notify from './Notify';

const Chat: FC<
   PropsWithChildren<{
      dictionary: Array<IMessage | IChatNotify>;
   }>
> = ({ dictionary }) => {
   const { currentBot } = useContext(CurrentBotContext);
   return (
      <ul className={styles.chat}>
         {currentBot?.status !== 'online' ? (
            <p className={styles.empty_message}>Бот отключен..</p>
         ) : (
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
         )}
      </ul>
   );
};

export const newMessage = () => {};

export default Chat;
