import { useRouter } from 'next/router';
import {
   createContext,
   FC,
   PropsWithChildren,
   ReactNode,
   useEffect,
   useState,
} from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';
import { IUser } from '../interfaces';

interface IUserContext {
   user: IUser | null;
   isLoggedIn: boolean;
   isLoading: boolean;
   setUser: (user: IUser | null) => void;
   setIsLoggedIn: (b: boolean) => void;
}

const initialValue: IUserContext = {
   user: null,
   isLoggedIn: false,
   isLoading: true,
   setUser: () => {},
   setIsLoggedIn: () => {},
};

export const UserContext = createContext<IUserContext>(initialValue);

export const UserContextProvider: FC<
   PropsWithChildren<{ children: ReactNode }>
> = ({ children }) => {
   const [user, setUser] = useState<IUserContext['user']>(null);
   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

   const router = useRouter();
   const { update, ErrorUpdate, loadingUpdate: isLoading } = useAuth();

   const updateUser = async () => {
      const response = await update().catch((err) => {
         toast.error('Ошибка авторизации', err);
         return;
      });

      if (ErrorUpdate) {
         return;
      }

      setUser(response as IUser);
      setIsLoggedIn(true);
   };

   useEffect(() => {
      updateUser();
   }, []);

   return (
      <UserContext.Provider
         value={{ user, isLoggedIn, isLoading, setUser, setIsLoggedIn }}
      >
         {children}
      </UserContext.Provider>
   );
};
