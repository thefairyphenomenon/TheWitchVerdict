"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Language, translations, TranslationKey } from "@/data/translations";

interface LangContextType {
  lang:   Language;
  t:      (key: TranslationKey) => string;
  setLang:(lang: Language) => void;
}

const LangContext = createContext<LangContextType>({
  lang:    "en",
  t:       (k) => translations.en[k],
  setLang: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  const t = useCallback(
    (key: TranslationKey) => translations[lang][key] as string,
    [lang]
  );

  const setLang = useCallback((l: Language) => setLangState(l), []);

  return (
    <LangContext.Provider value={{ lang, t, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
