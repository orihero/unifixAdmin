import {addLocaleData} from 'react-intl';
import enLang from './entries/en-US';
import esLang from './entries/es-ES';
import ruLang from './entries/ru-RU'
import enRtlLang from './entries/en-US-rtl';

const AppLocale = {
    ru:ruLang,
    en: enLang,
    es: esLang,
    enrtl:enRtlLang,
};
addLocaleData(AppLocale.ru.data);
addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.es.data);
addLocaleData(AppLocale.enrtl.data);

export default AppLocale;
