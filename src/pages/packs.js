// import Packs from 'components/Packs/Packs';
import { Packs } from 'components/Packs/Packs';
import { Subscribe } from 'components/shared/Subscribe/Subscribe';
import { PublicLayout } from 'layout/PublicLayout';

const breadcrumbsData = [
  {
    label: "Page d'accueil",
    path: '/',
  },
  {
    label: 'Nos Pack',
    path: '/Packs',
  },
];
const LoginPage = () => {
  return (
    <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle='Nos Pack'>
      <Packs />
      <Subscribe />
    </PublicLayout>
  );
};

export default LoginPage;
