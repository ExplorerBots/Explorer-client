import { IChatNotify, IMessage } from '@/app/interfaces';
import { FC, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../context/SocketContext';
import styles from '../../styles.module.scss';
import { AutoLeave } from '../addons/auto-leave/AutoLeave';
import AutoclickerContainer from '../addons/autoclicker/AutoclickerContainer';
import ChatContainer from '../addons/chat/ChatContainer';
import InventoryContainer from '../addons/inventory/InventoryContainer';
import { Macros } from '../addons/macros/Macros';
import { Timers } from '../addons/timers/Timers';
import Footer from './Footer';
import Header from './Header';

interface Props {
   selectedId: number;
}
const MainContainer: FC<PropsWithChildren<Props>> = ({ selectedId }) => {
   const [dictionary, setDictionary] = useState<(IMessage | IChatNotify)[]>([]);

   const { socket } = useContext(SocketContext);

   useEffect(() => {
      if (socket) {
         socket.on('chat-message', (message) => {
            setDictionary((prev: any) => [
               ...prev,
               {
                  type: 'message',
                  extra: message.extra,
               },
            ]);
         });

         socket.on('set-last-messages', (messages: { extra: [] }[]) => {
            const resultMessages: IMessage[] = [];
            messages.map((message) => {
               resultMessages.push({
                  type: 'message',
                  extra: message.extra,
               });
            });
            setDictionary(resultMessages);
         });
      }
   }, [socket]);

   return (
      <div className={styles.main_container}>
         <Header />
         <div className={styles.activity}>
            {
               {
                  1: (
                     <ChatContainer
                        dictionary={dictionary}
                        setDictionary={setDictionary}
                     />
                  ),
                  2: <InventoryContainer />,
                  3: <Macros />,
                  4: <Timers />,
                  5: <AutoLeave />,
                  6: <AutoclickerContainer />,
               }[selectedId]
            }
         </div>

         <Footer selectedId={selectedId} />
      </div>
   );
};

export default MainContainer;
