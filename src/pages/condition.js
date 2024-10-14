// import Packs from 'components/Packs/Packs';

import ConditionPage from "components/Condition/ConditionPage";
import { PublicLayout } from "layout/PublicLayout";

const breadcrumbsData = [
  {
    label: "Acceuil",
    path: "/",
  },
  {
    label: "Conditions d'utilisation",
    path: "/conditions",
  },
];
const Condition = () => {
  return (
    <PublicLayout
      breadcrumb={breadcrumbsData}
      breadcrumbTitle="Conditions d'utilisation"
    >
      <ConditionPage />
      {/* <Subscribe /> */}
    </PublicLayout>
  );
};

export default Condition;
