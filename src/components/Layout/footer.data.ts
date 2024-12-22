"use server";

import { commonFetch } from "@/utils/commonFetch";

export const postFooterForm = async (form: any) => {
  const postData = async () => {
    try {
      await commonFetch.post("/footer-forms", {
        data: { ...form },
      });
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  postData();
};
