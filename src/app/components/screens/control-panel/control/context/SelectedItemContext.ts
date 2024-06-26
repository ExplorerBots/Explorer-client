import { IItem } from '@/app/interfaces';
import { createContext } from 'react';

interface ISelectedItemContext {
   selectedItem: IItem | null;
   setSelectedItem: (selectedItem: IItem) => void;
}

const defaultState = {
   selectedItem: null,
   setSelectedItem: () => {},
};

export const SelectedItemContext =
   createContext<ISelectedItemContext>(defaultState);
