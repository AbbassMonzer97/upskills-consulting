"use client";

import Markdown from "@/utils/Markdown";
import { handleImgResponse } from "@/utils/utility";
import Image from "next/image";
import Link from "next/link";
import useIsMobile from "../../utils/isMobile";
import { useLanguage } from "@/utils/LanguageContext";

export default function Banner(props: any) {
  const { banner } = props;
  const isMobile = useIsMobile();
  const { language } = useLanguage();
  return (
    <>
      <section className="mb-24" id="banner">
        <div
          className="w-full xl:h-[35rem] md:h-[25rem] h-[19rem] bg-center bg-cover bg-no-repeat grid"
          style={{
            backgroundImage: !isMobile
              ? `url(${handleImgResponse(banner?.desktopImage)})`
              : "none",
          }}
        >
          <div className="md:ml-[2rem] my-auto mx-auto md:col-start-2 md:col-span-8 p-[20px] md:p-0 md:bg-transparent bg-lightBlue">
            <h2 className="font-bold text-white">
              <Markdown>
                {language === "en" ? banner?.enTitle : banner?.frTitle}
              </Markdown>
            </h2>
            <Link href={banner?.button?.link || ""}>
              <button className="btn-primary mt-8">
                {language === "en"
                  ? banner?.button?.enTitle
                  : banner?.button?.frTitle}
              </button>
            </Link>
          </div>
        </div>

        {isMobile && (
          <div className="flex justify-center mt-12">
            <Image
              src={handleImgResponse(banner?.mobileImage)}
              width={400}
              height={400}
              alt="bg"
            />
          </div>
        )}
      </section>
    </>
  );
}
