// import Packs from 'components/Packs/Packs';

import LivraisonPage from "components/Livraison/LivraisonPage";
import { PublicLayout } from "layout/PublicLayout";

const breadcrumbsData = [
  {
    label: "Acceuil",
    path: "/",
  },
  {
    label: "Détails de livraison",
    path: "/policy",
  },
];
const Livraison = () => {
  return (
    <PublicLayout
      breadcrumb={breadcrumbsData}
      breadcrumbTitle="Détails de livraison"
    >
      <LivraisonPage />
      {/* <Subscribe /> */}
    </PublicLayout>
  );
};

export default Livraison;
