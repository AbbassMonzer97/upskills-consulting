import FooterComponent from "@/components/Layout/Footer";
import { getFooterData } from "./footer.data";
// export const revalidate = 10;
export default async function Footer() {
  const response = await getFooterData();
  return (
    <>
      <FooterComponent footerResponse={response?.data} />
    </>
  );
}
