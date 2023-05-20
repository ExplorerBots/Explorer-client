import BlockTitle from '@/app/components/ui/general/blockTitle/BlockTitle';
import Divider from '@/app/components/ui/general/divider/Divider';
import styles from '@/app/styles/create-bot.module.scss';
import Head from 'next/head';
import { ChangeEvent, FC, PropsWithChildren, useRef, useState } from 'react';

const CreateBotPage: FC = () => {
   return (
      <>
         <Head>
            <title>EBots - Создать бота</title>
         </Head>

         <div className={styles.info_container}>
            <BlockTitle text="Важная информация" />

            <div className={styles.content}>
               <InfoBlock description="Твоя ферма стоит без дела? Или ты не хочешь делать грязную работу? Купи бота, и все твои проблемы решаться!" />
               <InfoBlock description="Создав своего бота, ты получишь необычайную власть!" />
            </div>
         </div>

         <div className={styles.create_container}>
            <div className={styles.content}>
               <CentralLeftBlock />
               <CentralMiddleBlock />
               <CentralRightBlock />
            </div>
         </div>
      </>
   );
};

const CentralLeftBlock = () => {
   const text = useRef<HTMLParagraphElement>(null);

   return (
      <div className={styles.internal_container}>
         {/* <Image
            className={styles.chests_image}
            src="/images/gunpowders.png"
            alt=""
            width={390}
            height={470}
         /> */}
         {/* <span className={styles.text_animation} ref={text}></span> */}
      </div>
   );
};

const CentralRightBlock = () => {
   const text = useRef<HTMLParagraphElement>(null);

   return (
      <div className={styles.internal_container}>
         {/* <Image
            className={styles.chests_image}
            src="/images/chests.png"
            alt=""
            width={390}
            height={470}
         /> */}
         {/* <span className={styles.text_animation} ref={text}></span> */}
      </div>
   );
};

const CentralMiddleBlock = () => {
   const [username, setUsername] = useState<string>('');
   const [server, setServer] = useState<string>('');
   const [promo, setPromo] = useState<string>('');
   const [term, setTerm] = useState<number>(20);
   const [totalPrice, setTotalPrice] = useState<number>(0);

   return (
      <div className={styles.internal_container}>
         <p className={styles.title}>Создание бота</p>

         <Divider text="Никнейм бота" />
         <InputField
            type="text"
            value={username}
            onChange={setUsername}
            placeholder="Никнейм"
         />

         <Divider text="Сервер бота" />
         <InputField
            type="text"
            value={server}
            onChange={setServer}
            placeholder="Выберите сервер"
         />

         <Divider text="Срок аренды" />
         <InputRange value={term} onChange={setTerm} />

         <div className={styles.input_price}></div>

         <Divider text="Промокод" />
         <InputField
            type="text"
            value={promo}
            onChange={setPromo}
            placeholder="Промокод"
         />

         <div className={styles.input_price}>
            <p>Итого: {totalPrice} ₽</p>
            <p>Срок: {term} дней</p>
         </div>

         <div className={styles.submit_container}>
            <button className={styles.submit_btn} type="submit">
               Купить
            </button>
         </div>
      </div>
   );
};

const InfoBlock: FC<PropsWithChildren<{ description: string }>> = ({
   description,
}) => {
   return (
      <div className={styles.info_block}>
         <p className={styles.info_title}></p>
         <p className={styles.info_description}>{description}</p>
      </div>
   );
};

const InputRange: FC<
   PropsWithChildren<{
      value: number;
      onChange: (e: number) => void;
   }>
> = ({ value, onChange }) => {
   return (
      <div className={styles.input_field}>
         <input
            min={5}
            max={30}
            step={5}
            type="range"
            className={styles.input}
            value={value || ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
               onChange(Number(e.target.value))
            }
         />
      </div>
   );
};

const InputField: FC<
   PropsWithChildren<{
      type: string;
      value: string;
      onChange: (e: string) => void;
      placeholder: string;
   }>
> = ({ type, value, onChange, placeholder }) => {
   return (
      <div className={styles.input_field}>
         <input
            type={type}
            className={styles.input}
            value={value || ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
               onChange(e.target.value)
            }
            placeholder={placeholder}
         />
      </div>
   );
};

export default CreateBotPage;
