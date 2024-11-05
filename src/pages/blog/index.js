import { Blog } from 'components/Blog/Blog';
import { Subscribe } from 'components/shared/Subscribe/Subscribe';
import { PublicLayout } from 'layout/PublicLayout';

const breadcrumbsData = [
  {
    label: "Page d'accueil",
    path: '/',
  },
  {
    label: 'Blog',
    path: '/blog',
  },
];
const BlogPage = () => {
  return (
    <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle='Blog'>
      <Blog />
      {/* <Subscribe /> */}
    </PublicLayout>
  );
};

export default BlogPage;
