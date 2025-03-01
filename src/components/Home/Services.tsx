"use client";

import { useLanguage } from "@/utils/LanguageContext";
import Markdown from "@/utils/Markdown";
import { handleImgResponse } from "@/utils/utility";
import Image from "next/image";

export default function Services(props: any) {
  const { services } = props;
  const { language } = useLanguage();

  return (
    <>
      <section id="services" className="pb-16 pt-12 bg-white px-6">
        <div className="bdy-title text-center md:mb-12 mb-6">
          <Markdown>
            {language === "en" ? services.enTitle : services.frTitle}
          </Markdown>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services?.servicesOverview.map((service: any, index: any) => (
            <div
              className="p-4 flex flex-col items-center text-center gap-8"
              key={service.id}
            >
              <div
                className={`font-bold mt-4 ${
                  index === 0
                    ? "text-blue"
                    : index === 1
                    ? "text-lightBlue"
                    : index === 2
                    ? "text-lightOrange"
                    : index === 3
                    ? "text-orange"
                    : ""
                }`}
              >
                <div className="service-title">
                  <Markdown>
                    {language === "en" ? service.enTitle : service.frTitle}
                  </Markdown>
                </div>
              </div>
              <Image
                src={handleImgResponse(service?.image)}
                layout="intrinsic"
                unoptimized
                width={200}
                height={400}
                alt="servicesImage"
              />

              <div className="bdy-txt whitespace-nowrap">
                <Markdown>
                  {language === "en" ? service.enText : service.frText}
                </Markdown>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
