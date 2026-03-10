"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Language, translations, TranslationKey } from "@/data/translations";

interface LangContextType {
  lang: Language;
  t: (key: TranslationKey) => string;
  setLang: (lang: Language) => void;
  isFlipping: boolean;
  flipToken: number;
}

const FLIP_DURATION_MS = 900;
const FLIP_SWITCH_MS = 420;

const LangContext = createContext<LangContextType>({
  lang: "en",
  t: (k) => translations.en[k],
  setLang: () => {},
  isFlipping: false,
  flipToken: 0,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipToken, setFlipToken] = useState(0);

  const t = useCallback((key: TranslationKey) => translations[lang][key] as string, [lang]);

  const setLang = useCallback(
    (nextLang: Language) => {
      if (nextLang === lang || isFlipping) return;

      setIsFlipping(true);
      setFlipToken((v) => v + 1);

      window.setTimeout(() => setLangState(nextLang), FLIP_SWITCH_MS);
      window.setTimeout(() => setIsFlipping(false), FLIP_DURATION_MS);
    },
    [lang, isFlipping]
  );

  return <LangContext.Provider value={{ lang, t, setLang, isFlipping, flipToken }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
