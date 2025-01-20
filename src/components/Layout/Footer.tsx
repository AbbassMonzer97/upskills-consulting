"use client";
import { useLanguage } from "@/utils/LanguageContext";
import Markdown from "@/utils/Markdown";
import { handleImgResponse } from "@/utils/utility";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { postFooterForm } from "./footer.data";

export default function FooterComponent(props: any) {
  const { footerResponse } = props;
  const [showPrivacy, setPrivacy] = useState(false);
  const [isCookiesVisible, setIsCookiesVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const { language } = useLanguage();
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    comment: "",
  });

  const [errors, setErrors] = useState<any>({
    name: "",
    email: "",
    phone: "",
    comment: "",
  });

  const handleAccept = () => {
    setIsCookiesVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setPrivacy(false);
      }
    };
    if (showPrivacy) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showPrivacy, popupRef, showSuccess]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {
      name:
        form.name.trim() === ""
          ? language === "en"
            ? footerResponse?.enNameError
            : footerResponse?.frNameError
          : "",
      email:
        form.email.trim() === ""
          ? language === "en"
            ? footerResponse?.enEmailError
            : footerResponse?.frEmailError
          : !validateEmail(form.email)
          ? language === "en"
            ? "Invalid Email"
            : "Invalid Emailfr"
          : "",
      phone:
        form.phone.trim() === ""
          ? language === "en"
            ? footerResponse?.enPhoneError
            : footerResponse?.frPhoneError
          : "",
      comment:
        form.comment.trim() === ""
          ? language === "en"
            ? footerResponse?.enCommentError
            : footerResponse?.frCommentError
          : "",
    };

    setErrors(newErrors);

    return (
      !newErrors.name &&
      !newErrors.email &&
      !newErrors.phone &&
      !newErrors.comment
    );
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "name") {
      const regex = /^[a-zA-Z\s]*$/;
      const wordCount = value.trim().split(/\s+/).length;

      if (!regex.test(value)) {
        setErrors((prevErrors: any) => ({
          ...prevErrors,
          name: "Name cannot contain special characters or numbers",
        }));
        return;
      } else if (wordCount > 200) {
        setErrors((prevErrors: any) => ({
          ...prevErrors,
          name: "Name cannot exceed 200 words",
        }));
        return;
      } else {
        setErrors((prevErrors: any) => ({
          ...prevErrors,
          name: "",
        }));
      }
    }

    if (name === "comment") {
      const wordCount = value.trim().split(/\s+/).length;

      if (wordCount > 500) {
        setErrors((prevErrors: any) => ({
          ...prevErrors,
          message: "Message cannot exceed 500 words",
        }));
        return;
      } else {
        setErrors((prevErrors: any) => ({
          ...prevErrors,
          message: "",
        }));
      }
    }

    setForm((prevForm: any) => ({ ...prevForm, [name]: value }));
    setErrors((prevErrors: any) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    } else {
      const postData = async () => {
        await postFooterForm(form);
        setShowSuccess(true);
      };
      setForm({
        name: "",
        email: "",
        phone: "",
        comment: "",
      });
      postData();
    }
  };

  return (
    <>
      <div
        id="overlay"
        className={`${
          showPrivacy || showSuccess ? "overlay z-[1000]" : "hidden"
        }`}
      ></div>
      <footer className="bg-gray text-grayText pb-16 pt-12 px-6 text-center bdy-txt">
        <div className="bdy-title text-center mb-6 text-black">
          <Markdown>
            {language === "en"
              ? footerResponse?.enTitle
              : footerResponse?.frTitle}
          </Markdown>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <section className="md:py-16 px-6 mt-8 order-1">
            <div className="flex flex-col items-center gap-4">
              <Image
                src={handleImgResponse(footerResponse?.desktopLogo)}
                width={340}
                height={400}
                alt="logo"
              />

              <Link
                href={`mailto:${footerResponse?.email}`}
                className="hover:underline footer-txt"
              >
                {footerResponse?.email}
              </Link>
            </div>
          </section>
          <section id="footer" className="md:py-16 pb-8 md:px-6 order-2">
            <form
              className="flex flex-col space-y-4 max-w-lg mx-auto mt-6"
              onSubmit={handleSubmit}
            >
              <p className="text-left footer-txt">
                {language === "en"
                  ? footerResponse?.form?.enTitle
                  : footerResponse?.form?.frTitle}
              </p>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={
                  language === "en"
                    ? footerResponse?.form?.enName
                    : footerResponse?.form?.frName
                }
                className={`custom-input p-3 w-full border ${
                  errors.name ? "border-red-300" : ""
                }`}
              />
              {errors.name && (
                <div>
                  <p className="text-red-300 text-left text-sm -mt-[10px]">
                    {errors.name}
                  </p>
                </div>
              )}
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder={
                  language === "en"
                    ? footerResponse?.form?.enEmail
                    : footerResponse?.form?.frEmail
                }
                className={`custom-input p-3 w-full border ${
                  errors.email ? "border-red-300" : ""
                }`}
              />
              {errors.email && (
                <div>
                  <p className="text-red-300 text-left text-sm -mt-[10px]">
                    {errors.email}
                  </p>
                </div>
              )}
              <input
                type="number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder={
                  language === "en"
                    ? footerResponse?.form?.enPhone
                    : footerResponse?.form?.frPhone
                }
                className={`custom-input p-3 w-full border ${
                  errors.phone ? "border-red-300" : ""
                }`}
              />
              {errors.phone && (
                <div>
                  <p className="text-red-300 text-left text-sm -mt-[10px]">
                    {errors.phone}
                  </p>
                </div>
              )}
              <textarea
                name="comment"
                value={form.comment}
                onChange={handleChange}
                placeholder={
                  language === "en"
                    ? footerResponse?.form?.enComment
                    : footerResponse?.form?.frComment
                }
                rows={4}
                className={`custom-input p-3 w-full border max-h-[500px] overflow-auto resize-y ${
                  errors.comment ? "border-red-300" : ""
                }`}
              />
              {errors.comment && (
                <div>
                  <p className="text-red-300 text-left text-sm -mt-[10px]">
                    {errors.comment}
                  </p>
                </div>
              )}
              <button type="submit" className="btn-primary bg-lightOrange">
                {language === "en"
                  ? footerResponse?.form?.enSubmit
                  : footerResponse?.form?.frSubmit}
              </button>
            </form>
          </section>
          <section className="md:py-16 px-6 md:mt-8 max-md:mb-8 order-3">
            <div className="flex flex-col items-center gap-8">
              <div className="footer-txt md:-ml-12">
                <Markdown>
                  {language === "en"
                    ? footerResponse?.socialMedia?.enTitle
                    : footerResponse?.socialMedia?.frTitle}
                </Markdown>
              </div>
              <div className="max-md:flex max-md:flex-row max-md:items-center">
                {footerResponse?.socialMedia?.SocialMedia.map(
                  (media: any, index: number) => {
                    const isWhatsApp = index === 1; // Check if the current index is 1
                    const whatsappLink = `https://wa.me/${media?.link}`;

                    return (
                      <div className="" key={media.id}>
                        <Link
                          href={isWhatsApp ? whatsappLink : media?.link || ""}
                          target="_blank"
                          className="cursor-pointer"
                        >
                          <div className="flex items-center">
                            <Image
                              src={handleImgResponse(media?.icon)}
                              width={index === 0 ? 60 : index === 1 ? 70 : 60}
                              height={400}
                              alt="socialMediaIcon"
                              className={`${
                                index === 0
                                  ? "max-md:mt-[-8px] md:ml-[10px]"
                                  : index === 2
                                  ? "max-md:mt-[-4px]"
                                  : ""
                              }`}
                            />
                            <p className="footer-txt max-md:hidden">
                              {media?.text}
                            </p>
                          </div>
                        </Link>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </section>
        </div>

        <p className="mb-4">
          {language === "en"
            ? footerResponse?.enRights
            : footerResponse?.frRights}
        </p>
        <div className="flex justify-center md:gap-[4rem] md:flex-row flex-col gap-[1rem]">
          <p onClick={() => setPrivacy(true)} className="cursor-pointer">
            {language === "en"
              ? footerResponse?.enPrivacyPolicy
              : footerResponse?.frPrivacyPolicy}
          </p>
          <p
            onClick={() => setIsCookiesVisible(true)}
            className="cursor-pointer"
          >
            {language === "en"
              ? footerResponse?.enCookies
              : footerResponse?.frCookies}
          </p>
          <Link
            href={`mailto:${footerResponse?.email}`}
            className="hover:underline"
          >
            {footerResponse?.email}
          </Link>
        </div>
      </footer>

      {isCookiesVisible && (
        <div className="fixed bottom-0 left-0 right-0 bg-white text-black p-4 z-50 flex-col lg:flex-row">
          <div className="container mx-auto flex justify-between items-center md:flex-row flex-col">
            <Markdown cls="bdy-txt-6">
              {language === "en"
                ? footerResponse?.enCookiesText
                : footerResponse?.frCookiesText}
            </Markdown>
            <button
              className="btn-primary bg-lightOrange"
              onClick={handleAccept}
            >
              {language === "en"
                ? footerResponse?.enCookiesButton
                : footerResponse?.frCookiesButton}
            </button>
          </div>
        </div>
      )}

      {showPrivacy && (
        <div
          ref={popupRef}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[84%] bg-white border p-8 overflow-y-auto z-[1000]"
        >
          <div className="text-black">
            <p className="text-left whitespace-nowrap mb-4 mt-4 dialog-title">
              {language === "en"
                ? footerResponse?.enPrivacyPolicyTitle
                : footerResponse?.frPrivacyPolicyTitle}
            </p>

            <Markdown cls="bdy-txt-6">
              {language === "en"
                ? footerResponse?.enPrivacyPolicyText
                : footerResponse?.frPrivacyPolicyText}
            </Markdown>
          </div>

          <div className="md:top-[20px] md:mr-[20px] top-[10px] mr-[10px] right-0 absolute">
            <button
              className="md:p-[10px] p-0"
              onClick={() => setPrivacy(false)}
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
                ? footerResponse?.enConfirmationPopup
                : footerResponse?.frConfirmationPopup}
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
