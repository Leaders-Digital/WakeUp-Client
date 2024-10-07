// import Packs from 'components/Packs/Packs';
import Catalogue from 'components/Catalogue/Catalogue';
import { Subscribe } from 'components/shared/Subscribe/Subscribe';
import { PublicLayout } from 'layout/PublicLayout';

const breadcrumbsData = [
  {
    label: 'Acceuil',
    path: '/',
  },
  {
    label: 'E-Catalogue',
    path: '/catalogue',
  },
];
const LoginPage = () => {
  return (
    <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle='E-Catalogue'>
      <Catalogue/>
      <Subscribe />
    </PublicLayout>
  );
};

export default LoginPage;
