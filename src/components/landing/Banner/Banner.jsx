import Link from 'next/link';

export const Banner = () => {
  return (
    <>
      {/* <!-- BEGIN MAIN BLOCK --> */}
      <div className='main-block load-bg'>
        <div className='wrapper'>
          <div className='main-block__content'>
            <span className='saint-text'>Professionnel</span>
            <h1 className='main-text'>Beauté &amp; Soin</h1>
            <p>
              Nourrissez votre peau avec des produits cosmétiques sans toxines. 
              Avec des offres que vous ne pouvez pas refuser.
            </p>

            <Link href='/shop'>
              <a className='btn'>Achetez maintenant</a>
            </Link>
          </div>
        </div>
        <img
          className='main-block__decor'
          src='/assets/img/main-block-decor.png'
          alt=''
        />
      </div>
      {/* <!-- MAIN BLOCK EOF --> */}
    </>
  );
};
