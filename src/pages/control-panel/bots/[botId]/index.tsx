import HotBarSlots from '@/app/components/ui/control-panel/control/HotBarSlots';
import { withAuth } from '@/app/hoc/withAuth';
import { useAppSelector } from '@/app/store/hooks';
import styles from '@/app/styles/control-panel-bot.module.scss';
import Image from 'next/image';
import { FC, PropsWithChildren } from 'react';

const BotControlPage = () => {
   const userSlice = useAppSelector((store) => store.user);

   // if (userSlice.data) {
   //    router.push('/authorize');
   // }
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
               <Message
                  timestamp="18:32:22"
                  text="куплю гд 2кк, а еще я понос коня купите мне жопу я ебал твой рот оаоаоаоаоао"
               />
               <Notify
                  type="red"
                  title="Смерть"
                  description="Бота убил игрок Petya2324 "
                  timestamp="14:32:11"
                  sideImage="/svg/alert-circle.svg"
               />
               <Message
                  timestamp="18:32:22"
                  text="куплю гд 2кк, а еще я понос коня купите мне жопу я ебал твой рот оаоаоаоаоао"
               />
               <Message
                  timestamp="18:32:22"
                  text="куплю гд 2кк, а еще я понос коня купите мне жопу я ебал твой рот оаоаоаоаоао"
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

const Message: FC<
   PropsWithChildren<{
      timestamp: string;
      text: string;
   }>
> = ({ timestamp, text }) => {
   return (
      <li className={styles.message}>
         <span className={styles.timestamp}>{timestamp} </span>
         {text}
      </li>
   );
};

const Notify: FC<
   PropsWithChildren<{
      type: string;
      title: string;
      description: string;
      timestamp: string;
      sideImage: string;
   }>
> = ({ type, title, description, sideImage, timestamp }) => {
   return (
      <li className={styles.notify} data-notify={type}>
         <div className={styles.side}>
            <Image src={sideImage} alt="" width={24} height={24} />
         </div>
         <div className={styles.content}>
            <div className={styles.title}>{title}</div>
            <div className={styles.description}>{description}</div>
            <div className={styles.timestamp}>{timestamp}</div>
         </div>
      </li>
   );
};
export default withAuth(BotControlPage);
