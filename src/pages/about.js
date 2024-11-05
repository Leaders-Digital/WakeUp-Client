import { AboutDetailBlock } from "components/About/AboutDetailBlock/AboutDetailBlock";
import { AboutDiscount } from "components/About/AboutDiscount/AboutDiscount";
import { AboutPromo } from "components/About/AboutPromo/AboutPromo";
import { ContactDetailBlock } from "components/Contact/ContactDetailBlock/ContactDetailBlock";
import { ContactInfo } from "components/Contact/ContactInfo/ContactInfo";
import Map from "components/Map/Map";
import TimeLine from "components/Map/TimeLine";
import { Advantage } from "components/shared/Advantage/Advantage";
import { DetailBlock } from "components/shared/DetailBlock/DetailBlock";
import { SectionTitle } from "components/shared/SectionTitle/SectionTitle";
import { Subscribe } from "components/shared/Subscribe/Subscribe";
import { Testimonials } from "components/shared/Tesimonials/Tesimonials";
import { Card } from "components/shared/Advantage/Card/Card";
import { PublicLayout } from "layout/PublicLayout";

const breadcrumbsData = [
  {
    label: "Page d'accueil",
    path: "/",
  },
  {
    label: "à Propos",
    path: "/about",
  },
];
const defaultAdvantages = [
  {
    icon: "/assets/img/icons/quelity.svg",
    title: "Qualité",
    body: "Ingrédients sûrs et testés pour garantir la performance et respecter la peau.",
  },
  {
    icon: "/assets/img/icons/inno.svg",
    title: "Innovation",
    body: "Formules modernes et couleurs tendance, inspirées des dernières technologies.",
  },
  {
    icon: "/assets/img/icons/access.svg",
    title: "Accessibilité",
    body: "Qualité pro à prix compétitifs, pour rendre le maquillage accessible à tous.",
  },
];

const AboutPage = () => {
  return (
    <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle="à Propos">
      <div className="wrapper" style={{ marginBottom: "50px",marginTop:"50px" }}>
        <SectionTitle
          subTitle="Notre Philosophie"
          title="Chaque visage peut être une œuvre d'art ..."
          body=""
        />
        <p>
          Wakeup Cosmetics Milano n'est pas seulement une marque de cosmétiques,
          mais représente une nouvelle philosophie de maquillage conçue pour
          réveiller votre beauté naturelle et vous offrir une expérience unique
          caractérisée par l'énergie, la liberté et le dynamisme.
        </p>
      </div>
      <SectionTitle
        subTitle="Nos valeurs"
        // style={{marginTop:"50px"}}
      />
      <div>
        <div className="wrapper">
          <div className="advantages-items" style={{ display: "flex" }}>
            {defaultAdvantages.map((advantage, index) => (
              <div className="advantages-item" style={{ width: "300px" }}>
                <div className="advantages-item__icon">
                  <img
                    src={advantage.icon}
                    width={100}
                    height={100}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <h6
                  style={{
                    fontSize: "17px",
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  {advantage.title}
                </h6>
                <p style={{ fontSize: "15px" }}>{advantage.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <Map /> */}
      {/* <Advantage /> */}
      {/* <TimeLine /> */}
      {/* <ContactDetailBlock /> */}
      {/* <ContactInfo /> */}
    </PublicLayout>
  );
};

export default AboutPage;
