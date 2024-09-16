export const PagingList = ({ previewsPage , nextPage ,totalPages,setPage,page }) => {
  return (
    <ul className='paging-list'>
      <li
        onClick={() => previewsPage()}
        className='paging-list__item paging-prev'
      >
        <button className='paging-list__link'>
          <i className='icon-arrow'></i>
        </button>
      </li>

      {[...Array(totalPages)].map((x, i) => (
        <li
          key={i}
          onClick={() => setPage(i + 1)}
          className={`paging-list__item ${
            page === i + 1 && 'active'
          }`}
        >
          <button className='paging-list__link'>{i + 1}</button>
        </li>
      ))}

      <li
        onClick={() => nextPage()}
        className='paging-list__item paging-next'
      >
        <button className='paging-list__link'>
          <i className='icon-arrow'></i>
        </button>
      </li>
    </ul>
  );
};
