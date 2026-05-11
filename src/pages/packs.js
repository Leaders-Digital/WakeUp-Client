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
    label: 'Nos Packs',
    path: '/packs',
  },
];
const PacksPage = () => {
  return (
    <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle='Nos Packs'>
      <Packs />
      <Subscribe />
    </PublicLayout>
  );
};

export default PacksPage;
