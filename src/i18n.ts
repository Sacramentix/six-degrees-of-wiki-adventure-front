import { usePreferredLanguages } from '@vueuse/core';
import { computed } from 'vue';
import { createI18n } from 'vue-i18n';

const languages = usePreferredLanguages()

export enum Lang {
  en = "en",//English
  fr = "fr",//French
  de = "de",//German
  es = "es",//Spanish
  it = "it",//Italian
  eo = "eo",//Esperanto
  pt = "pt",//Portugues
  el = "el",//Greek
  sv = "sv",//Swedish
}

// Denomination in original language
export function getLabel(lang:string):string {
  switch (lang) {
    case Lang.en: return "English";
    case Lang.de: return "Deutsch";
    case Lang.fr: return "Français";
    case Lang.es: return "Español";
    case Lang.it: return "italiano";
    case Lang.eo: return "Esperanto";
    case Lang.pt: return "Português";
    case Lang.el: return "Eλληνικά";
    case Lang.sv: return "Svenska";
    default: return lang;
  }
}

export const AvailableLangs = [
    Lang.en,
    Lang.fr,
    Lang.de,
    Lang.eo,
    Lang.it
]

export const langLabel = computed(()=>{
  return getLabel(i18n.global.locale.value);
});


export function langOptions(langs?:string[]) {
  type Option = { value:string, label:string };
  const options:Option[] = [];
  const a = langs ?? Lang;
  //@ts-ignore
  for (const v in a) options.push({value: a[v], label: getLabel(a[v])});
  console.log(langs, Lang)
  return options;
}



const localLang = usePreferredLanguages().value[0];
var computedLocalLang = (localLang?.split("-")[0] || Lang.en) as Lang;
if (!Object.values(Lang).includes(computedLocalLang)) computedLocalLang = Lang.en;

export const i18n = createI18n({
  legacy: false,
  locale: computedLocalLang,
  fallbackLocale: Lang.en
});
  
export const currentLang = i18n.global.locale;
