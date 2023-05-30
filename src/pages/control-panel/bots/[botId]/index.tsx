import BotControlScreen from '@/app/components/screens/control-panel/control';
import { withAuth } from '@/app/hoc/withAuth';

const BotControlPage = () => {
   return <BotControlScreen />;
};
export default withAuth(BotControlPage);
