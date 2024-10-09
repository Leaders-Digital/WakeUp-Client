// import Packs from 'components/Packs/Packs';
import Policy from "components/Policy/Policy";
import { Subscribe } from "components/shared/Subscribe/Subscribe";
import { PublicLayout } from "layout/PublicLayout";

const breadcrumbsData = [
  {
    label: "Acceuil",
    path: "/",
  },
  {
    label: "Politique de confidentialité",
    path: "/policy",
  },
];
const PolicyPage = () => {
  return (
    <PublicLayout
      breadcrumb={breadcrumbsData}
      breadcrumbTitle="Politique de confidentialité"
    >
      <Policy />
      <Subscribe />
    </PublicLayout>
  );
};

export default PolicyPage;
