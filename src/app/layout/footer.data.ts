"use server";
import { fetchData } from "@/utils/fetch";
import { getStrapiApi } from "@/utils/utility";
import QueryString from "qs";
const baseUrl = getStrapiApi();
export async function getFooterData() {
  const query = QueryString.stringify(
    {
      populate: [
        "desktopLogo",
        "mobileLogo",
        "form",
        "socialMedia",
        "socialMedia.SocialMedia",
        "socialMedia.SocialMedia.icon",
      ],
    },

    { encode: false } // Prevent encoding for better readability
  );
  const url = new URL("api/footer?" + query, baseUrl);
  return await fetchData(url.href);
}
