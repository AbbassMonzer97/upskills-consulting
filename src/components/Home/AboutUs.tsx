"use client";

import { useLanguage } from "@/utils/LanguageContext";
import Markdown from "@/utils/Markdown";
import { handleImgResponse } from "@/utils/utility";
import Image from "next/image";
import { useIntersectionObserver } from "@/utils/useIntersectionObserver";
export default function AboutUs(props: any) {
  const { aboutUs } = props;
  const { language } = useLanguage();
  const { elementRef, isVisible } = useIntersectionObserver(0.2);

  return (
    <section
      id="about"
      ref={elementRef}
      className={`pb-16 pt-12 px-6 bg-gray ${
        isVisible ? "fade-in visible" : "fade-in"
      }`}
    >
      <div className="font-bold text-center mb-12 bdy-title">
        <Markdown>
          {language === "en" ? aboutUs.enTitle : aboutUs.frTitle}
        </Markdown>
      </div>
      <div className="text-center mb-12 bdy-txt">
        <Markdown>
          {language === "en" ? aboutUs.enText : aboutUs.frText}
        </Markdown>
      </div>
      <div className="flex justify-center flex-col items-center gap-8">
        {aboutUs?.Cards.map((card: any, index: number) => (
          <div
            className={`${
              index == 0
                ? "blue-card max-md:bg-[#c8e4ff]"
                : "orange-card max-md:bg-[#ffe8c5]"
            } relative max-md:h-auto w-full max-md:bg-none 2xl:w-[90%]`}
            key={card.id}
          >
            {/* Card Content */}
            <div
              className={`card-content z-10 max-md:p-[20px] ${
                index == 1
                  ? "md:flex md:flex-row-reverse lg:-ml-[5rem] xl:mr-[24rem] 2xl:mr-[27rem]"
                  : "md:grid 2xl:ml-[18rem]"
              }`}
            >
              <div
                className={`text-content max-md:p-0 max-md:text-center ${
                  index == 1
                    ? "text-left lg:ml-[5rem] 2xl:ml-[16.5rem]"
                    : "2xl:ml-[15rem] xl:ml-[22rem]"
                }`}
              >
                <div className="bdy-txt-sm md:text-[#A5A5A5]">
                  {language === "en" ? card?.enRole : card?.frRole}
                </div>
                <div className="bdy-txt-name">
                  <Markdown>{card?.name}</Markdown>
                </div>
                <div className="bdy-txt max-md:text-[#837373]">
                  <Markdown>
                    {language === "en"
                      ? card?.enDescription
                      : card?.frDescription}
                  </Markdown>
                </div>
              </div>
              <div className="image-content max-md:flex max-md:justify-center max-md:mt-4">
                <Image
                  src={handleImgResponse(card?.desktopImage)}
                  width={200}
                  height={400}
                  alt="ceoImage"
                  className="max-md:w-[250px] md:w-[200px]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
