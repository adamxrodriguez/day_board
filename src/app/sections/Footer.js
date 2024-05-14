"use client"
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <div className="relative flex flex-col md:mx-auto md:w-3/4">
        <footer className="flex flex-col items-center justify-center py-5 space-x-0 space-y-3 border-b md:flex-row md:space-y-0 md:space-x-3">
          <a className="px-5 py-2 text-xl rounded hover:underline">{t("footer.commmon.about")}</a>
          <a className="px-5 py-2 text-xl rounded hover:underline">{t("footer.commmon.showcase")}</a>
          <a className="px-5 py-2 text-xl rounded hover:underline">{t("footer.commmon.information")}</a>
          <a className="px-5 py-2 text-xl rounded hover:underline">{t("footer.commmon.support")}</a>
          <a className="px-5 py-2 text-xl rounded hover:underline">{t("footer.commmon.terms")}</a>
        </footer>
        <p className="py-5 text-center text-gray-400">
          &copy; Dayboard Hub. {t("footer.commmon.allrightsreserved")} {new Date().getFullYear()}.
        </p>
      </div>
    </div>
  );
};

export default Footer;
