"use server";
import { fetchData } from "@/utils/fetch";
import { getStrapiApi } from "@/utils/utility";
import QueryString from "qs";
const baseUrl = getStrapiApi();
export async function getHeaderData() {
  const query = QueryString.stringify({
    populate: ["headerLinks", "desktopLogo", "mobileLogo"],
  });
  const url = new URL("api/header?" + query, baseUrl);
  return await fetchData(url.href);
}
