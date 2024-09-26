import { Categories } from 'components/Category/Categories/Categories';
import { SectionTitle } from 'components/shared/SectionTitle/SectionTitle';

const categoriesData = [
  
  {
    "categoryId": "makeup",
    "name": "Maquillage",
    "image": "/assets/img/top-categories-img1.jpg"
  },
  {
    "categoryId": "skincare",
    "name": "Produits de soin",
    "image": "/assets/img/top-categories-img2.jpg"
  },
  {
    "categoryId": "Accessoires",
    "name": "Accessoires",
    "image": "/assets/img/top-categories-img3.jpg"
  },
]

export const TopCategories = () => {
  const categories = [...categoriesData].slice(0, 3);
  return (
    <>
      {/* <!-- BEGIN TOP CATEGORIES --> */}
      <section className='top-categories'>
        <SectionTitle
          subTitle='Popular collections'
          title='top categories'
          body='Nourish your skin with toxin-free cosmetic products. With the offers that you can’t refuse.'
        />
        <div className='top-categories__items'>
          {<Categories categories={categories} />}
        </div>
      </section>
      {/* <!-- TOP CATEGORIES EOF   --> */}
    </>
  );
};
