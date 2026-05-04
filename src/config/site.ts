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
  social: {
    telegram: "https://t.me/siberian_cedar",
    youtube: "https://youtube.com/@SiberiaNuts",
  },
} as const;
