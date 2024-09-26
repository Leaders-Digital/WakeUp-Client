import { Advantage } from "components/shared/Advantage/Advantage";
import { Banner } from "components/landing/Banner/Banner";
import BrandLogo from "components/shared/BrandLogo/BrandLogo";
import { Discount } from "components/landing/Discount/Discount";
import { Info } from "components/landing/Info/Info";
import { LatestNews } from "components/landing/LatestNews/LatestNews";
import { NewArrivals } from "components/landing/NewArrivals/NewArrivals";
import { TopCategories } from "components/landing/TopCategories/TopCategories";
import { Trending } from "components/landing/Trending/Trending";
import { Subscribe } from "components/shared/Subscribe/Subscribe";
import { Layout } from "layout/Layout";
const advantages1 = [
  {
    icon: "/assets/img/icons/Plan de travail 3.svg",
    title: "Testé Dermatologiquement",
    body: "Sûr et testé pour éviter toute irritation cutanée.",
  },
  {
    icon: "/assets/img/icons/Plan de travail 4.svg",
    title: "Sans Parfum",
    body: "Formulé sans parfum, idéal pour les peaux sensibles.",
  },
  {
    icon: "/assets/img/icons/Plan de travail 5.svg",
    title: "Adapté aux Végétaliens",
    body: "100% végétalien, sans aucun ingrédient animal.",
  },
];


const advantages2 = [
  {
    icon: "/assets/img/icons/Plan de travail 6.svg",
    title: "Testé Ophthalmologiquement",
    body: "Sûr pour les yeux, testé pour éviter toute irritation.",
  },
  {
    icon: "/assets/img/icons/Plan de travail 7.svg",
    title: "Résistant à l'Eau",
    body: "Résistant à l'eau pour une longue tenue toute la journée.",
  },
  {
    icon: "/assets/img/icons/Plan de travail 8.svg",
    title: "Non Testé sur les Animaux",
    body: "Jamais testé sur les animaux, pour des pratiques éthiques.",
  },
];

export default function Home() {
  return (
    <Layout>
      <Banner />
      <Trending />
      <BrandLogo />
      <Discount />
      <Advantage advantages={[...advantages1,...advantages2]} />
      <TopCategories />
      {/* <Advantage advantages={advantages2} /> */}
      {/* <Info /> */}
      {/* <NewArrivals /> */}
      {/* <LatestNews /> */}
      {/* <Subscribe /> */}
    </Layout>
  );
}
