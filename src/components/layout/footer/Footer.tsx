import { routes } from '@/constants';
import Link from 'next/link';
import Logo from '../../ui/general/logo/Logo';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
   return (
      <div className={styles.footer}>
         <div className={styles.container}>
            <div className={styles.content_logo}>
               <Logo />
            </div>

            <div className={styles.content_comment}>
               <p>
                  Все что не делается <br /> делается к лучшему
               </p>
            </div>

            <div className={styles.content_links}>
               <Link href={routes.CREATE_BOT}>Создать бота</Link>
               <Link href={routes.CONTROL_PANEL}>Управление</Link>
               <Link href={routes.REPLENISH_BALANCE}>Пополнить баланс</Link>
               <Link href={routes.HELP}>Помощь</Link>
            </div>

            <div className={styles.content_email}>
               <p>ebots.help@gmail.com</p>
            </div>

            <div className={styles.content_socials}>
               <a target="_blank" href="">
                  <SvgVk />
               </a>
               <a target="_blank" href="">
                  <SvgDiscord />
               </a>
               <a target="_blank" href="">
                  <SvgTelegram />
               </a>
               <a target="_blank" href="">
                  <SvgYoutube />
               </a>
            </div>
         </div>
      </div>
   );
};

const SvgVk = () => {
   return (
      <svg
         className={styles.vk}
         width="20"
         height="20"
         viewBox="0 0 17 11"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path d="M16.8485 9.30163C16.8028 9.22513 16.5201 8.61096 15.16 7.34861C13.7362 6.02676 13.9274 6.24141 15.6424 3.9558C16.687 2.56382 17.1046 1.71376 16.9739 1.35035C16.8495 1.00395 16.0813 1.09534 16.0813 1.09534L13.5269 1.11021C13.5269 1.11021 13.3377 1.08471 13.1964 1.16865C13.0593 1.25153 12.9711 1.4428 12.9711 1.4428C12.9711 1.4428 12.5663 2.52025 12.0265 3.4362C10.8885 5.36903 10.4326 5.47104 10.2467 5.35096C9.81421 5.07151 9.92259 4.22676 9.92259 3.62746C9.92259 1.75413 10.2063 0.973138 9.36899 0.771248C9.09059 0.704306 8.88657 0.659678 8.17571 0.65224C7.26402 0.642676 6.49152 0.655427 6.0548 0.869006C5.76366 1.01139 5.53945 1.3291 5.67653 1.34717C5.84548 1.36948 6.22801 1.45024 6.43096 1.72651C6.69341 2.08247 6.68385 2.88366 6.68385 2.88366C6.68385 2.88366 6.83474 5.08851 6.33214 5.36265C5.9868 5.55073 5.51395 5.16714 4.49919 3.41282C3.97959 2.51494 3.58644 1.52143 3.58644 1.52143C3.58644 1.52143 3.51099 1.33654 3.37605 1.23772C3.21241 1.11765 2.98289 1.0794 2.98289 1.0794L0.55384 1.09427C0.55384 1.09427 0.189376 1.1049 0.0554913 1.26322C-0.0635174 1.40455 0.0459281 1.69569 0.0459281 1.69569C0.0459281 1.69569 1.94794 6.14471 4.10072 8.38781C6.07606 10.4439 8.3181 10.309 8.3181 10.309H9.33392C9.33392 10.309 9.64101 10.275 9.7972 10.106C9.94171 9.95087 9.9364 9.65972 9.9364 9.65972C9.9364 9.65972 9.91621 8.29643 10.5495 8.0956C11.1732 7.89797 11.9744 9.4132 12.8234 9.99656C13.4652 10.4375 13.9529 10.3408 13.9529 10.3408L16.2237 10.309C16.2237 10.309 17.4116 10.2356 16.8485 9.30163Z" />
      </svg>
   );
};

const SvgDiscord = () => {
   return (
      <svg
         className={styles.discord}
         width="20"
         height="20"
         viewBox="0 0 22 17"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path d="M18.4527 1.3833C17.0337 0.735569 15.5268 0.263486 13.9539 0C13.7559 0.34034 13.5359 0.801437 13.3819 1.16374C11.7089 0.9222 10.048 0.9222 8.39804 1.16374C8.24404 0.801437 8.01304 0.34034 7.82604 0C6.24215 0.263486 4.73522 0.735569 3.32619 1.3833C0.47733 5.57713 -0.292636 9.67215 0.092346 13.7123C1.98425 15.0846 3.81018 15.919 5.60419 16.468C6.04417 15.8751 6.44016 15.2383 6.78115 14.5686C6.13217 14.3271 5.5162 14.0307 4.92223 13.6793C5.07622 13.5696 5.23022 13.4488 5.37322 13.3281C8.95904 14.9639 12.843 14.9639 16.3847 13.3281C16.5387 13.4488 16.6817 13.5696 16.8357 13.6793C16.2417 14.0307 15.6258 14.3271 14.9768 14.5686C15.3178 15.2383 15.7138 15.8751 16.1537 16.468C17.9467 15.919 19.7836 15.0846 21.6656 13.7123C22.1385 9.03543 20.9165 4.97335 18.4527 1.3833ZM7.27611 11.2201C6.19815 11.2201 5.31819 10.2431 5.31819 9.04641C5.31819 7.84975 6.17615 6.8726 7.27611 6.8726C8.36504 6.8726 9.25597 7.84975 9.23397 9.04641C9.23397 10.2431 8.36504 11.2201 7.27611 11.2201ZM14.5039 11.2201C13.4259 11.2201 12.5448 10.2431 12.5448 9.04641C12.5448 7.84975 13.4039 6.8726 14.5039 6.8726C15.5928 6.8726 16.4837 7.84975 16.4617 9.04641C16.4617 10.2431 15.6038 11.2201 14.5039 11.2201Z" />
      </svg>
   );
};

const SvgTelegram = () => {
   return (
      <svg
         className={styles.telegram}
         width="20"
         height="20"
         viewBox="0 0 67 67"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path d="M66.9999 6.6071L56.4029 60.0344C56.4029 60.0344 54.9216 63.739 50.8453 61.9606L26.2817 43.1601C29.5833 40.1922 55.1964 17.1648 56.3166 16.1206C58.0478 14.5045 56.9735 13.5426 54.9609 14.7649L17.1281 38.7907L2.53205 33.8769C2.53205 33.8769 0.234159 33.0616 0.0130071 31.2833C-0.209454 29.5049 2.60664 28.5418 2.60664 28.5418L62.1097 5.19905C62.1097 5.19905 66.9999 3.05034 66.9999 6.6071V6.6071Z" />
      </svg>
   );
};

const SvgYoutube = () => {
   return (
      <svg
         className={styles.youtube}
         width="20"
         height="20"
         viewBox="0 0 17 13"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path d="M16.556 1.93408C16.3622 1.21338 15.794 0.645256 15.0734 0.451193C13.7569 0.0909958 8.49102 0.0909958 8.49102 0.0909958C8.49102 0.0909958 3.22534 0.0909958 1.9089 0.437537C1.20216 0.631395 0.620069 1.21348 0.426212 1.93408C0.0797729 3.25042 0.0797729 5.98035 0.0797729 5.98035C0.0797729 5.98035 0.0797729 8.72403 0.426212 10.0266C0.620275 10.7472 1.18829 11.3153 1.909 11.5094C3.2392 11.8697 8.49123 11.8697 8.49123 11.8697C8.49123 11.8697 13.7569 11.8697 15.0734 11.5232C15.7941 11.3292 16.3622 10.7611 16.5562 10.0405C16.9026 8.72403 16.9026 5.99421 16.9026 5.99421C16.9026 5.99421 16.9164 3.25042 16.556 1.93408ZM6.81448 8.50235V3.45835L11.1933 5.98035L6.81448 8.50235Z" />
      </svg>
   );
};

export default Footer;
