"use client";

import { useLanguage } from "@/utils/LanguageContext";
import Markdown from "@/utils/Markdown";
import { handleImgResponse } from "@/utils/utility";
import Image from "next/image";

export default function AboutUs(props: any) {
  const { aboutUs } = props;
  const { language } = useLanguage();
  return (
    <>
      <section id="about" className="pb-16 pt-12 px-6 bg-gray">
        <h2 className="font-bold text-center mb-12">
          <Markdown>
            {language === "en" ? aboutUs.enTitle : aboutUs.frTitle}
          </Markdown>
        </h2>
        <div className="text-center mb-12 bdy-txt">
          <Markdown>
            {language === "en" ? aboutUs.enText : aboutUs.frText}
          </Markdown>
        </div>
        <div className="flex justify-center flex-col items-center gap-8">
          {aboutUs?.Cards.map((card: any) => (
            <div className="card" key={card.id}>
              <div className="card-content md:grid">
                <div className="text-content">
                  <div className="bdy-txt-sm text-[#A5A5A5]">
                    {language === "en" ? card?.enRole : card?.frRole}
                  </div>
                  <h2>
                    <Markdown>{card?.name}</Markdown>
                  </h2>
                  <div className="bdy-txt">
                    <Markdown>
                      {language === "en"
                        ? card?.enDescription
                        : card?.frDescription}
                    </Markdown>
                  </div>
                </div>
                <div className="image-content">
                  <Image
                    src={handleImgResponse(card?.desktopImage)}
                    width={100}
                    height={400}
                    alt="bg"
                  />
                </div>
              </div>
              <div className="design-overlay"></div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
