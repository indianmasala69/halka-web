export interface Package {
  id: string;
  name: string;
  price: number;
  priceDisplay: string;
  duration: string;
  durationWeeks: number;
  popular: boolean;
  description: string;
  features: string[];
  color: string;
}

export const packages: Package[] = [
  {
    id: "lose-5-10-kg",
    name: "Lose 5-10 kg",
    price: 7999,
    priceDisplay: "\u20B97,999",
    duration: "8 weeks",
    durationWeeks: 8,
    popular: false,
    description: "Kickstart your transformation with doctor-guided medication and coaching.",
    features: [
      "2 doctor video consultations (25 min each)",
      "Prescribed GLP-1 medication (8-week supply)",
      "Personalized Indian diet plan",
      "WhatsApp coaching support",
      "Progress tracking dashboard",
      "Free medication delivery",
    ],
    color: "#3B82F6",
  },
  {
    id: "lose-10-20-kg",
    name: "Lose 10-20 kg",
    price: 14999,
    priceDisplay: "\u20B914,999",
    duration: "16 weeks",
    durationWeeks: 16,
    popular: true,
    description: "Our most comprehensive weight loss program with full medical support.",
    features: [
      "4 doctor video consultations (25 min each)",
      "Prescribed GLP-1 medication (16-week supply)",
      "Personalized Indian diet plan",
      "Bi-weekly WhatsApp coaching",
      "Blood work monitoring (2 tests)",
      "Progress tracking dashboard",
      "Free medication delivery",
      "Nutritionist session (1x)",
    ],
    color: "#FF6B2C",
  },
  {
    id: "pre-wedding",
    name: "Pre-Wedding Package",
    price: 19999,
    priceDisplay: "\u20B919,999",
    duration: "12 weeks",
    durationWeeks: 12,
    popular: false,
    description: "Look and feel your absolute best for the big day with priority care.",
    features: [
      "Priority doctor scheduling",
      "6 doctor video consultations",
      "Prescribed medication (12-week supply)",
      "Dedicated nutritionist (weekly sessions)",
      "Weekly WhatsApp coaching",
      "Blood work monitoring (2 tests)",
      "Body composition analysis",
      "Progress tracking dashboard",
      "Free express medication delivery",
    ],
    color: "#9333EA",
  },
  {
    id: "pcos-weight-management",
    name: "PCOS Weight Management",
    price: 12999,
    priceDisplay: "\u20B912,999",
    duration: "12 weeks",
    durationWeeks: 12,
    popular: false,
    description: "Hormone-focused weight loss designed specifically for women with PCOS.",
    features: [
      "Endocrinologist consultation",
      "Hormone-targeted medication plan",
      "4 doctor follow-up consultations",
      "PCOS-specific diet plan",
      "Bi-weekly WhatsApp coaching",
      "Hormone panel blood work",
      "Progress tracking dashboard",
      "Free medication delivery",
    ],
    color: "#E91E8C",
  },
];
