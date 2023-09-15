'use client'
import { IItem } from '@/interfaces';
import { createContext } from 'react';

interface IItemsContext {
   items: (IItem | null)[];
   setItems: (items: IItem[]) => void;
}

const defaultState = {
   items: [],
   setItems: () => {},
};

export const ItemsContext = createContext<IItemsContext>(defaultState);
