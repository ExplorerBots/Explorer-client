import { IChatNotify, IMessage } from '@/app/interfaces';
import { useAppSelector } from '@/app/store/hooks';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Chat from './components/Chat';
import styles from './styles.module.scss';

const BotControlScreen = () => {
   const userSlice = useAppSelector((store) => store.user);
   const chatInputRef = useRef<HTMLInputElement>(null);
   const [chatText, setChatText] = useState('');
   const [dictionary, setDictionary] = useState<Array<IMessage | IChatNotify>>(
      []
   );

   useEffect(() => {
      setDictionary((prev) => [
         ...prev,
         {
            type: 'notify',
            temperature: 'red',
            title: 'Подключение',
            description: 'Успешное подключение к серверу',
            timestamp: new Date().toLocaleTimeString(),
         },
      ]);
   }, []);

   const newMessage = () => {
      if (chatText === '') return;
      setDictionary((prev) => [
         ...prev,
         {
            type: 'message',
            timestamp: new Date().toLocaleTimeString(),
            text: chatText,
         },
      ]);
      setChatText('');
   };

   return (
      <>
         <div className={styles.chat_container}>
            <div className={styles.header}>
               <div className={styles.avatar}></div>
               <div className={styles.left_side}>
                  <p className={styles.username}>
                     SapokTapok <span className={styles.bot_id}>433</span>
                  </p>
                  <p className={styles.server}>HolyWorld</p>
               </div>
               <div className={styles.right_side}>
                  <button className={styles.button_leave}>Отключить</button>
               </div>
            </div>
            <Chat dictionary={dictionary} />
            <div className={styles.footer}>
               <input
                  className={styles.text_input}
                  contentEditable={true}
                  placeholder="/god"
                  value={chatText}
                  onChange={(e) => {
                     setChatText(e.currentTarget.value);
                  }}
                  onSubmit={newMessage}
                  onKeyDown={(e) => e.code === 'Enter' && newMessage()}
               />
               <button
                  type="submit"
                  className={styles.chat_send}
                  onClick={newMessage}
               >
                  <Image src="/svg/send.svg" alt="" width={30} height={30} />
               </button>
            </div>
         </div>
         {/* <div className={styles.control_container}>
            <div className={styles.info}>
               <div className={styles.health}>
                  <Image
                     src="/assets/heart.png"
                     height={20}
                     width={20}
                     alt=""
                  />
                  <Image
                     src="/assets/heart.png"
                     height={20}
                     width={20}
                     alt=""
                  />
                  <Image
                     src="/assets/heart.png"
                     height={20}
                     width={20}
                     alt=""
                  />
                  <Image
                     src="/assets/heart.png"
                     height={20}
                     width={20}
                     alt=""
                  />
                  <Image
                     src="/assets/heart.png"
                     height={20}
                     width={20}
                     alt=""
                  />
                  <Image
                     src="/assets/heart.png"
                     height={20}
                     width={20}
                     alt=""
                  />
                  <Image
                     src="/assets/heart.png"
                     height={20}
                     width={20}
                     alt=""
                  />
                  <Image
                     src="/assets/heart.png"
                     height={20}
                     width={20}
                     alt=""
                  />
                  <Image
                     src="/assets/heart.png"
                     height={20}
                     width={20}
                     alt=""
                  />
                  <Image
                     src="/assets/heart.png"
                     height={20}
                     width={20}
                     alt=""
                  />
               </div>
               <div className={styles.feed}>
                  <Image src="/assets/feed.png" height={20} width={20} alt="" />
                  <Image src="/assets/feed.png" height={20} width={20} alt="" />
                  <Image src="/assets/feed.png" height={20} width={20} alt="" />
                  <Image src="/assets/feed.png" height={20} width={20} alt="" />
                  <Image src="/assets/feed.png" height={20} width={20} alt="" />
                  <Image src="/assets/feed.png" height={20} width={20} alt="" />
                  <Image src="/assets/feed.png" height={20} width={20} alt="" />
                  <Image src="/assets/feed.png" height={20} width={20} alt="" />
                  <Image src="/assets/feed.png" height={20} width={20} alt="" />
                  <Image src="/assets/feed.png" height={20} width={20} alt="" />
               </div>
            </div>
            <div className={styles.hotbar}>
               <HotBarSlots
                  slot={1}
                  classSlot={styles.slot}
                  classSlotImage={styles.slot_image}
                  classSlots={styles.slots}
               />
            </div>
         </div> */}
      </>
   );
};

export default BotControlScreen;
