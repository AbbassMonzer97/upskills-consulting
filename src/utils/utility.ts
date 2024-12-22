export function handleImgResponse(image: any) {
  if (image) {
    return process.env.NEXT_PUBLIC_URL + (image?.url || "");
  }
  return "";
}

import { Metadata } from "next";

export function getPublicStrapiUrl() {
  return process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
}
export function getStrapiApi() {
  return process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337/api";
}

// type StrapiObject = Record<string, any>;

function flattenStrapiObject(obj: any): any {
  if (!obj || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(flattenStrapiObject);

  if (Array.isArray(obj) && obj.length === 0) return [];
  let flattened: any = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (key === "data") {
        if (Array.isArray(obj[key])) {
          flattened = obj[key].map((item: any) => flattenStrapiObject(item));
        } else if (typeof obj[key] === "object") {
          flattened = { ...flattened, ...flattenStrapiObject(obj[key]) };
        }
      } else if (key === "attributes") {
        const attributes = flattenStrapiObject(obj[key]);
        flattened = { ...flattened, ...attributes };
      } else {
        flattened[key] = flattenStrapiObject(obj[key]);
      }
    }
  }

  return flattened;
}

export function flattenAttributes(response: any): any {
  if (!response || !response.data) return null;

  const result: any = {};

  // Retain meta and any other top-level keys
  for (const key in response) {
    if (key !== "data") {
      result[key] = response[key];
    }
  }

  // Handle data as both an array and an object
  if (Array.isArray(response.data)) {
    result.data = response.data.map((item: any) => {
      const flattenedItem = flattenStrapiObject(item);
      return {
        id: item.id,
        ...flattenedItem,
      };
    });
  } else if (typeof response.data === "object") {
    result.data = {
      id: response.data.id,
      ...flattenStrapiObject(response.data),
    };
  }
  return result;
}

// export function getStrapiMedia(url: string | null): string | null {
//   if (url == null) return null;
//   if (url.startsWith("data:")) return url;
//   if (url.startsWith("http") || url.startsWith("//")) return url;
//   return `${getPublicStrapiUrl()}${url}`;
// }

// export function extractYouTubeID(urlOrID: string): string | null {
//   // Regular expression for YouTube ID format
//   const regExpID = /^[a-zA-Z0-9_-]{11}$/;

//   // Check if the input is a YouTube ID
//   if (regExpID.test(urlOrID)) {
//     return urlOrID;
//   }

//   // Regular expression for standard YouTube links
//   const regExpStandard = /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;

//   // Regular expression for YouTube Shorts links
//   const regExpShorts = /youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/;

//   // Check for standard YouTube link
//   const matchStandard = urlOrID.match(regExpStandard);
//   if (matchStandard) {
//     return matchStandard[1];
//   }

//   // Check for YouTube Shorts link
//   const matchShorts = urlOrID.match(regExpShorts);
//   if (matchShorts) {
//     return matchShorts[1];
//   }

//   // Return null if no match is found
//   return null;
// }

// export function removeIdField(obj: any): any {
//   if (Array.isArray(obj)) {
//     return obj.map(removeIdField);
//   } else if (obj !== null && typeof obj === "object") {
//     return Object.keys(obj).reduce((acc: any, key: string) => {
//       if (key !== "id") {
//         acc[key] = removeIdField(obj[key]);
//       }
//       return acc;
//     }, {});
//   }
//   return obj;
// }

// export function getRecaptchaSiteKey() {
//   return process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
// }

// export function formatDate(date: string) {
//   return new Date(date).toLocaleDateString("en-GB", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });
// }

// export function generateMetadataFromStrapi(strapiSeo: any): Metadata {
//   const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "";

//   const getImageUrl = (image: any) => {
//     if (!image?.url) return null;
//     return image.url.startsWith("http") ? image.url : `${baseUrl}${image.url}`;
//   };

//   const getFormattedImages = (image: any) => {
//     if (!image) return [];

//     const formats = image.formats;
//     const originalUrl = getImageUrl(image);

//     const images = [];

//     if (originalUrl) {
//       images.push({
//         url: originalUrl,
//         width: image.width,
//         height: image.height,
//         alt: image.alternativeText || strapiSeo?.metaTitle,
//       });
//     }

//     if (formats) {
//       // Add different format sizes if available
//       ["large", "medium", "small", "thumbnail"].forEach((size) => {
//         if (formats[size]) {
//           images.push({
//             url: formats[size].url.startsWith("http")
//               ? formats[size].url
//               : `${baseUrl}${formats[size].url}`,
//             width: formats[size].width,
//             height: formats[size].height,
//             alt: image.alternativeText || strapiSeo?.metaTitle,
//           });
//         }
//       });
//     }

//     return images;
//   };

//   const getSocialImages = (network: string) => {
//     const social = strapiSeo?.metaSocial?.find(
//       (s: any) => s.socialNetwork === network
//     );

//     if (social?.image) {
//       return getFormattedImages(social.image);
//     }

//     return getFormattedImages(strapiSeo?.metaImage);
//   };

//   return {
//     title: strapiSeo?.metaTitle,
//     description: strapiSeo?.metaDescription,
//     keywords: strapiSeo?.keywords || undefined,

//     robots: {
//       index: strapiSeo?.metaRobots?.includes("index") ?? true,
//       follow: strapiSeo?.metaRobots?.includes("follow") ?? true,
//       nocache: strapiSeo?.metaRobots?.includes("nocache") ?? false,
//       googleBot: {
//         index: strapiSeo?.metaRobots?.includes("index") ?? true,
//         follow: strapiSeo?.metaRobots?.includes("follow") ?? true,
//         noimageindex: strapiSeo?.metaRobots?.includes("noimageindex") ?? false,
//       },
//     },

//     viewport: strapiSeo?.metaViewport || "width=device-width, initial-scale=1",

//     openGraph: {
//       title: strapiSeo?.metaTitle,
//       description: strapiSeo?.metaDescription,
//       url: strapiSeo?.canonicalURL,
//       siteName: strapiSeo?.metaTitle,
//       images: getSocialImages("Facebook"),
//       locale: "en_US",
//       type: "website",
//     },

//     twitter: {
//       card: "summary_large_image",
//       title: strapiSeo?.metaTitle,
//       description: strapiSeo?.metaDescription,
//       images: getSocialImages("Twitter"),
//       creator: "@yourtwitterhandle",
//     },

//     alternates: {
//       canonical: strapiSeo?.canonicalURL,
//     },

//     other: {
//       ...(strapiSeo?.structuredData && {
//         "script:ld+json": JSON.stringify(strapiSeo?.structuredData),
//       }),
//     },

//     metadataBase: new URL(
//       process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:3000"
//     ),
//   };
// }
