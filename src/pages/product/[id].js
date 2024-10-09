import ProductDetails from 'components/Product/ProductDetails/ProductDetails';

const { PublicLayout } = require('layout/PublicLayout');

const breadcrumbsData = [
  {
    label: 'Home',
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
      {/* <MostViewed additionalClass='product-viewed' /> */}
    </PublicLayout>
  );
};

export default SingleProductPage;
