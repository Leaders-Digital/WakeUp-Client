import blogData from 'data/blog/blog';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { PostComment } from './PostComment/PostComment';
import { PostContent } from './PostContent/PostContent';
import axios from 'axios';

export const Post = () => {
  const router = useRouter();
  const [blog, setBlog] = useState(null);

  const getblogById = async()=>{
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}api/blog/get/article/${router.query.id}`);
      setBlog(res.data.data);
      
    } catch (error) {
      console.log(error);
      
      
    }

  }
  console.log(blog);
  
  useEffect(() => {
    getblogById();
  }, [router.query.id]);

  if (!blog) return <></>;

  return (
    <>
      {/* <!-- BEGIN POST --> */}
      <div className='post'>
        <div className='wrapper'>
          <PostContent blog={blog} />
          {/* <PostComment blog={blog} /> */}
        </div>
        {/* <img
          className='promo-video__decor js-img'
          src='/assets/img/promo-video__decor.jpg'
          alt=''
        /> */}
      </div>
      {/* <!-- POST EOF   --> */}
    </>
  );
};
