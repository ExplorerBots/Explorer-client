'use client'
import { IPartner } from '@/interfaces';
import { createContext } from 'react';

interface IPartnerContext {
   partner: IPartner | null;
   setPartner: (partner: IPartner) => void;
}

const defaultState = {
   partner: null,
   setPartner: () => {},
};

export const PartnerContext = createContext<IPartnerContext>(defaultState);
