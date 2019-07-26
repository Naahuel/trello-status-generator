import i18n from "i18next";
import { initReactI18next } from 'react-i18next';
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // Detect browser language
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
  // we init with resources
  resources: {
    es: {
      translations: {
        appTitle: "Generar status de Tablero Trello",
        appInstructions1: "Exportá el tablero como JSON",
        appInstructions2: "Mostrar menú → ... Más → Imprimir y exportar → Exportar en formato JSON",
        appInstructions3: "y pegá aquí el código",
        textareaPlaceholder: "Peguá aquí el JSON exportado de Trello",
        inCharge: "A cargo de:"
      }
    },
    en: {
      translations: {
        appTitle: "Trello Board Status Generator",
        appInstructions1: "Export your Trello board as JSON",
        appInstructions2: "Show menu → ... More → Print And Export → Exportar JSON",
        appInstructions3: "then paste the code here",
        textareaPlaceholder: "Paste the Trello JSON code here",
        inCharge: "Owner:"
      }
    },
  },
  fallbackLng: "es",
  debug: false,

  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ","
  },

  react: {
    wait: true
  }
});

export default i18n;