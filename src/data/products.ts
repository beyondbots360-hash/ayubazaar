export interface Ingredient {
  name: string;
  sanskritName: string;
  property: string;
}

export interface Benefit {
  title: string;
  description: string;
  iconName: "Zap" | "ShieldCheck" | "Heart" | "Sparkles" | "Leaf" | "Flame" | "Activity" | "CheckCircle2";
}

export interface UsageStep {
  step: number;
  title: string;
  instruction: string;
  tip?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ProductDetail {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: string;
  dosha: string;
  price: string;
  originalPrice: string;
  discount: string;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  badge: string;
  description: string;
  shortDescription: string;
  longDescription: string;
  benefits: Benefit[];
  ingredients: Ingredient[];
  usageSteps: UsageStep[];
  faqs: FaqItem[];
  freeGift?: {
    name: string;
    subtitle: string;
    value: string;
    description: string;
    image: string;
  };
}

export const PRODUCTS: ProductDetail[] = [
  {
    id: "yameny-khalta",
    slug: "yameny-khalta",
    name: "Yameny Khalta with Honey",
    subtitle: "Traditional Royal Sidr Honey & Vitality Elixir (Includes FREE Lava 31 Gold)",
    category: "Rasayana & Vitality Tonic",
    dosha: "Balances Vata & Pitta",
    price: "₹1,499",
    originalPrice: "₹1,999",
    discount: "Save 25%",
    rating: 4.9,
    reviewCount: 363,
    image: "/images/products/yameny-khalta-combo.jpg",
    gallery: [
      "/images/products/yameny-khalta-combo.jpg",
      "/images/products/yameny-khalta.png",
      "/images/products/lava-31-gold.png",
    ],
    badge: "Includes FREE Lava 31 Gold",
    description:
      "A traditional royal Sidr honey formulation combined with natural Rasayana herbs. Every order includes a complimentary full-size bottle of Lava 31 Gold Men's Vitality Oil.",
    shortDescription:
      "A traditional royal Sidr honey formulation crafted for daily energy and stamina. Comes with a complimentary Lava 31 Gold Men's Vitality Oil.",
    longDescription:
      "Yameny Khalta with Honey is a centuries-old royal wellness recipe that combines wild-harvested Yemeni Sidr Honey with potent restorative herbs including Ashwagandha, Safed Musli, Royal Jelly, and selected dry fruits. In this special wellness segment, every jar of Yameny Khalta comes bundled with a complimentary full-size bottle of Lava 31 Gold Ayurvedic Massage Oil (formulated with Swarna Bhasma and Shilajit), delivering a complete internal and external vitality routine.",
    freeGift: {
      name: "Lava 31 Gold",
      subtitle: "Ayurvedic Men's Wellness & Vigor Oil",
      value: "₹1,899",
      description: "Infused with Swarna Bhasma, Shilajit & 31 botanical herbs for local blood flow, tone, and sustained male vigor.",
      image: "/images/products/lava-31-gold.png",
    },
    benefits: [
      {
        iconName: "Zap",
        title: "Sustained Natural Energy",
        description:
          "Replenishes cellular vigor and vitality without caffeine spikes, crashes, or artificial stimulants.",
      },
      {
        iconName: "Flame",
        title: "Includes FREE Lava 31 Gold (₹1,899 Value)",
        description:
          "Enjoy complete internal nourishment with pure Sidr honey alongside external vigor with complimentary Lava 31 Gold oil.",
      },
      {
        iconName: "ShieldCheck",
        title: "Immunity & Ojas Booster",
        description:
          "Infused with rare Sidr honey antioxidants and royal jelly nutrients that strengthen your natural immune shield.",
      },
      {
        iconName: "Sparkles",
        title: "Restorative Rasayana Herbs",
        description:
          "Formulated with Ashwagandha and Safed Musli to promote physical strength, mental resilience, and rejuvenation.",
      },
    ],
    ingredients: [
      {
        name: "Yemeni Sidr Honey",
        sanskritName: "Madhu (Sidr)",
        property: "World's most revered medicinal honey, rich in flavonoids and natural enzymes.",
      },
      {
        name: "Ashwagandha",
        sanskritName: "Withania Somnifera",
        property: "Premier adaptogen that balances cortisol, promotes stamina, and reduces fatigue.",
      },
      {
        name: "Safed Musli",
        sanskritName: "Chlorophytum Borivilianum",
        property: "Traditional Rasayana herb prized for tissue replenishment and physical vigor.",
      },
      {
        name: "Royal Jelly",
        sanskritName: "Raj Madhu",
        property: "Nutrient powerhouse rich in B-vitamins, amino acids, and essential trace minerals.",
      },
      {
        name: "Shuddha Shilajit & Swarna Bhasma (In Free Lava 31 Gold)",
        sanskritName: "Shilajit & Swarna Bhasma",
        property: "Enriched minerals and micro-calcined gold ash for deep tissue tone and external vigor.",
      },
      {
        name: "Pure Saffron & Almonds",
        sanskritName: "Kesar & Vatada",
        property: "Precious golden spice and natural fats for radiance, mood, and sustained tissue fuel.",
      },
    ],
    usageSteps: [
      {
        step: 1,
        title: "Morning Elixir (Yameny Khalta)",
        instruction: "Take 1 tablespoon (approx. 10g-15g) of Yameny Khalta followed by a cup of warm milk or water.",
        tip: "Best consumed in the morning with breakfast to fuel all-day vigor and stamina.",
      },
      {
        step: 2,
        title: "Night Routine (Free Lava 31 Gold)",
        instruction: "Dispense 5 to 7 drops of the complimentary Lava 31 Gold Oil onto palms and massage gently until absorbed.",
        tip: "Apply once daily at bedtime to ease muscular tension and support localized blood flow.",
      },
      {
        step: 3,
        title: "Consistent 45-60 Day Course",
        instruction: "Use both products consistently together to experience the synergistic benefits of internal and external Ayurveda.",
        tip: "Store Yameny Khalta at room temperature (do not refrigerate). Keep Lava 31 Gold tightly capped.",
      },
    ],
    faqs: [
      {
        question: "Is Lava 31 Gold really included free with Yameny Khalta?",
        answer:
          "Yes! Under our exclusive vitality segment, every order of Yameny Khalta with Honey includes a full-size complimentary bottle of Lava 31 Gold Men's Wellness Oil at no additional cost.",
      },
      {
        question: "How do Yameny Khalta and Lava 31 Gold work together?",
        answer:
          "They form a complete holistic synergy: Yameny Khalta nourishes your body internally through pure Sidr honey, Ashwagandha, and Safed Musli, while Lava 31 Gold works externally through 31 botanical oils and Shilajit to support localized tone and circulation.",
      },
      {
        question: "What makes Yameny Khalta different from regular honey?",
        answer:
          "Yameny Khalta is not ordinary table honey. It is an authentic herbal Rasayana combining pure Yemeni Sidr honey with concentrated extracts of Ashwagandha, Safed Musli, Royal Jelly, and Saffron.",
      },
      {
        question: "How long does one combo pack last?",
        answer:
          "With the recommended daily dosage of 1 tablespoon of Khalta and 5-7 drops of Lava 31 Gold, the combo package provides approximately 30 days of consistent daily use.",
      },
      {
        question: "Is the shipping packaging discreet?",
        answer:
          "Yes. All orders are packed in discreet, tamper-proof outer boxes without any sensitive product details on the shipping label.",
      },
      {
        question: "Can I order via Cash on Delivery (COD)?",
        answer:
          "We offer secure prepaid online payment via Razorpay with fast dispatch, as well as assistance via WhatsApp for express delivery inquiries.",
      },
    ],
  },
  {
    id: "shivshakti-churna",
    slug: "shivshakti-churna",
    name: "Shivshakti Ayurvedic Churna",
    subtitle: "Herbal Digestive & Detox Wellness Powder",
    category: "Deepana & Pachana Detox",
    dosha: "Balances Vata & Pitta",
    price: "₹799",
    originalPrice: "₹1,099",
    discount: "Save 27%",
    rating: 4.9,
    reviewCount: 310,
    image: "/images/products/shivshakti-churna.png",
    gallery: [
      "/images/products/shivshakti-churna.png",
      "/images/hero/hero-products.png",
      "/images/banner-leaves.png",
    ],
    badge: "Pure Herbal Detox",
    description:
      "A unique blend of time-tested herbs including Triphala, Saunf, and Ajwain to support digestion, relieve gas, and promote gentle daily cleansing.",
    shortDescription:
      "A unique blend of time-tested herbs to support digestion, relieve bloating, and promote daily gut wellness.",
    longDescription:
      "Shivshakti Ayurvedic Churna is a classical digestive and gut-cleansing formulation composed of revered Ayurvedic carminatives. Blending Haritaki, Bibhitaki, Amalaki (Triphala), Saunf, Ajwain, Hing, and rock salts, it naturally relieves bloating, hyper-acidity, constipation, and metabolic sluggishness without causing dependency or cramping.",
    benefits: [
      {
        iconName: "Leaf",
        title: "Gentle Gut Detoxification",
        description:
          "Triphala gently flushes built-up toxins (Ama) from the intestinal tract without griping or sudden urgency.",
      },
      {
        iconName: "Sparkles",
        title: "Rapid Gas & Acidity Relief",
        description:
          "Infused with Ajwain and Hing to quickly relieve flatulence, belching, and sour digestive discomfort.",
      },
      {
        iconName: "ShieldCheck",
        title: "Non-Habit Forming Formula",
        description:
          "Free from harsh chemical stimulants and habit-forming senna. Safe for regular digestive balancing.",
      },
      {
        iconName: "CheckCircle2",
        title: "Balances Digestive Fire (Agni)",
        description:
          "Stimulates gastric enzymes naturally to ensure thorough digestion and smooth nutrient absorption.",
      },
    ],
    ingredients: [
      {
        name: "Triphala (Haritaki, Bibhitaki, Amalaki)",
        sanskritName: "Triphala",
        property: "The cornerstone Ayurvedic cleansing trio for balanced peristalsis and colon health.",
      },
      {
        name: "Ajwain (Carom Seeds)",
        sanskritName: "Trachyspermum ammi",
        property: "Potent carminative that dissipates gas, eases spasmodic cramps, and stimulates appetite.",
      },
      {
        name: "Saunf (Fennel Seeds)",
        sanskritName: "Foeniculum vulgare",
        property: "Cooling digestive seed that relieves acid reflux and freshens the digestive tract.",
      },
      {
        name: "Hing (Purified Asafoetida)",
        sanskritName: "Shuddha Hingu",
        property: "Time-tested remedy for deep abdominal flatulence and digestive sluggishness.",
      },
      {
        name: "Sendha Namak (Rock Salt)",
        sanskritName: "Saindhava Lavana",
        property: "Mineral-rich Ayurvedic salt that balances electrolyte hydration and kindles digestive fire.",
      },
      {
        name: "Jeera (Cumin Seeds)",
        sanskritName: "Cuminum cyminum",
        property: "Promotes enzyme secretion in the pancreas and aids nutrient assimilation.",
      },
    ],
    usageSteps: [
      {
        step: 1,
        title: "Measure Half to One Spoon",
        instruction: "Take 1/2 to 1 teaspoon (approx. 3g-5g) of Shivshakti Churna.",
        tip: "Start with 1/2 teaspoon for the first 3 days to allow your digestive tract to adjust.",
      },
      {
        step: 2,
        title: "Lukewarm Water",
        instruction: "Mix with a glass of lukewarm water or swallow directly followed by water.",
        tip: "Best consumed at bedtime, at least 45 minutes after your evening dinner.",
      },
      {
        step: 3,
        title: "Wake Up Refreshed",
        instruction: "Enjoy effortless, complete morning elimination and a light, energized stomach.",
        tip: "Drink adequate water throughout the day for optimal detoxification benefits.",
      },
    ],
    faqs: [
      {
        question: "Is Shivshakti Churna habit-forming?",
        answer:
          "No. Unlike synthetic chemical laxatives, Shivshakti Churna works by balancing natural digestive enzymes (Agni) and soothing the mucosal lining. It does not weaken natural bowel motility and is non-habit forming.",
      },
      {
        question: "When is the ideal time to take it?",
        answer:
          "The best time to take Shivshakti Churna is at night before bed, 45 to 60 minutes after dinner, mixed with a cup of lukewarm water.",
      },
      {
        question: "Can it be taken for chronic acidity and bloating?",
        answer:
          "Yes, the combination of Saunf, Ajwain, and Triphala specifically targets excess Pitta (heat/acidity) and sluggish Vata in the gastrointestinal tract, offering soothing relief.",
      },
      {
        question: "Does it cause stomach cramps or sudden urgency?",
        answer:
          "No. The herbs are balanced with Sendha Namak and Saunf to ensure gentle, comfortable morning evacuation without painful abdominal spasms or sudden urgency.",
      },
      {
        question: "Can I take it daily?",
        answer:
          "Yes, it is designed for safe daily use during periods of digestive distress or as a periodic detoxifier for 30 to 60 days.",
      },
      {
        question: "How is it packaged and shipped?",
        answer:
          "It is securely packed in an airtight food-grade container with moisture-locking seal to retain botanical freshness and aroma.",
      },
    ],
  },
  {
    id: "rahmorid-sugar-powder",
    slug: "rahmorid-sugar-powder",
    name: "Rahmorid Sugar Powder",
    subtitle: "Ayurvedic Blood Sugar & Metabolic Health Formulation",
    category: "Madhumeha & Glucose Care",
    dosha: "Balances Kapha & Pitta",
    price: "₹899",
    originalPrice: "₹1,299",
    discount: "Save 31%",
    rating: 4.8,
    reviewCount: 214,
    image: "/images/products/rahmorid-sugar-powder.jpg",
    gallery: [
      "/images/products/rahmorid-sugar-powder.jpg",
      "/images/hero/hero-products.png",
      "/images/banner-leaves.png",
    ],
    badge: "Glucose Balance",
    description:
      "A classical Ayurvedic formulation crafted with bitter-tonic botanicals including Karela, Jamun, Gurmar, and Methi to maintain healthy blood glucose levels and curb sugar cravings.",
    shortDescription:
      "Traditional Ayurvedic herbal powder to support healthy blood sugar levels, pancreatic vitality, and daily metabolic wellness.",
    longDescription:
      "Rahmorid Sugar Powder is a classical Ayurvedic formulation specifically developed to support healthy carbohydrate metabolism and balanced blood glucose levels. Harnessing revered Deepana-Pachana and Tikta (bitter) herbs—including Jamun seed, Karela (bitter gourd), Gurmar (Gymnema Sylvestre), Methi, and Vijaysar—it aids the body's natural insulin sensitivity, reduces stubborn sweet cravings, and counters glycemic fatigue without harsh side effects.",
    benefits: [
      {
        iconName: "Activity",
        title: "Balanced Blood Sugar Levels",
        description:
          "Synergistic bitter-tonic herbs help regulate post-meal glucose spikes and promote steady daily glycemic balance.",
      },
      {
        iconName: "ShieldCheck",
        title: "Curtails Sugar & Carb Cravings",
        description:
          "Gurmar ('Sugar Destroyer') temporarily desensitizes sweet taste buds and assists in curbing unhealthy sugar temptations.",
      },
      {
        iconName: "Flame",
        title: "Rejuvenates Pancreatic Vitality",
        description:
          "Enriched with Vijaysar and Karela to nourish pancreatic beta cells and enhance natural metabolic efficiency.",
      },
      {
        iconName: "Zap",
        title: "Counters Glycemic Fatigue",
        description:
          "Supports cellular glucose absorption so food is converted into sustained, clean daytime vitality rather than lethargy.",
      },
    ],
    ingredients: [
      {
        name: "Karela (Bitter Gourd)",
        sanskritName: "Momordica Charantia",
        property: "Rich in Charantin & Polypeptide-p, natural plant compounds that aid insulin-like glucose uptake.",
      },
      {
        name: "Jamun Seed",
        sanskritName: "Syzygium Cumini",
        property: "Contains Jamboline glycoside which prevents the excessive enzymatic conversion of starch into sugar.",
      },
      {
        name: "Gurmar",
        sanskritName: "Gymnema Sylvestre",
        property: "Revered as Meshashringi; reduces intestinal sugar absorption and supports healthy beta-cell function.",
      },
      {
        name: "Methi (Fenugreek)",
        sanskritName: "Trigonella Foenum-Graecum",
        property: "High in galactomannan soluble fiber to improve insulin sensitivity and slow carbohydrate digestion.",
      },
      {
        name: "Vijaysar",
        sanskritName: "Pterocarpus Marsupium",
        property: "Ancient Rasayana wood praised in Charaka Samhita for pancreatic support and healthy lipid metabolism.",
      },
      {
        name: "Neem",
        sanskritName: "Azadirachta Indica",
        property: "Potent bitter alterative that cleanses the bloodstream and revitalizes hepatic metabolic functions.",
      },
    ],
    usageSteps: [
      {
        step: 1,
        title: "Measure One Spoon",
        instruction: "Take 1 level teaspoon (approx. 3g-5g) of Rahmorid Sugar Powder.",
        tip: "Consistent daily timing produces the strongest synergistic results.",
      },
      {
        step: 2,
        title: "Mix with Lukewarm Water",
        instruction: "Stir well into half a glass of lukewarm water until dissolved.",
        tip: "Take 30 minutes before breakfast in the morning and 30 minutes before dinner at night.",
      },
      {
        step: 3,
        title: "Track Your Progress",
        instruction: "Consume twice daily alongside a wholesome diet and regular hydration.",
        tip: "Check blood glucose levels periodically to monitor your ongoing positive health response.",
      },
    ],
    faqs: [
      {
        question: "Can I take Rahmorid Sugar Powder with my allopathic diabetes medicines?",
        answer:
          "Yes. Maintain a 45-60 minute gap between taking Rahmorid Sugar Powder and your prescribed allopathic medicines. Always monitor your blood sugar regularly and consult your healthcare provider.",
      },
      {
        question: "How long does one bottle last?",
        answer:
          "With the recommended dosage of 1 teaspoon twice daily, one jar provides approximately a 30-day supply.",
      },
      {
        question: "Are there any added sugars or artificial additives?",
        answer:
          "Absolutely not. Rahmorid Sugar Powder contains 100% pure botanical extracts and dried herbal powders with zero added sugar, artificial sweeteners, chemicals, or preservatives.",
      },
      {
        question: "How soon can I expect results?",
        answer:
          "Many customers notice reduced cravings and improved digestion within 10 to 14 days. For optimal glycemic and metabolic stability, regular use for 60 to 90 days alongside a balanced lifestyle is recommended.",
      },
      {
        question: "How is it packaged and shipped?",
        answer:
          "Packaged in a secure, tamper-proof food-grade bottle with an airtight inner seal to keep herbs potent and moisture-free during transit.",
      },
    ],
  },
];

export function getProductBySlug(slug: string): ProductDetail | undefined {
  if (slug === "lava31-gold") {
    // Alias to yameny-khalta since Lava 31 Gold is free with it
    return PRODUCTS.find((p) => p.slug === "yameny-khalta");
  }
  return PRODUCTS.find((p) => p.slug === slug);
}
