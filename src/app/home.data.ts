"use server";
import { fetchData } from "@/utils/fetch";
import { getStrapiApi } from "@/utils/utility";
import QueryString, * as qs from "qs";
const baseUrl = getStrapiApi();
export async function getHomeData() {
  const query = QueryString.stringify({
    populate: [
      "banner",
      "banner.desktopImage",
      "banner.mobileImage",
      "banner.button",
      "intro",
      "intro.desktopImage",
      "intro.mobileImage",
      "aboutUs",
      "aboutUs.Cards",
      "aboutUs.Cards.desktopImage",
      "aboutUs.Cards.mobileImage",
      "services",
      "services.servicesOverview",
      "services.servicesOverview.image",
      "programs",
      "programs.programs",
      "testimonials",
      "testimonials.clientTestimonials",
    ],
  });
  const url = new URL("api/home?" + query, baseUrl);
  return await fetchData(url.href);
}
