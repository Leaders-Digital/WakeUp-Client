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
  }
];
const SingleProductPage = () => {
  return (
    <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle='Shop'>
      <ProductDetails /> 
    </PublicLayout>
  );
};

export default SingleProductPage;
