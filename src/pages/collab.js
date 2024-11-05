import Partnaire from "components/Partenaire/Partenaire";
import { PublicLayout } from "layout/PublicLayout";

const breadcrumbsData = [
  {
    label: "Page d'accueil",
    path: "/",
  },
  {
    label: "Retrouvez-nous",
    path: "/collab",
  },
];
const Collab = () => {
  return (
    <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Retrouvez-nous">
      <Partnaire />
    </PublicLayout>
  );
};

export default Collab;
