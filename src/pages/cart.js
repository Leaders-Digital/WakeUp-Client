import { Cart } from 'components/Cart/Cart';
import { PublicLayout } from 'layout/PublicLayout';

const breadcrumbsData = [
  {
    label: "Page d'accueil",
    path: '/',
  },
  {
    label: 'Panier',
    path: '/cart',
  },
];
const CartPage = () => {
  return (
    <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle='Panier'>
      <Cart />
    </PublicLayout>
  );
};

export default CartPage;
