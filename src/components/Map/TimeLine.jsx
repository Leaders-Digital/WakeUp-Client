import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const TimeLine = () => {
  return (
    <VerticalTimeline lineColor="#eee">
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentStyle={{ background: "#eee", color: "black" }}
        contentArrowStyle={{ borderRight: "7px solid #eee" }}
        date="2008 - 2010"
        iconStyle={{ background: "#eee", color: "#fff" }}
      >
        <h3 className="vertical-timeline-element-title">Title of Event</h3>
        <p>Brief description of the event.</p>

        <div style={{ marginTop: "1rem" }}>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/v_hSlfiiVYo"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </VerticalTimelineElement>

      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date="2010 - 2011"
        iconStyle={{ background: "#eee", color: "#fff" }}
        contentStyle={{ background: "#eee", color: "black" }}
        contentArrowStyle={{ borderRight: "7px solid #eee" }}
      >
        <h3 className="vertical-timeline-element-title">
          Lancement des produits de beauté Wakeup Cosmetics en Tunisie
        </h3>
        <p>
          Retour à notre récent événement de lancement des produits de beauté
          Wakeup Cosmetics, d'origine italienne 🇮🇹 exclusivement, en Tunisie 🇹🇳
          et en collaboration spéciale avec 𝗟𝗲𝗮𝗱𝗲𝗿𝘀 𝗠𝗮𝗸𝗲𝘂𝗽 ✨
        </p>

        <div style={{ marginTop: "1rem" }}>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/v_hSlfiiVYo"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </VerticalTimelineElement>
    </VerticalTimeline>
  );
};

export default TimeLine;
