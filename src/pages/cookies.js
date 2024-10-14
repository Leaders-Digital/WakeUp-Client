// import Packs from 'components/Packs/Packs';

import CookiesPage from "components/Cookies/CookiesPage";
import LivraisonPage from "components/Livraison/LivraisonPage";
import { PublicLayout } from "layout/PublicLayout";

const breadcrumbsData = [
  {
    label: "Acceuil",
    path: "/",
  },
  {
    label: "Politique de cookies",
    path: "/cookies",
  },
];
const Coockies = () => {
  return (
    <PublicLayout
      breadcrumb={breadcrumbsData}
      breadcrumbTitle="Politique de cookies"
    >
      <CookiesPage />
      {/* <Subscribe /> */}
    </PublicLayout>
  );
};

export default Coockies;
