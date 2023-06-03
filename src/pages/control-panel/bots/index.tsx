import ControlPanelInitalScreen from '@/app/components/screens/control-panel/initial';
import { withAuth } from '@/app/hoc/withAuth';
import { FC, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
export const socket: Socket = io('http://192.168.1.212:8080', {
   auth: {
      token:
         typeof window !== 'undefined'
            ? window.localStorage.getItem('authToken')
            : null,
   },
});

const ControlPanelPage: FC = () => {
   useEffect(() => {
      return () => {
         socket.disconnect();
      };
   }, []);
   return <ControlPanelInitalScreen />;
};

export default withAuth(ControlPanelPage);
