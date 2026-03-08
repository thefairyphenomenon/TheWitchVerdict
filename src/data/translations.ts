// ─────────────────────────────────────────────
//  Site Translations
//  Languages: English (default), Hindi, German
// ─────────────────────────────────────────────

export type Language = "en" | "hi" | "de";

export const translations = {
  en: {
    // Nav
    nav_about:      "About",
    nav_education:  "Education",
    nav_experience: "Experience",
    nav_certifications: "Certifications",
    nav_projects:   "Projects",
    nav_skills:     "Skills",
    nav_contact:    "Contact",
    nav_cta:        "Send Raven ✦",

    // Hero
    hero_badge:     "The Witch Verdict",
    hero_headline:  "Financial Engineer & AI Builder",
    hero_tagline:   "I code because I desire to be the wind itself.",
    hero_enter:     "Enter the Realm",
    hero_github:    "GitHub ↗",

    // About
    about_label:    "About",
    about_title1:   "The Witch",
    about_title2:   "Behind the",
    about_title3:   "Code",
    about_studying: "Currently Studying",
    about_languages:"Languages Spoken",

    // Education
    edu_label:      "The Grimoire",
    edu_title:      "Education",
    edu_subtitle:   "Select a chapter · Click the card to reveal spell details",
    edu_tap:        "tap to reveal ✦",
    edu_chapter:    "Chapter Details",
    edu_duration:   "Duration",
    edu_courses:    "Courses",
    edu_courses_sub:"Each course adds a piece to the witch",

    // Certifications section label
    certs_label:    "Spell Components",
    certs_title:    "Certifications",
    certs_subtitle: "Click each scroll to dress the witch",
    certs_complete: "The witch is complete",
    certs_all_done: "All spells mastered ✦",

    // Experience
    exp_label:      "Quest Log",
    exp_title:      "Experience",
    exp_subtitle:   "Click a destination to travel there",
    exp_objectives: "Mission Objectives",
    exp_skills:     "Skills Unlocked",
    exp_achievement:"Achievement",

    // Projects
    proj_label:     "Spells Cast",
    proj_title:     "Projects",
    proj_subtitle:  "Each system — a different kind of sorcery",
    proj_impact:    "Impact",
    proj_github:    "View on GitHub ↗",
    proj_all:       "View all repositories on GitHub",

    // Skills
    skills_label:   "The Constellation",
    skills_title:   "Skills",
    skills_subtitle:"Hover the stars to explore — each cluster a domain",

    // Contact
    contact_label:  "Summon",
    contact_title:  "Send a Raven",
    contact_subtitle:"Whether you have a project in mind, an opportunity to share, or simply want to connect — I am listening.",
    contact_name:   "Your Name",
    contact_email:  "Your Email",
    contact_msg:    "Your Message",
    contact_name_ph:"Introduce yourself...",
    contact_email_ph:"Where shall I write back?",
    contact_msg_ph: "Speak your intentions...",
    contact_send:   "✦  Send Raven  ✦",
    contact_sent_title: "Raven Dispatched",
    contact_sent_sub:   "Your message has been sent. Expect a reply soon.",
    contact_location:   "Noida, India · Open to remote opportunities",
    contact_quote:  "I code because I desire to be the wind itself.",

    // Language toggle
    lang_toggle:    "Language",
    lang_en:        "English",
    lang_hi:        "हिंदी",
    lang_de:        "Deutsch",
  },

  hi: {
    nav_about:      "परिचय",
    nav_education:  "शिक्षा",
    nav_experience: "अनुभव",
    nav_certifications: "प्रमाणपत्र",
    nav_projects:   "परियोजनाएँ",
    nav_skills:     "कौशल",
    nav_contact:    "संपर्क",
    nav_cta:        "संदेश भेजें ✦",

    hero_badge:     "द विच वर्डिक्ट",
    hero_headline:  "वित्तीय अभियंता और AI निर्माता",
    hero_tagline:   "मैं कोड करती हूँ क्योंकि मैं स्वयं हवा बनना चाहती हूँ।",
    hero_enter:     "दुनिया में प्रवेश करें",
    hero_github:    "GitHub ↗",

    about_label:    "परिचय",
    about_title1:   "कोड के पीछे",
    about_title2:   "की",
    about_title3:   "जादूगरनी",
    about_studying: "अभी पढ़ रही हूँ",
    about_languages:"बोली जाने वाली भाषाएँ",

    edu_label:      "ज्ञान ग्रंथ",
    edu_title:      "शिक्षा",
    edu_subtitle:   "अध्याय चुनें · विवरण के लिए कार्ड पर टैप करें",
    edu_tap:        "प्रकट करें ✦",
    edu_chapter:    "अध्याय विवरण",
    edu_duration:   "अवधि",
    edu_courses:    "पाठ्यक्रम",
    edu_courses_sub:"प्रत्येक पाठ्यक्रम जादूगरनी को एक टुकड़ा जोड़ता है",

    certs_label:    "मंत्र-घटक",
    certs_title:    "प्रमाणपत्र",
    certs_subtitle: "प्रत्येक स्क्रॉल पर क्लिक करें",
    certs_complete: "जादूगरनी पूर्ण हो गई",
    certs_all_done: "सभी मंत्र सिद्ध ✦",

    exp_label:      "अभियान डायरी",
    exp_title:      "अनुभव",
    exp_subtitle:   "गंतव्य चुनने के लिए क्लिक करें",
    exp_objectives: "अभियान के लक्ष्य",
    exp_skills:     "अनलॉक किए गए कौशल",
    exp_achievement:"उपलब्धि",

    proj_label:     "किए गए मंत्र",
    proj_title:     "परियोजनाएँ",
    proj_subtitle:  "हर प्रणाली — एक अलग जादू",
    proj_impact:    "प्रभाव",
    proj_github:    "GitHub पर देखें ↗",
    proj_all:       "GitHub पर सभी रिपॉजिटरी देखें",

    skills_label:   "नक्षत्र मंडल",
    skills_title:   "कौशल",
    skills_subtitle:"तारों पर होवर करें — प्रत्येक समूह एक क्षेत्र है",

    contact_label:  "आह्वान",
    contact_title:  "संदेश भेजें",
    contact_subtitle:"चाहे कोई परियोजना हो, अवसर हो, या बस जुड़ना हो — मैं सुन रही हूँ।",
    contact_name:   "आपका नाम",
    contact_email:  "आपका ईमेल",
    contact_msg:    "आपका संदेश",
    contact_name_ph:"अपना परिचय दें...",
    contact_email_ph:"मैं कहाँ उत्तर दूँ?",
    contact_msg_ph: "अपनी बात कहें...",
    contact_send:   "✦  संदेश भेजें  ✦",
    contact_sent_title: "संदेश भेज दिया गया",
    contact_sent_sub:   "आपका संदेश पहुँच गया। जल्द उत्तर मिलेगा।",
    contact_location:   "नोएडा, भारत · दूरस्थ अवसरों के लिए उपलब्ध",
    contact_quote:  "मैं कोड करती हूँ क्योंकि मैं स्वयं हवा बनना चाहती हूँ।",

    lang_toggle:    "भाषा",
    lang_en:        "English",
    lang_hi:        "हिंदी",
    lang_de:        "Deutsch",
  },

  de: {
    nav_about:      "Über mich",
    nav_education:  "Bildung",
    nav_experience: "Erfahrung",
    nav_certifications: "Zertifikate",
    nav_projects:   "Projekte",
    nav_skills:     "Fähigkeiten",
    nav_contact:    "Kontakt",
    nav_cta:        "Nachricht senden ✦",

    hero_badge:     "Das Hexen-Urteil",
    hero_headline:  "Finanzingenieurin & KI-Entwicklerin",
    hero_tagline:   "Ich code, weil ich selbst der Wind sein möchte.",
    hero_enter:     "Reich betreten",
    hero_github:    "GitHub ↗",

    about_label:    "Über mich",
    about_title1:   "Die Hexe",
    about_title2:   "hinter dem",
    about_title3:   "Code",
    about_studying: "Aktuell lernend",
    about_languages:"Gesprochene Sprachen",

    edu_label:      "Das Grimoire",
    edu_title:      "Bildung",
    edu_subtitle:   "Kapitel wählen · Karte tippen für Details",
    edu_tap:        "tippen zum enthüllen ✦",
    edu_chapter:    "Kapitel-Details",
    edu_duration:   "Dauer",
    edu_courses:    "Kurse",
    edu_courses_sub:"Jeder Kurs fügt der Hexe ein Teil hinzu",

    certs_label:    "Zauber-Zutaten",
    certs_title:    "Zertifikate",
    certs_subtitle: "Klicke jede Schriftrolle",
    certs_complete: "Die Hexe ist vollständig",
    certs_all_done: "Alle Zauber gemeistert ✦",

    exp_label:      "Aufgaben-Protokoll",
    exp_title:      "Erfahrung",
    exp_subtitle:   "Klicke ein Ziel, um dorthin zu reisen",
    exp_objectives: "Missionsziele",
    exp_skills:     "Freigeschaltete Fähigkeiten",
    exp_achievement:"Leistung",

    proj_label:     "Gewirkte Zauber",
    proj_title:     "Projekte",
    proj_subtitle:  "Jedes System — eine andere Art von Magie",
    proj_impact:    "Wirkung",
    proj_github:    "Auf GitHub ansehen ↗",
    proj_all:       "Alle Repositories auf GitHub ansehen",

    skills_label:   "Die Konstellation",
    skills_title:   "Fähigkeiten",
    skills_subtitle:"Hovere über Sterne — jede Gruppe ein Bereich",

    contact_label:  "Beschwören",
    contact_title:  "Nachricht senden",
    contact_subtitle:"Ob Projekt, Gelegenheit oder einfach Verbindung — ich höre zu.",
    contact_name:   "Dein Name",
    contact_email:  "Deine E-Mail",
    contact_msg:    "Deine Nachricht",
    contact_name_ph:"Stelle dich vor...",
    contact_email_ph:"Wohin soll ich antworten?",
    contact_msg_ph: "Sprich deine Absichten...",
    contact_send:   "✦  Nachricht senden  ✦",
    contact_sent_title: "Nachricht gesendet",
    contact_sent_sub:   "Deine Nachricht wurde gesendet. Antwort folgt bald.",
    contact_location:   "Noida, Indien · Offen für Remote-Möglichkeiten",
    contact_quote:  "Ich code, weil ich selbst der Wind sein möchte.",

    lang_toggle:    "Sprache",
    lang_en:        "English",
    lang_hi:        "हिंदी",
    lang_de:        "Deutsch",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
