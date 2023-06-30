import { IFullUser } from '@/app/interfaces';
import { createContext } from 'react';

interface IUserContext {
   user: IFullUser | null;
   setUser: (user: IFullUser) => void;
}

const defaultState = {
   user: null,
   setUser: () => {},
};

export const UserContext = createContext<IUserContext>(defaultState);
