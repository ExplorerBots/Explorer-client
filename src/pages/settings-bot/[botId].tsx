import BotSettingsScreen from '@/app/components/screens/control-panel/settings';
import { withAuth } from '@/app/hoc/withAuth';

const BotSettingsPage = () => {
   return <BotSettingsScreen />;
};
export default withAuth(BotSettingsPage);
