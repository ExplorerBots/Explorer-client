import ControlPanelInitalScreen from '@/app/components/screens/control-panel/initial';
import { BotsProvider } from '@/app/context/BotsContext';
import { withAuth } from '@/app/hoc/withAuth';
import { FC } from 'react';

const ControlPanelPage: FC = () => {
   return (
      <>
         <BotsProvider>
            <ControlPanelInitalScreen />
         </BotsProvider>
      </>
   );
};

export default withAuth(ControlPanelPage);
