import { FC, PropsWithChildren } from 'react';
import styles from '../styles.module.scss';

const InputError: FC<PropsWithChildren<{ message: string | undefined }>> = ({
   message,
}) => {
   return <p className={styles.input_error}>{message}</p>;
};

export default InputError;
