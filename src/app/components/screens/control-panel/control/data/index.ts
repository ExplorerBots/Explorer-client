import {
   IBotMacrosConstructorBlock,
   IControlSideBarItem,
} from '@/app/interfaces';

export const tabs: IControlSideBarItem[] = [
   {
      divider: true,
      id: 1,
      src: '/controlSidebar/message-circle.svg',
      text: 'Чат',
   },
   {
      id: 2,
      src: '/controlSidebar/package.svg',
      text: 'Инвентарь',
   },
   {
      divider: true,
      id: 3,
      src: '/controlSidebar/sliders.svg',
      text: 'Макросы',
   },
   {
      id: 4,
      src: '/controlSidebar/clock.svg',
      text: 'Таймеры',
   },
   {
      id: 5,
      src: '/controlSidebar/sliders.svg',
      text: 'Авто-выход',
   },

   {
      id: 6,
      src: '/controlSidebar/mouse-pointer.svg',
      text: 'Автокликер',
   },
   { id: 7, src: '/controlSidebar/droplet.svg', text: 'Авто-еда' },
   { id: 8, src: '/controlSidebar/book.svg', text: 'Трейдер' },
];

export const blocksConstructor: IBotMacrosConstructorBlock[] = [
   {
      blockType: 'action',
      action: 'wait',
      value: '1000',
      secondValue: 'ms',
      title: 'Ждать',
   },
   {
      blockType: 'action',
      action: 'message',
      value: '',
      title: 'Сообщение в чат',
   },
   {
      blockType: 'action',
      action: 'use-item',
      value: '',
      title: 'Активировать предмет',
   },
   {
      blockType: 'action',
      action: 'set-quick-bar-slot',
      value: '1',
      title: 'Выбрать слот хотбара',
   },
   {
      blockType: 'action',
      action: 'click-window',
      value: '',
      secondValue: '0',
      title: 'Клик по окну',
   },
   {
      blockType: 'action',
      action: 'timer',
      value: 'true',
      title: 'Таймер',
   },
   {
      blockType: 'action',
      action: 'autoclicker',
      value: 'true',
      title: 'Автокликер',
   },
   {
      blockType: 'action',
      action: 'auto-eat',
      value: 'true',
      title: 'Авто-еда',
   },
];

export const activeActions = [
   // {
   //    id: 1,
   //    actionType: 'wait',
   //    value: 3000,
   //    valueType: 'ms',
   // },
   // {
   //    id: 2,
   //    actionType: 'message',
   //    value: '/anarchy 21',
   // },
];
