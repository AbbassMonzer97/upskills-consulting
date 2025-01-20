"use client";

import { useLanguage } from "@/utils/LanguageContext";
import Markdown from "@/utils/Markdown";
import useIsMobile from "@/utils/isMobile";
import { handleImgResponse } from "@/utils/utility";
import Image from "next/image";
import { useRef, useState } from "react";
import { postEmail } from "./intro.data";

export default function Intro(props: any) {
  const { intro } = props;
  const [showSuccess, setShowSuccess] = useState(false);
  const isMobile = useIsMobile();
  const { language } = useLanguage();
  const [email, setEmail] = useState(""); // State to manage the input value
  const popupRef = useRef<HTMLDivElement | null>(null);
  const handleClearInput = () => {
    setEmail(""); // Clear the input
  };

  const handleEmailSubmit = async () => {
    if (!email) return;

    try {
      const resp = await postEmail(email);
      setShowSuccess(true);
      handleClearInput();
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <>
      <div
        id="overlay"
        className={`${showSuccess ? "overlay z-[1000]" : "hidden"}`}
      ></div>
      <section
        id="home"
        className="flex md:flex-row flex-col-reverse items-center bg-white px-6 md:px-0 gap-12 md:gap-0"
      >
        <div className="">
          {!isMobile && (
            <Image
              src={handleImgResponse(intro?.desktopImage)}
              alt="introImage"
              layout="intrinsic"
              unoptimized
              width={600}
              height={400}
            />
          )}
          {isMobile && (
            <Image
              src={handleImgResponse(intro?.mobileImage)}
              width={400}
              height={400}
              alt="introImage"
            />
          )}
        </div>
        <div className="flex-1">
          <div className="font-bold mb-6 text-center bdy-title">
            <Markdown>
              {language === "en" ? intro?.enTitle : intro?.frTitle}
            </Markdown>
          </div>
          <div className="bdy-txt mb-16 text-center">
            <Markdown>
              {language === "en" ? intro.enText : intro.frText}
            </Markdown>
          </div>
          <div className="flex-col items-center text-center">
            <div className="bdy-txt-special text-orange mb-4">
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
                className="absolute cursor-pointer top-[20%] md:right-[26%] right-[10px]"
                onClick={(e) => {
                  handleEmailSubmit();
                  handleClearInput();
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {showSuccess && (
        <div
          ref={popupRef}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[200px] md:w-[25%] w-[90%] bg-white p-8 overflow-y-auto z-[1000] pb-0"
        >
          <div className="flex justify-center">
            <Image
              src="/assets/icons/check.svg"
              alt="check"
              width={50}
              height={50}
            />
          </div>
          <div className="text-black mt-8">
            <Markdown cls="bdy-txt-1 text-center">
              {language === "en"
                ? intro?.enConfirmationPopup
                : intro?.frConfirmationPopup}
            </Markdown>
          </div>

          <div className="md:top-[20px] md:mr-[5px] top-[10px] mr-[10px] right-0 absolute">
            <button
              className="md:p-[10px] p-0 pt-0"
              onClick={() => setShowSuccess(false)}
            >
              <Image
                src="/assets/icons/close.svg"
                alt="Close"
                width={25}
                height={20}
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
