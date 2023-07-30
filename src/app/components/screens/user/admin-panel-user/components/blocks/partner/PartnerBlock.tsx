import { IPartnerLink } from '@/app/interfaces';
import { FC, useContext, useState } from 'react';
import { UserContext } from '../../../context/UserContext';
import styles from '../../../styles.module.scss';
import CreateLinkModal from '../../modals/CreateLinkModal';
import CreatePromocodeModal from '../../modals/CreatePromocodeModal';
import DeleteLinkModal from '../../modals/DeleteLinkModal';
const PartnerBlock: FC = () => {
   const { user } = useContext(UserContext);

   const [showCreatePromo, setShowCreatePromo] = useState<boolean>(false);
   const [showDeletePromo, setShowDeletePromo] = useState<boolean>(false);
   const [showConfigPromo, setShowConfigPromo] = useState<boolean>(false);

   const [showCreateLink, setShowCreateLink] = useState<boolean>(false);
   const [showDeleteLink, setShowDeleteLink] = useState<boolean>(false);

   const [selectedPromocodes, setSelectedPromocodes] = useState<number[]>([]);
   const [selectedLinks, setSelectedLinks] = useState<IPartnerLink[]>([]);

   return (
      <div className={styles.block}>
         <div className={styles.block_title}>Партнерство</div>

         <div className={styles.inner_block}>
            <div className={styles.block_title}>Промокоды</div>
            <div className={styles.list}>
               <ul className={styles.list_header}>
                  <li className={styles.item}>Айди</li>
                  <li className={styles.item}>Код</li>
                  <li className={styles.item}>Активаций</li>
                  <li className={styles.item}>Значение</li>
                  <li className={styles.item}>Тип</li>
               </ul>
               <div className={styles.list_content}>
                  {user?.partner?.promocodes.map((promo, i) => (
                     <ul
                        key={i}
                        className={styles.list_item}
                        onClick={() => {
                           const index = selectedPromocodes.indexOf(i);
                           if (index > -1) {
                              const selected = [...selectedPromocodes];
                              selected.splice(index, 1);
                              setSelectedPromocodes(selected);
                           } else {
                              setSelectedPromocodes((p) => [...p, i]);
                           }
                        }}
                        data-selected={selectedPromocodes.includes(i)}
                     >
                        <li className={styles.item}>{promo.id}</li>
                        <li className={styles.item}>{promo.code}</li>
                        <li className={styles.item}>
                           {promo.activations?.length | 0}
                        </li>
                        <li className={styles.item}>
                           {promo.type === 'discount'
                              ? `${promo.value}%`
                              : `+${promo.value} дней`}
                        </li>
                        <li className={styles.item}>{promo.type}</li>
                     </ul>
                  ))}
               </div>
               <div className={styles.list_footer}>
                  <button
                     className={styles.create_button}
                     onClick={() => setShowCreatePromo(true)}
                  >
                     Создать
                  </button>
                  <CreatePromocodeModal
                     active={showCreatePromo}
                     setActive={setShowCreatePromo}
                  />

                  {/* {selectedPromocodes.length === 1 && (
                     <>
                        <button
                           className={styles.config_button}
                           onClick={() => setShowConfigPromo(true)}
                        >
                           Настроить
                        </button>
                        <ConfigPromocodeModal
                           active={showConfigPromo}
                           setActive={setShowConfigPromo}
                        />
                     </>
                  )} */}

                  {selectedPromocodes.length > 0 && (
                     <>
                        <button
                           className={styles.delete_button}
                           onClick={() => setShowDeletePromo(true)}
                        >
                           Удалить
                        </button>
                     </>
                  )}
               </div>
            </div>
         </div>

         <div className={styles.inner_block}>
            <div className={styles.block_title}>Социальные сети</div>
            <div className={styles.list}>
               <ul className={styles.list_header}>
                  <li className={styles.item}>Сервис</li>
                  <li className={styles.item}>Ссылка</li>
               </ul>
               <div className={styles.list_content}>
                  {user?.partner?.links.map((social, i) => (
                     <ul
                        key={i}
                        className={styles.list_item}
                        onClick={() => {
                           const index = selectedLinks.indexOf(social);
                           if (index > -1) {
                              const selected = [...selectedLinks];
                              selected.splice(index, 1);
                              setSelectedLinks(selected);
                           } else {
                              setSelectedLinks((p) => [...p, social]);
                           }
                           console.log(selectedLinks);
                        }}
                        data-selected={selectedLinks.includes(social)}
                     >
                        <li className={styles.item}>{social.service}</li>
                        <li className={styles.item}>
                           {' '}
                           <a href={social.link}>{social.link}</a>{' '}
                        </li>
                     </ul>
                  ))}
               </div>
               <div className={styles.list_footer}>
                  <button
                     className={styles.create_button}
                     onClick={() => setShowCreateLink(true)}
                  >
                     Создать
                  </button>
                  <CreateLinkModal
                     active={showCreateLink}
                     setActive={setShowCreateLink}
                  />
                  {selectedLinks.length > 0 && (
                     <>
                        <button
                           className={styles.delete_button}
                           onClick={() => setShowDeleteLink(true)}
                        >
                           Удалить
                        </button>
                        <DeleteLinkModal
                           active={showDeleteLink}
                           setActive={setShowDeleteLink}
                           socials={selectedLinks}
                        />
                     </>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default PartnerBlock;
