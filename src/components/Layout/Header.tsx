/* esspannt-disable react-hooks/rules-of-hooks */
"use client";
import { useLanguage } from "@/utils/LanguageContext";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function HeaderComponent(props: any) {
  const { headerResponse } = props;
  const [isMobileMenuHidden, setIsMobileMenuHidden] = useState(true);
  const [isFixed, setIsFixed] = useState(false);
  const [routes] = useState(headerResponse?.headerLinks);
  const [openMenuId, setOpenMenuId] = useState(null);
  const toggleMenu = (id: any) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const closeMenu = () => {
    setOpenMenuId(null);
  };

  const handleScroll = (e: any, targetId: any) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const offset = 80; // Adjust for fixed header height
      const elementPosition = targetElement.offsetTop - offset;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth", // Enables smooth scrolling
      });
    }
  };

  const { language, toggleLanguage } = useLanguage();
  return (
    <>
      <header
        className={`items-baseline md:flex md:flex-row flex-col justify-between items-center w-full z-[1000] transition-all duration-300 p-[50px] pt-[25px] md:pb-[30px] pb-[15px] ${
          isFixed ? "fixed top-0 bg-lightBlue" : "bg-lightBlue"
        }`}
      >
        <div className="flex justify-between mb-4 md:mb-0">
          {/* md:fixed top-0 */}
          <div className="logo">
            <Image
              src="/assets/images/image.png"
              alt="Laure"
              width={300}
              height={100}
              className="md:block hidden"
            />

            <Image
              src="/assets/images/image.png"
              alt="Laure"
              width={150}
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
          className={`flex md:flex-row flex-col md:items-center gap-4 md:gap-0 ${
            isMobileMenuHidden ? "hidden md:flex" : ""
          }`}
        >
          <div className="flex md:flex-row flex-col md:space-x-16 gap-4 md:gap-0">
            {routes.map((route: any) => (
              <span key={route.id}>
                <a
                  href={route.link}
                  onClick={(e) => {
                    handleScroll(e, route?.link);
                    setIsMobileMenuHidden(true);
                  }}
                  className="text-white hover:underline"
                >
                  {language === "en" ? route?.enTitle : route?.frTitle}
                </a>
              </span>
            ))}
          </div>

          <div
            className="flex md:ml-[40px] items-center cursor-pointer"
            onClick={toggleLanguage}
          >
            <Image
              src="/assets/icons/globe.svg"
              alt="Laure"
              width={30}
              height={100}
            />
            <span className="text-white">
              {language === "en" ? "EN" : "FR"}
            </span>
          </div>
        </nav>
      </header>
    </>
  );
}
