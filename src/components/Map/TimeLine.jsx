import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import eventsData from "data/events/events.json";

const TimeLine = () => {
  return (
    <div style={{ marginTop: "30px" }}>
      <VerticalTimeline lineColor="#eee">
        {eventsData.map((event) => (
          <VerticalTimelineElement
            key={event.id}
            className="vertical-timeline-element--work"
            contentStyle={{ background: "#eee", color: "black" }}
            contentArrowStyle={{ borderRight: "7px solid #eee" }}
            date={event.year}
            iconStyle={{ background: "#eee", color: "#fff" }}
          >
            <h3 className="vertical-timeline-element-title">{event.title}</h3>
            <p>{event.description}</p>

            <div style={{ marginTop: "1rem" }}>
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${event.videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default TimeLine;
