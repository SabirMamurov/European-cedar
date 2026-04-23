export const siteConfig = {
  brand: {
    name: "Сибирский кедр",
    latinName: "Siberian Cedar",
    legalEntity: "ООО «Эко-фабрика Сибирский кедр»",
  },
  /**
   * EU sales contact (Roman) — primary contact for enquiries from the landing.
   * All form submissions are routed to `salesEmail`.
   */
  sales: {
    name: "Roman",
    email: "roman@cedartaste.eu",
    phone: "+420 608 217 684",
    phoneTel: "+420608217684",
  },
  contacts: {
    hotline: "8 800 100 3822",
    commercial: "8 (382) 296-03-93",
    email: "info@ecofactory.ru",
    address: "634593, Томская область, деревня Петрово, улица Луговая, 11",
    workingHours: "Пн-Пт: 07:00–17:00",
  },
  social: {
    vk: "https://vk.com/siberian_nuts",
    telegram: "https://t.me/siberian_cedar",
    youtube: "https://youtube.com/@SiberiaNuts",
    eshop: "https://siberia.eco",
  },
} as const;
