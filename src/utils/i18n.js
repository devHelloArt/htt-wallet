import i18next from "i18next";
import LngDetector from "i18next-browser-languagedetector";

// LANGUAGE FILES
import en_US from "../lang/en_US.json";
import ko_KR from "../lang/ko_KR.json";

i18next.use(LngDetector).init({
    interpolation: {
        escapeValue: false
    },
    fallbackLng: {
        'default': ['en'],
    },
    resources: {
        en: {
            translation: en_US
        },
        es: {
            translation: en_US
        },
        'ko-KR': {
            translation: ko_KR
        }
    }
});

export default i18next;