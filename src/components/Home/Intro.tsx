"use client";

import { useLanguage } from "@/utils/LanguageContext";
import Markdown from "@/utils/Markdown";
import useIsMobile from "@/utils/isMobile";
import { handleImgResponse } from "@/utils/utility";
import Image from "next/image";
import { useState } from "react";
import { postEmail } from "./intro.data";

export default function Intro(props: any) {
  const { intro } = props;
  const isMobile = useIsMobile();
  const { language } = useLanguage();
  const [email, setEmail] = useState(""); // State to manage the input value

  const handleClearInput = () => {
    setEmail(""); // Clear the input
  };

  const handleEmailSubmit = async () => {
    if (!email) return;

    try {
      await postEmail(email);
      console.log("Email submitted successfully");
      handleClearInput();
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <>
      <section
        id="home"
        className="flex md:flex-row flex-col-reverse items-center bg-white md:py-16 pb-16 px-6 gap-12 md:gap-0"
      >
        <div className="flex-1">
          {!isMobile && (
            <Image
              src={handleImgResponse(intro?.desktopImage)}
              width={400}
              height={400}
              alt="bg"
            />
          )}
          {isMobile && (
            <Image
              src={handleImgResponse(intro?.mobileImage)}
              width={400}
              height={400}
              alt="bg"
            />
          )}
        </div>
        <div className="flex-1">
          <h2 className="font-bold mb-4 text-center">
            <Markdown>
              {language === "en" ? intro?.enTitle : intro?.frTitle}
            </Markdown>
          </h2>
          <div className="bdy-txt mb-6 text-center">
            <Markdown>
              {language === "en" ? intro.enText : intro.frText}
            </Markdown>
          </div>
          <div className="flex-col items-center">
            <div className="bdy-txt-2 text-orange mb-4">
              {language === "en" ? intro.enSubTitle : intro.frSubTitle}
            </div>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={language === "en" ? intro.enEmail : intro.frEmail}
                className="p-3 border rounded-l md:w-[50%] w-full border-[#A5A5A5]"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleEmailSubmit();
                    handleClearInput();
                  }
                }}
              />
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="Arrow"
                width={30}
                height={20}
                className="absolute cursor-pointer top-[20%] md:left-[46%] right-[10px]"
                onClick={(e) => {
                  handleEmailSubmit();
                  handleClearInput();
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
