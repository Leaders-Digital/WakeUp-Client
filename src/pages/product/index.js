import ProductDetails from "components/Product/ProductDetails/ProductDetails";
import { PublicLayout } from "layout/PublicLayout";




const breadcrumbsData = [
  {
    label: "Page d'accueil",
    path: '/',
  },
  {
    label: 'Shop',
    path: '/shop',
  },
  {
    label: 'Product',
    path: '/product',
  },
];
const ProductPage = () => {
  return (
    <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle='Shop'>
      <ProductDetails/>
    </PublicLayout>
  );
};

export default ProductPage;
