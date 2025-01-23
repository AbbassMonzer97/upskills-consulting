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
  const handleScroll = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault(); // Prevent default anchor behavior

    if (targetId) {
      const targetElement = document.querySelector(targetId); // Find the target element

      if (targetElement) {
        const offset = 100; // Adjust this value to control the threshold
        const elementPosition =
          targetElement.getBoundingClientRect().top + window?.scrollY - offset;

        window?.scrollTo({
          top: elementPosition,
          behavior: "smooth", // Enable smooth scrolling
        });
      }
    }
  };
  return (
    <>
      <section className="md:mb-0 mb-12" id="banner">
        <div className="w-full 2xl:h-[48rem] md:h-[52rem] h-[44rem] grid relative bg-[url('/assets/images/banner.png')] bg-center bg-no-repeat">
          <div className="absolute bottom-[-57px] right-[50rem]">
            <div className="bg-[#dbdbdb] p-4 flex flex-col items-center pt-[5px] pb-[20px] md:w-[350px] w-[280px] md:mt-10 mt-4 max-md:hidden">
              {banner?.button.map((button: any, index: number) => (
                <div className="" key={index}>
                  <Link
                    href={button?.link || ""}
                    onClick={(e) => {
                      handleScroll(e, button?.link);
                    }}
                  >
                    <button
                      className={`btn-primary mt-4 ${
                        index === 0
                          ? "bg-lightBlue"
                          : index === 1
                          ? "bg-lightOrange"
                          : index === 2
                          ? "bg-blue"
                          : "bg-lightOrange"
                      }`}
                    >
                      {language === "en" ? button?.enTitle : button?.frTitle}
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden md:block absolute right-0 bottom-0">
            <Image
              src={handleImgResponse(banner?.desktopImage)}
              width={800}
              height={400}
              alt="bannerImage"
            />
          </div>
          <div className="md:ml-[4rem] md:mt-[12rem] mt-[10rem] my-auto mx-auto md:col-span-8 p-[35px] md:p-0 md:bg-transparent">
            <div className="font-bold text-white banner-title">
              <Markdown>
                {language === "en" ? banner?.enTitle : banner?.frTitle}
              </Markdown>
            </div>

            <div className="bg-[#dbdbdb] p-4 flex flex-col items-center pt-[5px] pb-[20px] md:w-[350px] w-[280px] md:mt-10 mt-4 md:hidden">
              {banner?.button.map((button: any, index: number) => (
                <div className="" key={index}>
                  <Link
                    href={button?.link || ""}
                    onClick={(e) => {
                      handleScroll(e, button?.link);
                    }}
                  >
                    <button
                      className={`btn-primary mt-4 ${
                        index === 0
                          ? "bg-lightBlue"
                          : index === 1
                          ? "bg-lightOrange"
                          : index === 2
                          ? "bg-blue"
                          : "bg-lightOrange"
                      }`}
                    >
                      {language === "en" ? button?.enTitle : button?.frTitle}
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {isMobile && (
          <div className="flex justify-center">
            <Image
              src={handleImgResponse(banner?.mobileImage)}
              width={400}
              height={400}
              alt="bannerImage"
              className="banner-mobile-image"
            />
          </div>
        )}
      </section>
    </>
  );
}
