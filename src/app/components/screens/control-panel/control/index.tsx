import HotBarSlots from '@/app/components/screens/control-panel/control/components/HotBarSlots';
import { useAppSelector } from '@/app/store/hooks';
import Image from 'next/image';
import Message from './components/Message';
import Notify from './components/Notify';
import styles from './styles.module.scss';

const BotControlScreen = () => {
   const userSlice = useAppSelector((store) => store.user);

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
            <ul className={styles.chat}>
               <Message timestamp="18:32:22" text="Кек я банан" />
               <Notify
                  type="red"
                  title="Смерть"
                  description="Бота убил игрок Petya2324 "
                  timestamp="14:32:11"
                  sideImage="/svg/alert-circle.svg"
               />
               <Message timestamp="18:32:22" text="Кек я банан" />
               <Message
                  timestamp="1   8:32:22"
                  text="Кек я банан Кек я банан Кек я банан Кек я банан Кек я банан Кек я банан Кек я банан Кек я банан"
               />
            </ul>
            <div className={styles.footer}>
               <div
                  className={styles.text_input}
                  contentEditable={true}
                  placeholder="/god"
               />
               <button type="button" className={styles.chat_send}>
                  <Image src="/svg/send.svg" alt="" width={30} height={30} />
               </button>
            </div>
         </div>
         <div className={styles.control_container}>
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
         </div>
      </>
   );
};

export default BotControlScreen;
