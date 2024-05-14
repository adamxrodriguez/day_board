"use client"
import { useTranslation } from "react-i18next";

const Guides = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full py-10">
      <div className="relative flex flex-col px-5 mx-auto space-y-5 md:w-3/4">
        <div className="flex flex-col items-center">
          <h6 className="font-bold text-center text-blue-600 uppercase">
            {t("guides.title.guides")}
          </h6>
          <h2 className="text-4xl font-bold text-center">
            <span className="block">{t("guides.title.superchargeyouryatch")}</span>
          </h2>
          <p className="text-center text-gray-600">
            {t("guides.description.oursoftwareis")}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-10 py-10 md:grid-cols-3">
          <div className="p-5 space-y-5 transition rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2">
            <div className="w-full h-40 bg-gray-400 rounded-lg animate-pulse" />
            <div>
              <h3 className="text-lg font-bold text-gray-400">
                {t("guides.description.realtimeupdates")}
              </h3>
              <h2 className="text-2xl font-bold">
                {t("guides.title.stayinformedabout")}
              </h2>
            </div>
          </div>
          <div className="p-5 space-y-5 transition rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2">
            <div className="w-full h-40 bg-gray-400 rounded-lg animate-pulse" />
            <div>
              <h3 className="text-lg font-bold text-gray-400">{t("guides.title.savetime")}</h3>
              <h2 className="text-2xl font-bold">
                {t("guides.title.optimisemaintenance")}
              </h2>
            </div>
          </div>
          <div className="p-5 space-y-5 transition rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2">
            <div className="w-full h-40 bg-gray-400 rounded-lg animate-pulse" />
            <div>
              <h3 className="text-lg font-bold text-gray-400"> {t("guides.title.scalability")}</h3>
              <h2 className="text-2xl font-bold">{t("guides.title.oursoftwareis")}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guides;
