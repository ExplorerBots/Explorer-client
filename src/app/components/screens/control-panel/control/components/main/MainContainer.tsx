import { IChatNotify, IMessage } from '@/app/interfaces';
import { FC, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../context/SocketContext';
import styles from '../../styles.module.scss';
import AutoclickerContainer from '../autoclicker/AutoclickerContainer';
import ChatContainer from '../chat/ChatContainer';
import InventoryContainer from '../inventory/InventoryContainer';
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
         {selectedId === 1 ? (
            <ChatContainer
               dictionary={dictionary}
               setDictionary={setDictionary}
            />
         ) : selectedId === 2 ? (
            <InventoryContainer />
         ) : selectedId === 3 ? (
            <AutoclickerContainer />
         ) : (
            <></>
         )}

         <Footer selectedId={selectedId} />
      </div>
   );
};

export default MainContainer;
