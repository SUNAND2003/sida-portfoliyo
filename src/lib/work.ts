const imageMods = import.meta.glob<string>("../assets/work/*.jpg", {
  eager: true,
  import: "default",
});
const assetJsonMods = import.meta.glob<{ url: string }>("../assets/work/*.asset.json", {
  eager: true,
  import: "default",
});

const logoMods = import.meta.glob<string>("../assets/logos/*.{png,svg,jpg}", {
  eager: true,
  import: "default",
});

export interface LogoItem {
  id: string;
  name: string;
  category: string;
  bg: string;
  file: string;
  dark?: boolean;
}

export const logos: LogoItem[] = [
  {
    id: "logo-hug",
    name: "HUG",
    category: "Mascot & Character",
    bg: "#D4F3F0",
    file: "logo_hug.svg",
  },
  {
    id: "logo-crescent",
    name: "Crescent",
    category: "Food & Heritage",
    bg: "#FFFFFF",
    file: "logo_crescent.png",
  },
  {
    id: "logo-desk-to-road",
    name: "DESK TO ROAD",
    category: "Adventure & Travel",
    bg: "#1C3F3A",
    file: "logo_desk_to_road.svg",
    dark: true,
  },
  {
    id: "logo-guild-gable",
    name: "Guild & Gable",
    category: "Architecture & Interior",
    bg: "#FFFFFF",
    file: "logo_guild_gable.svg",
  },
  {
    id: "logo-nature-drops",
    name: "nature drops",
    category: "Pure Honey & Organic",
    bg: "#FAF7F2",
    file: "logo_nature_drops.png",
  },
  {
    id: "logo-nutrova",
    name: "Nutrova",
    category: "Wellness & Nutrition",
    bg: "#FFFFFF",
    file: "logo_nutrova.png",
  },
  {
    id: "logo-zleven",
    name: "24 ZLEVEN MEDIA",
    category: "Digital Media",
    bg: "#FFFFFF",
    file: "logo_zleven.svg",
  },
  {
    id: "logo-dhruv-krishna",
    name: "Dhruv Krishna",
    category: "Fashion & Lifestyle",
    bg: "#FFFFFF",
    file: "logo_dhruv_krishna.svg",
  },
  {
    id: "logo-billerica",
    name: "Billerica Age at Home",
    category: "Living & Community",
    bg: "#FFFFFF",
    file: "logo_billerica.svg",
  },
  {
    id: "logo-mocha",
    name: "MOCHA",
    category: "Artisan Coffee",
    bg: "#F3EBE2",
    file: "logo_mocha.png",
  },
  {
    id: "logo-y-studio",
    name: "Y · Organics",
    category: "Sustainable Living",
    bg: "#FFFFFF",
    file: "logo_y_studio.svg",
  },
  {
    id: "logo-golf-lab",
    name: "Golf Lab High Performance",
    category: "Athletics & Sports",
    bg: "#FFFFFF",
    file: "logo_golf_lab.svg",
  },
];

export const getLogoById = (id: string): LogoItem | undefined => logos.find((l) => l.id === id);

export const img = (id: string): string => {
  const logo = getLogoById(id);
  if (logo) {
    return logoMods[`../assets/logos/${logo.file}`] || `/logos/${logo.file}`;
  }
  return (
    imageMods[`../assets/work/w${id}.jpg`] ||
    assetJsonMods[`../assets/work/w${id}.jpg.asset.json`]?.url ||
    `/work-images/w${id}.jpg`
  );
};

export const categories = [
  {
    key: "logo",
    no: "01",
    title: "Logo Design",
    subtitle: "Logo Folio",
    ids: logos.map((l) => l.id),
  },
  {
    key: "branding",
    no: "02",
    title: "Branding",
    ids: ["060", "061", "062", "056", "047", "049"],
  },
  {
    key: "social",
    no: "03",
    title: "Social Media",
    ids: ["076", "075", "077", "086", "090", "096", "097", "100", "101", "104", "105"],
  },
  {
    key: "packaging",
    no: "04",
    title: "Packaging",
    ids: ["144", "130", "135", "150", "159", "140"],
  },
  {
    key: "print",
    no: "05",
    title: "Print Media",
    ids: ["114", "118", "122", "126", "146"],
  },
] as const;
