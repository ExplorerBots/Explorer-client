import { BotsContainer } from '@/components/screens/bot/control-panel/BotsContainer';
import { FC } from 'react';
import { BotsProvider } from './BotsProvider';

const ControlPanelPage: FC = () => {
   return (
      <>
         <BotsProvider>
            <BotsContainer />
         </BotsProvider>
      </>
   );
};

export default ControlPanelPage;
