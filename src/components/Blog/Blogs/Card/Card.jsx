import Link from 'next/link';
import { getImageUrl } from 'utils/imageUrl';

export const Card = ({ blog }) => {
  const { title, _id, blogImage, content, description, createdAt } = blog;

  // Convert createdAt to a Date object
  const date = new Date(createdAt);
  const day = date.getDate(); // Extract day
  const month = date.toLocaleString('default', { month: 'short' }); // Extract month name

  return (
    <div className='blog-item'>
      <Link href={`/blog/${_id}`}>
        <a className='blog-item__img'>
          <img src={getImageUrl(blogImage)} className='js-img' alt={title} />
          <span className='blog-item__date'>
            <span>{day}</span> {month}
          </span>
        </a>
      </Link>
      <Link href={`/blog/${_id}`}>
        <a className='blog-item__title'>{title}</a>
      </Link>
      <p>{description}</p>
      <Link href={`/blog/${_id}`}>
        <a className='blog-item__link'>
          Read more <i className='icon-arrow-md'></i>
        </a>
      </Link>
    </div>
  );
};
