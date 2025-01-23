import AboutUs from "@/components/Home/AboutUs";
import Banner from "@/components/Home/Banner";
import Intro from "@/components/Home/Intro";
import Programs from "@/components/Home/Programs";
import Services from "@/components/Home/Services";
import Testimonials from "@/components/Home/Testimonials";
import { getHomeData } from "./home.data";
import SuppressErrorsWrapper from "@/utils/SuppressErrorsWrapper";
export const revalidate = 10;
export default async function Home() {
  const response = await getHomeData();

  return (
    <SuppressErrorsWrapper>
      <Banner banner={response?.data?.banner} />
      <Intro intro={response?.data?.intro} />
      <AboutUs aboutUs={response?.data?.aboutUs} />
      <Services services={response?.data?.services} />
      <Programs programs={response?.data?.programs} />
      <Testimonials testimonials={response?.data?.testimonials} />
    </SuppressErrorsWrapper>
  );
}
