import { Categories } from 'components/Category/Categories/Categories';
import { SectionTitle } from 'components/shared/SectionTitle/SectionTitle';

const categoriesData = [
  
  {
    "categoryId": "makeup",
    "name": "Maquillage",
    "image": "/assets/img/makeupp1.jpg"
  },
  {
    "categoryId": "skincare",
    "name": "Produits de soin",
    "image": "/assets/img/skincase2.jpg"
  },
  {
    "categoryId": "Accessoires",
    "name": "Accessoires",
    "image": "/assets/img/assces.jpg"
  },
]

export const TopCategories = () => {
  const categories = [...categoriesData].slice(0, 3);
  return (
    <>
      {/* <!-- BEGIN TOP CATEGORIES --> */}
      <section className='top-categories'>
        <SectionTitle
          subTitle='Collections populaires'
          title='Catégories principales'
          body='Prenez soin de votre peau avec des produits cosmétiques sans toxines. Profitez des offres irrésistibles .'
        />
        <div className='top-categories__items'>
          {<Categories categories={categories} />}
        </div>
      </section>
      {/* <!-- TOP CATEGORIES EOF   --> */}
    </>
  );
};
