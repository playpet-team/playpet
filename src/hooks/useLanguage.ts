import { useEffect } from 'react';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import * as ko from '../langs/ko';
import * as en from '../langs/en';

i18n.translations = {
    en: { ...ko, ...en },
    ko: ko,
    'ko-KR': ko,
};
const canLocale = ['ko-KR', 'ko', 'en'];

export default function useLanguage() {
    useEffect(() => {
        i18n.locale = canLocale.includes(Localization.locale) ? Localization.locale : canLocale[0];
        i18n.fallbacks = true;
    }, [])
}

