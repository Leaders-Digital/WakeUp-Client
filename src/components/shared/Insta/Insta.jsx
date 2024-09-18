import { Card } from './Card/Card';

const instaData = [
  {
    image: '/assets/img/7.jpg',
    link: 'https://www.instagram.com/p/Cydr8WtsA4h/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    id: '1',
  },
  {
    image: '/assets/img/3.jpg',
    link: 'https://www.instagram.com/p/C3uWGogtWFB/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    id: '2',
  },
  {
    image: '/assets/img/4.jpg',
    link: 'https://www.instagram.com/p/C35bRCvNNza/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    id: '3',
  },
  {
    image: '/assets/img/5.jpg',
    link: 'https://www.instagram.com/p/C4GNanzt9SM/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    id: '4',
  },
  {
    image: '/assets/img/6.jpg',
    link: 'https://www.instagram.com/p/C4GJZdkNOeb/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    id: '5',
  },
  {
    image: '/assets/img/image.jpg',
    link: 'https://www.instagram.com/p/C3kv5ICtXQe/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    id: '6',
  },
];

export const Insta = () => {
  return (
    <>
      {/* <!-- BEGIN INSTA PHOTOS --> */}
      <div className='insta-photos'>
        {instaData.map((insta) => (
          <Card key={insta.id} insta={insta} />
        ))}
      </div>
      {/* <!-- INSTA PHOTOS EOF   --> */}
    </>
  );
};
