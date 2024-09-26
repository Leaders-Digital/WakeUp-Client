import { Blogs } from './Blogs/Blogs';
import blogData from 'data/blog/blog';
import { usePagination } from 'components/utils/Pagination/Pagination';
import { PagingList } from 'components/shared/PagingList/PagingList';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const Blog = () => {
  const [blogs,setBlogs] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL

  const getBlog = async () => {
    try {
      const res = await axios.get(`${process.env.CURRENT_HOST}api/blog/main`);
      setBlogs(res.data.data);
      console.log(res.data.data);
      
    } catch (error) {
      console.error(error);
      
    }
  }

  useEffect(() => {getBlog()},[]);

  return (
    <>
      {/* <!-- BEGIN BLOG --> */}
      <div className='blog'>
        <div className='wrapper'>
          <Blogs blogs={blogs} />
        </div>

        {/* <!-- PAGINATE LIST --> */}
        {/* <PagingList paginate={paginate} /> */}
      </div>
      {/* <!-- BEGIN EOF --> */}
    </>
  );
};
