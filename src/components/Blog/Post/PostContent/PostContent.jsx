import Link from "next/link";

export const PostContent = ({ blog }) => {
  // Convert createdAt to a Date object and format it
  const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <div className="post-top">
        <h2>{blog.title}</h2>
        <p>{blog.description}</p>
        <img
          src={`${process.env.NEXT_PUBLIC_API_KEY}${blog.blogImage}`}
          className="js-img"
          alt={blog.title}
        />
        <ul className="post-top__info">
          <li className="post-top__date">
            <i className="icon-date"></i>
            {formattedDate}
          </li>
          <li className="post-top__user"></li>
          <li className="post-top__watch">
            <i className="icon-eye"></i>
            {blog.views}
          </li>
          <li className="post-top__comment"></li>
        </ul>
      </div>
      <div className="post-content">
        <p>{blog.content}</p>
      </div>
    </>
  );
};
