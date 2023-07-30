import { IMessage } from '@/app/interfaces';
import { FC, PropsWithChildren } from 'react';
import styles from '../../../styles.module.scss';

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
