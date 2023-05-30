import CreateBotScreen from '@/app/components/screens/create-bot';
import { withAuth } from '@/app/hoc/withAuth';
import { FC } from 'react';

const CreateBotPage: FC = () => {
   return <CreateBotScreen />;
};

export default withAuth(CreateBotScreen);
