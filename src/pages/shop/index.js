import { Subscribe } from 'components/shared/Subscribe/Subscribe';
import { Shop } from 'components/Shop/Shop';
import { PublicLayout } from 'layout/PublicLayout';

const breadcrumbsData = [
  {
    label: 'Accueil',
    path: '/',
  },
  {
    label: 'Nos Produits',
    path: '/shop',
  },
];
const ShopPage = () => {
  return (
    <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle='Nos Produits'>
      <Shop />
      <Subscribe />
    </PublicLayout>
  );
};

export default ShopPage;
