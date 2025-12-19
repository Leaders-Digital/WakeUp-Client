export const PromoVideo = ({ play, videoUrl, onVideoPlay, image }) => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <img src={image} className='js-img' alt='' />
      <iframe
        autoPlay
        src={videoUrl}
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope'
      ></iframe>
      {!play && (
        <>
          <div 
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              backgroundColor: 'rgba(34, 34, 34, 0.2)', 
              zIndex: 2 
            }}
          />
          <div 
            onClick={onVideoPlay} 
            className='info-blocks__item-img-play' 
            style={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)', 
              zIndex: 10, 
              cursor: 'pointer' 
            }}
          >
            <img src='/assets/img/play-btn.png' className='js-img' alt='' />
          </div>
        </>
      )}
    </div>
  );
};
