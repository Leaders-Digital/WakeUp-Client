import { PromoVideo } from 'components/shared/PromoVideo/PromoVideo';
import { SectionTitle } from 'components/shared/SectionTitle/SectionTitle';
import { useState } from 'react';
import PromoNumberData from 'data/promoNumber/promoNumber';
import Slider from 'react-slick';
import {
  SlickArrowPrev,
  SlickArrowNext,
} from 'components/utils/SlickArrows/SlickArrows';

export const AboutPromo = () => {
  const [playingVideos, setPlayingVideos] = useState({});

  const promoNumber = [...PromoNumberData];
  
  const videos = [
    {
      id: 1,
      url: 'https://www.youtube.com/embed/atLWuquNY80',
      image: '/assets/img/promo-video-img.jpg',
    },
    {
      id: 2,
      url: 'https://www.youtube.com/embed/bgbnCCWmBRE',
      image: '/assets/img/promo-video-img.jpg',
    },
  ];

  const handleVideoPlay = (videoId) => {
    setPlayingVideos((prev) => ({
      ...prev,
      [videoId]: true,
    }));
  };

  const settings = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <SlickArrowPrev />,
    nextArrow: <SlickArrowNext />,
    lazyLoad: false,
  };

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
            <Slider {...settings}>
              {videos.map((video) => {
                const isPlaying = playingVideos[video.id] || false;
                return (
                  <div key={video.id} style={{ position: 'relative', width: '100%', height: '550px' }}>
                    <PromoVideo
                      videoUrl={isPlaying ? video.url : ''}
                      play={isPlaying}
                      onVideoPlay={() => handleVideoPlay(video.id)}
                      image={video.image}
                    />
                  </div>
                );
              })}
            </Slider>
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
