import { IControlSideBarItem } from '@/app/interfaces';

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
      src: '/controlSidebar/mouse-pointer.svg',
      text: 'Автокликер',
   },
   { id: 4, src: '/controlSidebar/droplet.svg', text: 'Авто-еда' },
   { id: 5, src: '/controlSidebar/book.svg', text: 'Чаровник' },
];
