"use client";

import { useLanguage } from "@/utils/LanguageContext";
import Markdown from "@/utils/Markdown";
import { useState } from "react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Keyboard, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
SwiperCore.use([Pagination, Keyboard]);
export default function Testimonials(props: any) {
  const [, setSwiper] = useState<any>();
  const { testimonials } = props;
  const { language } = useLanguage();
  return (
    <>
      <section id="testimonials" className="pb-16 pt-12 px-6 bg-white">
        <h2 className="font-bold text-center mb-12">
          <Markdown>
            {language === "en" ? testimonials?.enTitle : testimonials?.frTitle}
          </Markdown>
        </h2>
        <div className="space-x-6 lg:flex hidden">
          {testimonials?.clientTestimonials.map((client: any, index: any) => (
            <div
              className={`${
                index === 0
                  ? "bg-orange"
                  : index === 1
                  ? "bg-lightBlue"
                  : index === 2
                  ? "bg-lightOrange"
                  : "bg-gray-300"
              }  p-[10px] rounded-[3px] text-center flex-1 my-0`}
              key={client.id}
            >
              <div className="border border-white p-[50px] h-[350px]">
                <Markdown cls="programs-titles mb-16 text-white">
                  {language === "en" ? client?.enTitle : client?.frTitle}
                </Markdown>

                <div className="bdy-txt-sm text-white">
                  {language === "en" ? client?.enText : client?.frText}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:hidden block">
          <Swiper
            spaceBetween={1}
            slidesPerView={1}
            slidesPerGroup={1}
            pagination={{
              clickable: true,
              el: ".swiper-pagination",
              type: "bullets",
              enabled: true,
              bulletClass: "swiper-pagination-bullet",
              bulletActiveClass: "swiper-pagination-bullet-active",
            }}
            modules={[Pagination]}
            loop={true}
            keyboard={{
              enabled: true,
            }}
            onSwiper={(swiper: any) => setSwiper(swiper)}
          >
            {testimonials?.clientTestimonials.map((client: any, index: any) => (
              <SwiperSlide key={index}>
                <div
                  className={`${
                    index === 0
                      ? "bg-orange"
                      : index === 1
                      ? "bg-lightBlue"
                      : index === 2
                      ? "bg-lightOrange"
                      : "bg-gray-300"
                  }  p-[10px] rounded-[3px] text-center flex-1`}
                  key={client.id}
                >
                  <div className="border border-white p-[50px] h-[350px]">
                    <Markdown cls="programs-titles mb-16 text-white">
                      {language === "en" ? client?.enTitle : client?.frTitle}
                    </Markdown>

                    <div className="bdy-txt-sm text-white">
                      {language === "en" ? client?.enText : client?.frText}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            className="swiper-pagination"
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              top: "-45px",
            }}
          ></div>
        </div>
      </section>
    </>
  );
}
