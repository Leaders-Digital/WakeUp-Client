
import { PublicLayout } from "layout/PublicLayout";
import dynamic from "next/dynamic";

const Partnaire = dynamic(() => import("components/Partenaire/Partenaire"), {
  suspense: true,
});

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
