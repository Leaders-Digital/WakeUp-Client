import { MostViewed } from 'components/shared/MostViewed/MostViewed';
import { Wishlist } from 'components/Wishlist/Wishlist';
import { PublicLayout } from 'layout/PublicLayout';

const breadcrumbsData = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'suivi de commande',
    path: '/wishlist',
  },
];
const WishlistPage = () => {
  return (
    <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle='Suivi de commande'>
      <Wishlist />
    </PublicLayout>
  );
};

export default WishlistPage;
