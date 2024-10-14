import MontionPage from "components/Montion/MontionPage";
import { PublicLayout } from "layout/PublicLayout";

const breadcrumbsData = [
  {
    label: "Acceuil",
    path: "/",
  },
  {
    label: "Mentions légales",
    path: "/montion",
  },
];
const Coockies = () => {
  return (
    <PublicLayout
      breadcrumb={breadcrumbsData}
      breadcrumbTitle="Mentions légales"
    >
      <MontionPage />
      {/* <Subscribe /> */}
    </PublicLayout>
  );
};

export default Coockies;
