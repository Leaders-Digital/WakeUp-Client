import { Login } from 'components/Login/Login';
import { Subscribe } from 'components/shared/Subscribe/Subscribe';
import Payment from 'components/success/Payment';
import { PublicLayout } from 'layout/PublicLayout';

const breadcrumbsData = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Paiement',
    path: '/login',
  },
];
const Success = () => {
  return (
    <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle='Paiement'>
      <Payment />
      <Subscribe />
    </PublicLayout>
  );
};

export default Success;
