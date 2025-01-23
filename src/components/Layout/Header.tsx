/* esspannt-disable react-hooks/rules-of-hooks */
"use client";
import { useLanguage } from "@/utils/LanguageContext";
import { handleImgResponse } from "@/utils/utility";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeaderComponent(props: any) {
  const { headerResponse } = props;
  const [isMobileMenuHidden, setIsMobileMenuHidden] = useState(true);
  const [isFixed, setIsFixed] = useState(false);
  const [routes] = useState(headerResponse?.headerLinks);

  useEffect(() => {
    const handleScroll = () => {
      if (window?.scrollY > 150) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window?.addEventListener("scroll", handleScroll);
    return () => {
      window?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = (e: any, targetId: any) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const offset = 80; // Adjust for fixed header height
      const elementPosition = targetElement.offsetTop - offset;

      window?.scrollTo({
        top: elementPosition,
        behavior: "smooth", // Enables smooth scrolling
      });
    }
  };

  const { language, toggleLanguage } = useLanguage();
  return (
    <>
      <header
        className={`fixed md:flex md:flex-row flex-col justify-between items-center w-full z-[1000] transition-all duration-300 p-[50px] pt-[25px] md:pt-[10px] md:pb-0 pb-[15px] ${
          isFixed ? "top-0 bg-[#82A4CD]" : "md:bg-transparent bg-[#82A4CD]"
        }`}
      >
        <div className="flex justify-between mb-4 md:mb-0 max-md:-ml-[60px] items-center header-logo">
          {/* md:fixed top-0 */}
          <div className="logo">
            <Image
              src={handleImgResponse(headerResponse?.desktopLogo)}
              alt="Logo"
              width={250}
              height={100}
              className="md:block hidden xl:w-[445px] md:w-[415px] -ml-[4rem]"
            />

            <Image
              src={handleImgResponse(headerResponse?.desktopLogo)}
              alt="Logo"
              width={300}
              height={100}
              className="md:hidden block"
            />
          </div>

          <div className="block lg:hidden cursor-pointer">
            <Image
              src={
                isMobileMenuHidden
                  ? "/assets/icons/nav-menu-mobile.png"
                  : "/assets/icons/close.png"
              }
              alt={isMobileMenuHidden ? "nav-mobile" : "close"}
              width={20}
              height={20}
              onClick={() => setIsMobileMenuHidden(!isMobileMenuHidden)}
            />
          </div>
        </div>
        <nav
          className={`flex md:flex-row flex-col md:items-center gap-4 md:gap-0 menu ${
            isMobileMenuHidden ? "hidden md:flex md:mt-[35px]" : ""
          }`}
        >
          <div className="flex md:flex-row flex-col md:space-x-16 gap-4 md:gap-0 max-md:ml-[5px]">
            {routes.map((route: any) => (
              <span key={route.id}>
                <a
                  href={route.link}
                  onClick={(e) => {
                    handleScroll(e, route?.link);
                    setIsMobileMenuHidden(true);
                  }}
                  className="relative text-white after:block after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full header-txt"
                >
                  {language === "en" ? route?.enTitle : route?.frTitle}
                </a>
              </span>
            ))}
          </div>

          <div
            className="flex md:ml-[40px] items-center cursor-pointer max-md:ml-[5px]"
            onClick={toggleLanguage}
          >
            <Image
              src="/assets/icons/globe.svg"
              alt="globe"
              width={30}
              height={100}
            />
            <span className="text-white header-txt">
              {language === "en" ? "EN" : "FR"}
            </span>
          </div>
        </nav>
      </header>
    </>
  );
}
