import TimeLine from "components/Map/TimeLine";
import { PublicLayout } from "layout/PublicLayout";
import { Suspense } from "react";

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
      <Suspense fallback={<div>Loading...</div>}>
        <TimeLine />
      </Suspense>
    </PublicLayout>
  );
};

export default Events;
