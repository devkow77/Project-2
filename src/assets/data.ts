// Obrazki w header
const cardImages: string[] = [
  "/cards/card1.webp",
  "/cards/card2.webp",
  "/cards/card3.webp",
  "/cards/card4.webp",
  "/cards/card5.webp",
  "/cards/card6.webp",
  "/cards/card7.webp",
  "/cards/card8.webp",
  "/cards/card9.webp",
  "/cards/card10.webp",
];

// Nagrody w header
export interface Award {
  value: string;
  label: string;
  description: string;
}

const awards: Award[] = [
  {
    value: "4x",
    label: "Behance budgets",
    description: "for UX/UI & Brand Expertise",
  },
  {
    value: "2x",
    label: "Best Polish Rebranding",
    description: "Top 10 Finalist",
  },
  {
    value: "1x",
    label: "BrandNew",
    description: "Logomark Spotted",
  },
];

// Lista w header
const list: string[] = [
  "look x times bigger",
  "secure funding",
  "scale up",
  "stand out",
  "launch fast",
  "attract investors",
  "elevate your brand",
  "pitch ideas",
  "build trust",
];

// Work
export interface Work {
  img: string;
  bio: string;
  title: string;
  extra_info: {
    title: string;
    description: string;
  }[];
}

const work: Work[] = [
  {
    img: "/work/work1.webp",
    bio: "rebranding, website redesign, UI direction",
    title: "Unleashing the power of an updated e-commerce platform",
    extra_info: [
      {
        title: "2",
        description: "weeks for new UI design concept",
      },
      {
        title: "15",
        description: "master designs for IdoSell Team",
      },
    ],
  },
  {
    img: "/work/work2.webp",
    bio: "Rebranding, Copywriting, Pitch deck",
    title: "Getting most out of a founding round by looking 10x bigger",
    extra_info: [
      {
        title: "4",
        description: "weeks for rebranding",
      },
      {
        title: "$3M",
        description: "of funding collected subsequently",
      },
    ],
  },
  {
    img: "/work/work3.webp",
    bio: "UX/UI design, Icon Design, prototyping",
    title: "New in-store ordering experience for a global brand",
    extra_info: [
      {
        title: "100%",
        description: "complete ordering process designed",
      },
      {
        title: "54",
        description: "screens designed for developement",
      },
    ],
  },
  {
    img: "/work/work4.webp",
    bio: "rebranding, website redesign, icon design",
    title: "Securing EU funding for market expansion, fast!",
    extra_info: [
      {
        title: "4",
        description: "weeks for logo & key visual",
      },
      {
        title: "$0.8M",
        description: "of secured EU funding",
      },
    ],
  },
  {
    img: "/work/work5.webp",
    bio: "Naming, Branding, Website Design, social media",
    title: "Home broker’s personal brand built on vision and courage",
    extra_info: [
      {
        title: "0 to 1",
        description: "brand built from scratch",
      },
      {
        title: "6",
        description: "weeks for naming & branding",
      },
    ],
  },
];

export { cardImages, awards, list, work };
