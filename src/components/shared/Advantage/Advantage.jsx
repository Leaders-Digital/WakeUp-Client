import { Card } from "./Card/Card";
import { SectionTitle } from "../SectionTitle/SectionTitle";

export const Advantage = ({ advantages }) => {
  const defaultAdvantages = [
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

  // Use the advantages prop or fall back to the default
  const advantagesToDisplay = advantages || defaultAdvantages;

  return (
    <>
      {/* <!-- BEGIN ADVANTAGES --> */}
      <div className="advantages">
        <div className="wrapper">
          <SectionTitle
            subTitle="Les atouts de nos produits"
            title="Pourquoi nous choisir ?"
            body="Nos produits sont conçus pour respecter votre peau tout en garantissant des pratiques éthiques et responsables."
          />

          <div className="advantages-items">
            {advantagesToDisplay.map((advantage, index) => (
              <Card key={index} advantage={advantage} />
            ))}
          </div>
        </div>
      </div>
      {/* <!-- ADVANTAGES EOF --> */}
    </>
  );
};
