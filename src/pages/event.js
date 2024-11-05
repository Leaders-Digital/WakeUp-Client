import Event from "components/Events/Event";
import TimeLine from "components/Map/TimeLine";
import Partnaire from "components/Partenaire/Partenaire";
import { PublicLayout } from "layout/PublicLayout";

const breadcrumbsData = [
  {
    label: "Page d'accueil",
    path: "/",
  },
  {
    label: "Nos Événements",
    path: "/event",
  },
];
const Events = () => {
  return (
    <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Nos Événements">
      <TimeLine />
    </PublicLayout>
  );
};

export default Events;
