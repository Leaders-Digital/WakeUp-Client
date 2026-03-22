import { useState, useEffect } from "react";
import Link from "next/link";
import eventsData from "data/events/events.json";

export const EventHighlights = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setActiveVideo(null);
    };
    if (activeVideo) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [activeVideo]);

  return (
    <section className="event-highlights">
      <div className="wrapper">
        <div className="event-highlights__header">
          <h4 className="event-highlights__title">Nos Événements</h4>
          <Link href="/event">
            <a className="event-highlights__link">Voir tout</a>
          </Link>
        </div>
        <div className="event-highlights__list">
          {eventsData.map((event) => (
            <a
              key={event.id}
              href={`https://www.youtube.com/watch?v=${event.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="event-highlights__item"
              onClick={(e) => {
                e.preventDefault();
                setActiveVideo(event);
              }}
            >
              <div className="event-highlights__circle">
                <div className="event-highlights__circle-inner">
                  <img
                    src={`https://img.youtube.com/vi/${event.videoId}/hqdefault.jpg`}
                    alt={event.title}
                    className="event-highlights__thumb"
                    draggable={false}
                  />
                </div>
              </div>
              <span className="event-highlights__label">{event.year}</span>
            </a>
          ))}
        </div>
      </div>

      {activeVideo && (
        <div
          className="event-highlights__modal-overlay"
          onClick={() => setActiveVideo(null)}
          role="button"
          tabIndex={0}
          aria-label="Fermer la vidéo"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setActiveVideo(null);
            }
          }}
        >
          <div
            className="event-highlights__modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h5 className="event-highlights__modal-title">{activeVideo.title}</h5>
            <div className="event-highlights__modal-video">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
