'use client';
import { IBotTimer } from '@/interfaces';
import { createContext } from 'react';

export interface ITimersContext {
   timers: IBotTimer[] | null;
   setTimers: (timers: IBotTimer[] | null) => void;
   enableTimers: IBotTimer[];
   setEnableTimers: (t: IBotTimer[]) => void;
}

const defaultValue = {
   timers: null,
   setTimers: () => {},
   enableTimers: [],
   setEnableTimers: () => {},
};

export const TimersContext = createContext<ITimersContext>(defaultValue);
