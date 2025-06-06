import { PromoVideo } from 'components/shared/PromoVideo/PromoVideo';
import { SectionTitle } from 'components/shared/SectionTitle/SectionTitle';
import { useState } from 'react';
import PromoNumberData from 'data/promoNumber/promoNumber';

export const AboutPromo = () => {
  const [play, setPlay] = useState(false);

  const promoNumber = [...PromoNumberData];
  const url = play
    ? 'https://www.youtube.com/embed/atLWuquNY80'
    : '';
  return (
    <>
      {/* <!-- BEGIN PROMO VIDEO --> */}
      <section className='promo-video'>
        <div className='wrapper'>
          <SectionTitle
            title='Bienvenue chez WakeUp'
            subTitle='Vidéo promotionnelle'
            body={`Aujourd'hui, nous pouvons offrir à nos clients des produits exclusifs   "uniquement chez WakeUp"`}
          />

          <div className='promo-video__block'>
            <PromoVideo
              videoUrl={url}
              play={play}
              onVideoPlay={() => setPlay(true)}
              image='/assets/img/promo-video-img.jpg'
            />
          </div>

        </div>
        <img
          className='promo-video__decor js-img'
          src='/assets/img/promo-video__decor.jpg'
          alt=''
        />
      </section>
      {/* <!-- PROMO VIDEO EOF   --> */}
    </>
  );
};
