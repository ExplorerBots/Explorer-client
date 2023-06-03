import { ICreateBotFields } from '@/app/interfaces';
import { ChangeEvent, FC, PropsWithChildren } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import styles from '../styles.module.scss';

interface Props {
   type: string;
   value: string;
   onChange: (e: string) => void;
   placeholder: string;
   register: UseFormRegister<ICreateBotFields>;
   errors: FieldErrors<ICreateBotFields>;
}

const InputField: FC<PropsWithChildren<Props>> = ({
   type,
   value,
   onChange,
   placeholder,
   register,
   errors,
}) => {
   return (
      <div className={styles.input_field}>
         <input
            {...register('username', {
               required: 'Обязательное поле',
               minLength: {
                  value: 3,
                  message: 'Минимум 3 символа',
               },
               maxLength: {
                  value: 16,
                  message: 'Максимум 16 символов',
               },
            })}
            type={type}
            className={styles.input}
            value={value || ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
               onChange(e.target.value)
            }
            style={errors.username && { border: '1px solid #f75c48' }}
            placeholder={placeholder}
         />
         <p className={styles.input_error}>{errors.username?.message}</p>
      </div>
   );
};

export default InputField;
