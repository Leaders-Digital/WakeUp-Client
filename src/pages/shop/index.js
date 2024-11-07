import { Subscribe } from 'components/shared/Subscribe/Subscribe';
import { Shop } from 'components/Shop/Shop';
import { PublicLayout } from 'layout/PublicLayout';
import { useState } from 'react';

const breadcrumbsData = [
  {
    label: "Page d'accueil",
    path: '/',
  },
  {
    label: 'Nos Produits',
    path: '/shop',
  },
];
const ShopPage = () => {
  const [title, setTitle] = useState('Nos Produits');
  return (
    <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle={title}>
      <Shop  setTitle={setTitle}/>
    <Subscribe /> 
    </PublicLayout>
  );
};

export default ShopPage;
