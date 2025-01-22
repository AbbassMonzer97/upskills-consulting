"use client";

import { useLanguage } from "@/utils/LanguageContext";
import Markdown from "@/utils/Markdown";

export default function Programs(props: any) {
  const { programs } = props;
  const { language } = useLanguage();
  return (
    <>
      <section className="md:pb-16 pt-12 bg-gray">
        <div className="bdy-title text-center mb-12">
          <Markdown>
            {language === "en" ? programs?.enTitle : programs?.frTitle}
          </Markdown>
        </div>

        {programs?.programs.map((prog: any, index: any) => (
          <div
            className={`relative flex flex-col gap-6 ${
              index === 0
                ? "border-t-lightBlue"
                : index === 1
                ? "border-t-lightBlue"
                : index === 2
                ? "border-t-lightOrange"
                : index === 3
                ? "border-t-lightOrange"
                : index === 4
                ? "border-t-blue"
                : index === 5
                ? "border-t-blue"
                : "border-t-black"
            } border-t-2 md:py-12 py-20`}
            key={prog.id}
            id={prog?.sectionID}
          >
            <div
              className={`triangle ${
                index === 0
                  ? "border-t-lightBlue"
                  : index === 1
                  ? "border-t-lightBlue right-0"
                  : index === 2
                  ? "border-t-lightOrange"
                  : index === 3
                  ? "border-t-lightOrange right-0"
                  : index === 4
                  ? "border-t-blue"
                  : index === 5
                  ? "border-t-blue right-0"
                  : "border-t-black"
              } border-t-[65px] border-l-[75px] border-r-[75px]`}
            ></div>

            <div className="text-center program-title">
              {language === "en" ? prog?.enTitle : prog?.frTitle}
            </div>
            <div className="text-center bdy-txt md:px-0 px-2.5">
              <Markdown>
                {language === "en" ? prog?.enText : prog?.frText}
              </Markdown>
            </div>
            <p
              className={`bdy-txt-special text-center md:px-0 px-2.5 bdy-txt-2 ${
                index === 0
                  ? "text-lightBlue"
                  : index === 1
                  ? "text-lightBlue"
                  : index === 2
                  ? "text-lightOrange"
                  : index === 3
                  ? "text-lightOrange"
                  : index === 4
                  ? "text-blue"
                  : index === 5
                  ? "text-blue"
                  : "text-black"
              }`}
            >
              {language === "en" ? prog?.enSummary : prog?.frSummary}
            </p>
          </div>
        ))}
      </section>
    </>
  );
}
