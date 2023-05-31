import { IChatNotify, IMessage } from '@/app/interfaces';
import { FC, PropsWithChildren } from 'react';
import styles from '../styles.module.scss';
import Message from './Message';
import Notify from './Notify';

const Chat: FC<
   PropsWithChildren<{
      dictionary: Array<IMessage | IChatNotify>;
   }>
> = ({ dictionary }) => {
   return (
      <ul className={styles.chat}>
         {dictionary.map((word, i) =>
            word.type === 'message' ? (
               <Message key={i} timestamp={word.timestamp} text={word.text} />
            ) : (
               <Notify
                  key={i}
                  type={word.temperature}
                  title={word.title}
                  description={word.description}
                  timestamp={word.timestamp}
                  sideImage="/svg/alert-circle.svg"
               />
            )
         )}
      </ul>
   );
};

export const newMessage = () => {};

export default Chat;
