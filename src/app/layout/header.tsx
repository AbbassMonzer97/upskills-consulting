import HeaderComponent from "@/components/Layout/Header";
import { getHeaderData } from "./header.data";
// export const revalidate = 10;
export default async function Header() {
  const response = await getHeaderData();
  return (
    <>
      <HeaderComponent headerResponse={response?.data} />
    </>
  );
}
