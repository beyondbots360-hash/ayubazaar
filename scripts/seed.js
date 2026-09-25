const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Auto-load .env.local if present
try {
  const envPath = path.resolve(__dirname, '../.env.local');
  if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = (match[2] || '').trim();
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        if (!process.env[key]) process.env[key] = value;
      }
    });
  }
} catch (e) {}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://filfttapnwwpxaerappq.supabase.co';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!serviceRoleKey) {
  console.error("Missing SUPABASE_SERVICE_ROLE_KEY in environment or .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

const SEED_PRODUCTS = [
  {
    slug: "yameny-khalta",
    name: "Yameny Khalta with Honey",
    subtitle: "Traditional Royal Sidr Honey & Vitality Elixir (Includes FREE Lava 31 Gold)",
    category: "Rasayana & Vitality Tonic",
    dosha: "Balances Vata & Pitta",
    price: 1499,
    original_price: 1999,
    discount: "Save 25%",
    rating: 4.9,
    review_count: 363,
    image: "/images/products/yameny-khalta-combo.jpg",
    badge: "Includes FREE Lava 31 Gold",
    short_description: "A traditional royal Sidr honey formulation crafted for daily energy and stamina. Every order includes a complimentary full-size Lava 31 Gold Men's Vitality Oil.",
    long_description: "Yameny Khalta with Honey is a centuries-old royal wellness recipe that combines wild-harvested Yemeni Sidr Honey with potent restorative herbs including Ashwagandha, Safed Musli, Royal Jelly, and selected dry fruits. In this special vitality segment, every jar of Yameny Khalta comes bundled with a complimentary full-size bottle of Lava 31 Gold Ayurvedic Massage Oil (formulated with Swarna Bhasma and Shilajit), delivering a complete internal and external vitality routine.",
    in_stock: true,
    benefits: [
      { icon_name: "Zap", title: "Sustained Natural Energy", description: "Replenishes cellular vigor and vitality without caffeine spikes, crashes, or artificial stimulants.", sort_order: 1 },
      { icon_name: "Flame", title: "Includes FREE Lava 31 Gold (₹1,899 Value)", description: "Enjoy complete internal nourishment with pure Sidr honey alongside external vigor with complimentary Lava 31 Gold oil.", sort_order: 2 },
      { icon_name: "ShieldCheck", title: "Immunity & Ojas Booster", description: "Infused with rare Sidr honey antioxidants and royal jelly nutrients that strengthen your natural immune shield.", sort_order: 3 },
      { icon_name: "Sparkles", title: "Restorative Rasayana Herbs", description: "Formulated with Ashwagandha and Safed Musli to promote physical strength, mental resilience, and rejuvenation.", sort_order: 4 }
    ],
    ingredients: [
      { name: "Yemeni Sidr Honey", sanskrit_name: "Madhu (Sidr)", property: "World's most revered medicinal honey, rich in flavonoids and natural enzymes.", sort_order: 1 },
      { name: "Ashwagandha", sanskrit_name: "Withania Somnifera", property: "Premier adaptogen that balances cortisol, promotes stamina, and reduces fatigue.", sort_order: 2 },
      { name: "Safed Musli", sanskrit_name: "Chlorophytum Borivilianum", property: "Traditional Rasayana herb prized for tissue replenishment and physical vigor.", sort_order: 3 },
      { name: "Royal Jelly", sanskrit_name: "Raj Madhu", property: "Nutrient powerhouse rich in B-vitamins, amino acids, and essential trace minerals.", sort_order: 4 },
      { name: "Shuddha Shilajit & Swarna Bhasma (In Free Lava 31 Gold)", sanskrit_name: "Shilajit & Swarna Bhasma", property: "Enriched minerals and micro-calcined gold ash for deep tissue tone and external vigor.", sort_order: 5 },
      { name: "Pure Saffron & Almonds", sanskrit_name: "Kesar & Vatada", property: "Precious golden spice and natural fats for radiance, mood, and sustained tissue fuel.", sort_order: 6 }
    ],
    usage_steps: [
      { step: 1, title: "Morning Elixir (Yameny Khalta)", instruction: "Take 1 tablespoon (approx. 10g-15g) of Yameny Khalta followed by a cup of warm milk or water.", tip: "Best consumed in the morning with breakfast to fuel all-day vigor and stamina.", sort_order: 1 },
      { step: 2, title: "Night Routine (Free Lava 31 Gold)", instruction: "Dispense 5 to 7 drops of the complimentary Lava 31 Gold Oil onto palms and massage gently until absorbed.", tip: "Apply once daily at bedtime to ease muscular tension and support localized blood flow.", sort_order: 2 },
      { step: 3, title: "Consistent 45-60 Day Course", instruction: "Use both products consistently together to experience the synergistic benefits of internal and external Ayurveda.", tip: "Store Yameny Khalta at room temperature (do not refrigerate). Keep Lava 31 Gold tightly capped.", sort_order: 3 }
    ],
    faqs: [
      { question: "Is Lava 31 Gold really included free with Yameny Khalta?", answer: "Yes! Under our exclusive vitality segment, every order of Yameny Khalta with Honey includes a full-size complimentary bottle of Lava 31 Gold Men's Wellness Oil at no additional cost.", sort_order: 1 },
      { question: "How do Yameny Khalta and Lava 31 Gold work together?", answer: "They form a complete holistic synergy: Yameny Khalta nourishes your body internally through pure Sidr honey, Ashwagandha, and Safed Musli, while Lava 31 Gold works externally through 31 botanical oils and Shilajit to support localized tone and circulation.", sort_order: 2 },
      { question: "What makes Yameny Khalta different from regular honey?", answer: "Yameny Khalta is not ordinary table honey. It is an authentic herbal Rasayana combining pure Yemeni Sidr honey with concentrated extracts of Ashwagandha, Safed Musli, Royal Jelly, and Saffron.", sort_order: 3 },
      { question: "How long does one combo pack last?", answer: "With the recommended daily dosage of 1 tablespoon of Khalta and 5-7 drops of Lava 31 Gold, the combo package provides approximately 30 days of consistent daily use.", sort_order: 4 },
      { question: "Is the shipping packaging discreet?", answer: "Yes. All orders are packed in discreet, tamper-proof outer boxes without any sensitive product details on the shipping label.", sort_order: 5 },
      { question: "Can I order via Cash on Delivery (COD)?", answer: "We offer secure prepaid online payment via Razorpay with fast dispatch, as well as assistance via WhatsApp for express delivery inquiries.", sort_order: 6 }
    ]
  },
  {
    slug: "shivshakti-churna",
    name: "Shivshakti Ayurvedic Churna",
    subtitle: "Herbal Digestive & Detox Wellness Powder",
    category: "Deepana & Pachana Detox",
    dosha: "Balances Vata & Pitta",
    price: 799,
    original_price: 1099,
    discount: "Save 27%",
    rating: 4.9,
    review_count: 310,
    image: "/images/products/shivshakti-churna.png",
    badge: "Pure Herbal Detox",
    short_description: "A unique blend of time-tested herbs including Triphala, Saunf, and Ajwain to support digestion, relieve gas, and promote gentle daily cleansing.",
    long_description: "Shivshakti Ayurvedic Churna is a classical digestive and gut-cleansing formulation composed of revered Ayurvedic carminatives. Blending Haritaki, Bibhitaki, Amalaki (Triphala), Saunf, Ajwain, Hing, and rock salts, it naturally relieves bloating, hyper-acidity, constipation, and metabolic sluggishness without causing dependency or cramping.",
    in_stock: true,
    benefits: [
      { icon_name: "Leaf", title: "Gentle Gut Detoxification", description: "Triphala gently flushes built-up toxins (Ama) from the intestinal tract without griping or sudden urgency.", sort_order: 1 },
      { icon_name: "Sparkles", title: "Rapid Gas & Acidity Relief", description: "Infused with Ajwain and Hing to quickly relieve flatulence, belching, and sour digestive discomfort.", sort_order: 2 },
      { icon_name: "ShieldCheck", title: "Non-Habit Forming Formula", description: "Free from harsh chemical stimulants and habit-forming senna. Safe for regular digestive balancing.", sort_order: 3 },
      { icon_name: "CheckCircle2", title: "Balances Digestive Fire (Agni)", description: "Stimulates gastric enzymes naturally to ensure thorough digestion and smooth nutrient absorption.", sort_order: 4 }
    ],
    ingredients: [
      { name: "Triphala (Amla, Harad, Baheda)", sanskrit_name: "Phalatrikam", property: "The cornerstone of Ayurvedic gut health, providing gentle cleansing and colon nourishment.", sort_order: 1 },
      { name: "Ajwain (Carom Seeds)", sanskrit_name: "Trachyspermum ammi", property: "Potent carminative that dissipates gas, eases spasmodic cramps, and stimulates appetite.", sort_order: 2 },
      { name: "Saunf (Fennel Seeds)", sanskrit_name: "Foeniculum vulgare", property: "Cooling digestive seed that relieves acid reflux and freshens the digestive tract.", sort_order: 3 },
      { name: "Hing (Purified Asafoetida)", sanskrit_name: "Shuddha Hingu", property: "Time-tested remedy for deep abdominal flatulence and digestive sluggishness.", sort_order: 4 },
      { name: "Sendha Namak (Rock Salt)", sanskrit_name: "Saindhava Lavana", property: "Mineral-rich Ayurvedic salt that balances electrolyte hydration and kindles digestive fire.", sort_order: 5 },
      { name: "Jeera (Cumin Seeds)", sanskrit_name: "Cuminum cyminum", property: "Promotes enzyme secretion in the pancreas and aids nutrient assimilation.", sort_order: 6 }
    ],
    usage_steps: [
      { step: 1, title: "Measure Half to One Spoon", instruction: "Take 1/2 to 1 teaspoon (approx. 3g-5g) of Shivshakti Churna.", tip: "Start with 1/2 teaspoon for the first 3 days to allow your digestive tract to adjust.", sort_order: 1 },
      { step: 2, title: "Lukewarm Water", instruction: "Mix with a glass of lukewarm water or swallow directly followed by water.", tip: "Best consumed at bedtime, at least 45 minutes after your evening dinner.", sort_order: 2 },
      { step: 3, title: "Wake Up Refreshed", instruction: "Enjoy effortless, complete morning elimination and a light, energized stomach.", tip: "Drink adequate water throughout the day for optimal detoxification benefits.", sort_order: 3 }
    ],
    faqs: [
      { question: "Is Shivshakti Churna habit-forming?", answer: "No. Unlike synthetic chemical laxatives, Shivshakti Churna works by balancing natural digestive enzymes (Agni) and soothing the mucosal lining. It does not weaken natural bowel motility and is non-habit forming.", sort_order: 1 },
      { question: "When is the ideal time to take it?", answer: "The best time to take Shivshakti Churna is at night before bed, 45 to 60 minutes after dinner, mixed with a cup of lukewarm water.", sort_order: 2 },
      { question: "Can it be taken for chronic acidity and bloating?", answer: "Yes, the combination of Saunf, Ajwain, and Triphala specifically targets excess Pitta (heat/acidity) and sluggish Vata in the gastrointestinal tract, offering soothing relief.", sort_order: 3 },
      { question: "Does it cause stomach cramps or sudden urgency?", answer: "No. The herbs are balanced with Sendha Namak and Saunf to ensure gentle, comfortable morning evacuation without painful abdominal spasms or sudden urgency.", sort_order: 4 },
      { question: "Can I take it daily?", answer: "Yes, it is designed for safe daily use during periods of digestive distress or as a periodic detoxifier for 30 to 60 days.", sort_order: 5 },
      { question: "How is it packaged and shipped?", answer: "It is securely packed in an airtight food-grade container with moisture-locking seal to retain botanical freshness and aroma.", sort_order: 6 }
    ]
  },
  {
    slug: "rahmorid-sugar-powder",
    name: "Rahmorid Sugar Powder",
    subtitle: "Ayurvedic Blood Sugar & Metabolic Health Formulation",
    category: "Madhumeha & Glucose Care",
    dosha: "Balances Kapha & Pitta",
    price: 899,
    original_price: 1299,
    discount: "Save 31%",
    rating: 4.8,
    review_count: 214,
    image: "/images/products/rahmorid-sugar-powder.jpg",
    badge: "Glucose Balance",
    short_description: "Traditional Ayurvedic herbal powder to support healthy blood sugar levels, pancreatic vitality, and daily metabolic wellness.",
    long_description: "Rahmorid Sugar Powder is a classical Ayurvedic formulation specifically developed to support healthy carbohydrate metabolism and balanced blood glucose levels. Harnessing revered Deepana-Pachana and Tikta (bitter) herbs—including Jamun seed, Karela (bitter gourd), Gurmar (Gymnema Sylvestre), Methi, and Vijaysar—it aids the body's natural insulin sensitivity, reduces stubborn sweet cravings, and counters glycemic fatigue without harsh side effects.",
    in_stock: true,
    benefits: [
      { icon_name: "Activity", title: "Balanced Blood Sugar Levels", description: "Synergistic bitter-tonic herbs help regulate post-meal glucose spikes and promote steady daily glycemic balance.", sort_order: 1 },
      { icon_name: "ShieldCheck", title: "Curtails Sugar & Carb Cravings", description: "Gurmar ('Sugar Destroyer') temporarily desensitizes sweet taste buds and assists in curbing unhealthy sugar temptations.", sort_order: 2 },
      { icon_name: "Flame", title: "Rejuvenates Pancreatic Vitality", description: "Enriched with Vijaysar and Karela to nourish pancreatic beta cells and enhance natural metabolic efficiency.", sort_order: 3 },
      { icon_name: "Zap", title: "Counters Glycemic Fatigue", description: "Supports cellular glucose absorption so food is converted into sustained, clean daytime vitality rather than lethargy.", sort_order: 4 }
    ],
    ingredients: [
      { name: "Karela (Bitter Gourd)", sanskrit_name: "Momordica Charantia", property: "Rich in Charantin & Polypeptide-p, natural plant compounds that aid insulin-like glucose uptake.", sort_order: 1 },
      { name: "Jamun Seed", sanskrit_name: "Syzygium Cumini", property: "Contains Jamboline glycoside which prevents the excessive enzymatic conversion of starch into sugar.", sort_order: 2 },
      { name: "Gurmar", sanskrit_name: "Gymnema Sylvestre", property: "Revered as Meshashringi; reduces intestinal sugar absorption and supports healthy beta-cell function.", sort_order: 3 },
      { name: "Methi (Fenugreek)", sanskrit_name: "Trigonella Foenum-Graecum", property: "High in galactomannan soluble fiber to improve insulin sensitivity and slow carbohydrate digestion.", sort_order: 4 },
      { name: "Vijaysar", sanskrit_name: "Pterocarpus Marsupium", property: "Ancient Rasayana wood praised in Charaka Samhita for pancreatic support and healthy lipid metabolism.", sort_order: 5 },
      { name: "Neem", sanskrit_name: "Azadirachta Indica", property: "Potent bitter alterative that cleanses the bloodstream and revitalizes hepatic metabolic functions.", sort_order: 6 }
    ],
    usage_steps: [
      { step: 1, title: "Measure One Spoon", instruction: "Take 1 level teaspoon (approx. 3g-5g) of Rahmorid Sugar Powder.", tip: "Consistent daily timing produces the strongest synergistic results.", sort_order: 1 },
      { step: 2, title: "Mix with Lukewarm Water", instruction: "Stir well into half a glass of lukewarm water until dissolved.", tip: "Take 30 minutes before breakfast in the morning and 30 minutes before dinner at night.", sort_order: 2 },
      { step: 3, title: "Track Your Progress", instruction: "Consume twice daily alongside a wholesome diet and regular hydration.", tip: "Check blood glucose levels periodically to monitor your ongoing positive health response.", sort_order: 3 }
    ],
    faqs: [
      { question: "Can I take Rahmorid Sugar Powder with my allopathic diabetes medicines?", answer: "Yes. Maintain a 45-60 minute gap between taking Rahmorid Sugar Powder and your prescribed allopathic medicines. Always monitor your blood sugar regularly and consult your healthcare provider.", sort_order: 1 },
      { question: "How long does one bottle last?", answer: "With the recommended dosage of 1 teaspoon twice daily, one jar provides approximately a 30-day supply.", sort_order: 2 },
      { question: "Are there any added sugars or artificial additives?", answer: "Absolutely not. Rahmorid Sugar Powder contains 100% pure botanical extracts and dried herbal powders with zero added sugar, artificial sweeteners, chemicals, or preservatives.", sort_order: 3 },
      { question: "How soon can I expect results?", answer: "Many customers notice reduced cravings and improved digestion within 10 to 14 days. For optimal glycemic and metabolic stability, regular use for 60 to 90 days alongside a balanced lifestyle is recommended.", sort_order: 4 },
      { question: "How is it packaged and shipped?", answer: "Packaged in a secure, tamper-proof food-grade bottle with an airtight inner seal to keep herbs potent and moisture-free during transit.", sort_order: 5 }
    ]
  }
];

async function seed() {
  console.log("Seeding Ayubazaar database in Supabase for 3 products...");

  // 1. Mark standalone lava31-gold product as bundled or remove it from the active standalone catalog
  const { data: lavaProd } = await supabase.from('products').select('id').eq('slug', 'lava31-gold').single();
  if (lavaProd) {
    // Delete child relations for standalone lava31-gold
    await supabase.from('product_benefits').delete().eq('product_id', lavaProd.id);
    await supabase.from('product_ingredients').delete().eq('product_id', lavaProd.id);
    await supabase.from('product_usage_steps').delete().eq('product_id', lavaProd.id);
    await supabase.from('product_faqs').delete().eq('product_id', lavaProd.id);
    // Delete the standalone row from products so the storefront only sees the 2 active products
    await supabase.from('products').delete().eq('id', lavaProd.id);
    console.log("Consolidated standalone Lava 31 Gold into Yameny Khalta bundle.");
  }

  // 2. Upsert the 2 core products
  for (const item of SEED_PRODUCTS) {
    const { benefits, ingredients, usage_steps, faqs, ...productData } = item;

    const { data: existing } = await supabase
      .from('products')
      .select('id')
      .eq('slug', productData.slug)
      .single();

    let productId = existing ? existing.id : null;

    if (!productId) {
      const { data: inserted, error: pErr } = await supabase
        .from('products')
        .insert(productData)
        .select('id')
        .single();

      if (pErr) {
        console.error(`Error inserting product ${productData.slug}:`, pErr);
        continue;
      }
      productId = inserted.id;
      console.log(`Created product: ${productData.name} (${productId})`);
    } else {
      await supabase
        .from('products')
        .update(productData)
        .eq('id', productId);
      console.log(`Updated product: ${productData.name} (${productId})`);
    }

    // Insert benefits
    await supabase.from('product_benefits').delete().eq('product_id', productId);
    await supabase.from('product_benefits').insert(benefits.map(b => ({ ...b, product_id: productId })));

    // Insert ingredients
    await supabase.from('product_ingredients').delete().eq('product_id', productId);
    await supabase.from('product_ingredients').insert(ingredients.map(i => ({ ...i, product_id: productId })));

    // Insert usage steps (table columns: product_id, step, title, instruction, tip)
    await supabase.from('product_usage_steps').delete().eq('product_id', productId);
    await supabase.from('product_usage_steps').insert(
      usage_steps.map(({ sort_order, ...u }) => ({ ...u, product_id: productId }))
    );

    // Insert FAQs
    await supabase.from('product_faqs').delete().eq('product_id', productId);
    await supabase.from('product_faqs').insert(faqs.map(f => ({ ...f, product_id: productId })));

    console.log(`Synced content for ${productData.name}`);
  }

  console.log("Seeding completed successfully! Catalog now features 2 consolidated products.");
}

seed().catch(console.error);
