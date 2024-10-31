import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Layout } from "layout/Layout";
import { Banner } from "components/landing/Banner/Banner";
import { Trending } from "components/landing/Trending/Trending";
import { Discount } from "components/landing/Discount/Discount";
import { TopCategories } from "components/landing/TopCategories/TopCategories";
import BrandLogo from "components/shared/BrandLogo/BrandLogo";
import { Advantage } from "components/shared/Advantage/Advantage";
import { AboutPromo } from "components/About/AboutPromo/AboutPromo";

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
  const { ref: trendingRef, inView: trendingInView } = useInView({
    threshold: 0.5, // Trigger when 50% of the element is visible
    triggerOnce: true, // Only trigger once
    rootMargin: "-50px", // Adjust the trigger point based on the viewport
  });

  const { ref: discountRef, inView: discountInView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
    rootMargin: "-50px",
  });

  const { ref: advantageRef, inView: advantageInView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
    rootMargin: "-50px",
  });
  return (
    <Layout>
      <Banner />

      <Trending />

      <motion.div
        ref={discountRef}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={discountInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ ease: "easeOut", duration: 0.4, delay: 0.2 }} // Slight delay for smoother stagger
      >
        {/* <Discount /> */}
      <TopCategories />

      </motion.div>

      <motion.div
        ref={advantageRef}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={advantageInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ ease: "easeOut", duration: 0.4, delay: 0.3 }} // Further delay to stagger with previous
      >
        <Advantage advantages={[...advantages1, ...advantages2]} />
      </motion.div>


      <AboutPromo />

      <BrandLogo />
    </Layout>
  );
}
