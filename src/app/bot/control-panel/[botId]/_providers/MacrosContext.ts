'use client'
import { IBotMacros } from '@/interfaces';
import { createContext } from 'react';

export interface IMacrosContext {
   editableMacros: IBotMacros | null;
   setEditableMacros: (macros: IBotMacros | null) => void;
   showUpdate: boolean;
   setShowUpdate: (b: boolean) => void;
   macrosesLimit: number;
   blocksLimit: number;
}

const defaultValue: IMacrosContext = {
   editableMacros: null,
   setEditableMacros: () => {},
   showUpdate: false,
   setShowUpdate: () => {},
   macrosesLimit: 0,
   blocksLimit: 0,
};

export const MacrosContext = createContext<IMacrosContext>(defaultValue);
