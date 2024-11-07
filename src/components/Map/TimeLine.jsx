import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { SectionTitle } from "../../components/shared/SectionTitle/SectionTitle";

const TimeLine = () => {
  return (
    <div style={{ marginTop: "30px" }}>

      {/* <SectionTitle
        subTitle="Nos Partenaires"
        title="Partenaires de Confiance"
        body="Découvrez nos partenaires de confiance qui partagent notre engagement pour des produits éthiques et durables."
      /> */}

      <VerticalTimeline lineColor="#eee">
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "#eee", color: "black" }}
          contentArrowStyle={{ borderRight: "7px solid #eee" }}
          date="2024"
          iconStyle={{ background: "#eee", color: "#fff" }}
        >
          <h3 className="vertical-timeline-element-title">Wakeup Cosmetics Milano exclusivement en Tunisie
          </h3>
          <p>Soirée de lancement de la marque Wakeup Cosmetics Miliano ! .</p>

          <div style={{ marginTop: "1rem" }}>
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/atLWuquNY80"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="2023"
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
              src="https://www.youtube.com/embed/3N-5eT2oyUI"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </div>
  );
};

export default TimeLine;
