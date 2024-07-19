import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import vi from "./locales/vi";
import jp from "./locales/jp";

function loadLocales() {
  const locales = [{ vi: vi }, { jp: jp }];
  const resources = {};

  locales.forEach((lang) => {
    const key = Object.keys(lang);
    resources[key] = lang[key];
  });

  return resources;
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: "vi",
    fallbackLng: "vi",
    supportedLngs: ["vi", "jp"],
    resources: loadLocales(),
  });

export default i18n;
