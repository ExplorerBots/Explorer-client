import styles from '@/app/bot/control-panel/[botId]/_styles.module.scss';
import { IMessage } from '@/interfaces';
import { FC, PropsWithChildren } from 'react';

interface IMessageProps {
   message: IMessage;
}

const Message: FC<PropsWithChildren<IMessageProps>> = ({ message }) => {
   return (
      <li className={styles.message}>
         {message.extra && (
            <>
               {message.extra.map((letter, i) => (
                  <span
                     key={i}
                     className={styles.message_letter}
                     style={{
                        color: letter.color,
                        textDecoration: letter.underlined
                           ? 'underline'
                           : 'none',
                     }}
                  >
                     {letter.text}
                  </span>
               ))}
            </>
         )}
      </li>
   );
};

export default Message;
