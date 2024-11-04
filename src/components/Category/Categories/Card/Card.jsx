import Link from 'next/link';

export const Card = ({ category }) => {
  const { name, image } = category;
  return (
    <Link href={`/shop?category=${encodeURIComponent(name)}`}>
      <a className='top-categories__item'>
        <img src={image} className='js-img' alt='' />
        <div className='top-categories__item-hover'>
          <h5 style={{padding:"10px 40px",border:"2px solid white",color:"white"}}>{name}</h5>
          <span>Parcourir les produits -</span>
          <i className='icon-arrow-lg'></i>
        </div>
      </a>
    </Link>
  );
};
