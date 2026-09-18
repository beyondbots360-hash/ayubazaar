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
    subtitle: "Traditional Royal Sidr Honey & Vitality Elixir",
    category: "Rasayana & Vitality Tonic",
    dosha: "Balances Vata & Pitta",
    price: 1499,
    original_price: 1999,
    discount: "Save 25%",
    rating: 4.9,
    review_count: 148,
    image: "/images/products/yameny-khalta.png",
    badge: "100% Pure Sidr Honey",
    short_description: "A traditional herbal formulation with natural ingredients, crafted for your daily wellness.",
    long_description: "Yameny Khalta with Honey is a centuries-old royal wellness recipe that combines wild-harvested Yemeni Sidr Honey with potent restorative herbs including Ashwagandha, Safed Musli, Royal Jelly, and selected dry fruits. Crafted through slow, cold-infusion techniques to preserve natural bioactive enzymes, it nourishes bodily tissues (Dhatus) and provides sustained natural stamina throughout the day.",
    in_stock: true,
    benefits: [
      { icon_name: "Zap", title: "Sustained Natural Energy", description: "Replenishes cellular vigor and vitality without caffeine spikes, crashes, or artificial stimulants.", sort_order: 1 },
      { icon_name: "ShieldCheck", title: "Immunity & Ojas Booster", description: "Infused with rare Sidr honey antioxidants and royal jelly nutrients that strengthen your natural immune shield.", sort_order: 2 },
      { icon_name: "Sparkles", title: "Restorative Rasayana Herbs", description: "Formulated with Ashwagandha and Safed Musli to promote physical strength, mental resilience, and rejuvenation.", sort_order: 3 },
      { icon_name: "Heart", title: "100% Pure & Preservative-Free", description: "Free from refined sugars, artificial syrups, chemicals, and fillers. Raw, unpasteurized, and naturally nutrient-rich.", sort_order: 4 }
    ],
    ingredients: [
      { name: "Yemeni Sidr Honey", sanskrit_name: "Madhu (Sidr)", property: "World's most revered medicinal honey, rich in flavonoids and natural enzymes.", sort_order: 1 },
      { name: "Ashwagandha", sanskrit_name: "Withania Somnifera", property: "Premier adaptogen that balances cortisol, promotes stamina, and reduces fatigue.", sort_order: 2 },
      { name: "Safed Musli", sanskrit_name: "Chlorophytum Borivilianum", property: "Traditional Rasayana herb prized for tissue replenishment and physical vigor.", sort_order: 3 },
      { name: "Royal Jelly", sanskrit_name: "Raj Madhu", property: "Nutrient powerhouse rich in B-vitamins, amino acids, and essential trace minerals.", sort_order: 4 },
      { name: "Pure Saffron", sanskrit_name: "Kesar (Crocus sativus)", property: "Precious golden spice renowned for mood elevation, cellular vitality, and radiance.", sort_order: 5 },
      { name: "Crushed Almonds & Nuts", sanskrit_name: "Vatada", property: "Wholesome natural fats providing slow-release fuel and deep tissue nourishment.", sort_order: 6 }
    ],
    usage_steps: [
      { step: 1, title: "Measure 1 Spoon", instruction: "Take 1 tablespoon (approx. 10g-15g) of Yameny Khalta using a clean, dry spoon.", tip: "Avoid metal spoons if possible; wooden or ceramic spoons protect honey enzymes." },
      { step: 2, title: "Warm Anupana", instruction: "Consume directly followed by a cup of warm milk or lukewarm water.", tip: "Best taken in the morning after breakfast or 30 minutes before evening activity." },
      { step: 3, title: "Daily Consistency", instruction: "Use consistently for 45 to 60 days to experience cumulative Ayurvedic vitality.", tip: "Store at room temperature away from direct sunlight. Do not refrigerate." }
    ],
    faqs: [
      { question: "What makes Yameny Khalta different from regular honey?", answer: "Yameny Khalta is not ordinary market honey. It is an authentic herbal confection combining pure Yemeni Sidr honey with concentrated extracts of Ashwagandha, Safed Musli, Royal Jelly, and Saffron. It acts as an active restorative tonic rather than just a sweetener.", sort_order: 1 },
      { question: "How long does one jar typically last?", answer: "With the recommended daily dosage of 1 tablespoon (10-15g) per day, a standard jar lasts approximately 25 to 30 days of consistent daily use.", sort_order: 2 },
      { question: "Can people with diabetes consume Yameny Khalta?", answer: "While Sidr honey has a lower glycemic response than table sugar, it still contains natural fructose and glucose. We advise diabetic individuals to consult their healthcare provider before use.", sort_order: 3 },
      { question: "Are there any synthetic chemicals or preservatives added?", answer: "None whatsoever. AyuBazaar products are 100% natural, lab-tested, and free from added sugars, corn syrups, artificial colors, and chemical preservatives.", sort_order: 4 },
      { question: "Can both men and women take this product?", answer: "Yes. Yameny Khalta is a classical Rasayana formulation that supports cellular energy, immunity, and overall vitality for both adult men and women.", sort_order: 5 },
      { question: "What is your shipping and delivery timeline?", answer: "Orders are dispatched within 24 hours via express courier. Most deliveries across India arrive within 3 to 5 business days. Cash on Delivery (COD) is available.", sort_order: 6 }
    ]
  },
  {
    slug: "lava31-gold",
    name: "Lava 31 Gold",
    subtitle: "Ayurvedic Men's Wellness & Vigor Oil",
    category: "Vajikarana & Men's Care",
    dosha: "Balances Vata & Kapha",
    price: 1899,
    original_price: 2499,
    discount: "Save 24%",
    rating: 4.8,
    review_count: 215,
    image: "/images/products/lava-31-gold.png",
    badge: "Swarna Bhasma & Shilajit",
    short_description: "A powerful Ayurvedic formulation designed to support men's wellness and confidence.",
    long_description: "Lava 31 Gold is an authentic classical massage and vigor oil, meticulously processed through 31 traditional Ayurvedic herb decoctions (Kashayas). Enriched with Shuddha Shilajit, micro-calcined Swarna Bhasma (Gold ash), Kesar, Jaiphal, and Jyotishmati, it is formulated to nourish local blood flow, tone muscular tissue, reduce stress fatigue, and restore natural male confidence.",
    in_stock: true,
    benefits: [
      { icon_name: "Flame", title: "Swarna Bhasma & Shilajit Infusion", description: "Enriched with purified Himalayan Shilajit and micro-processed Gold Bhasma for deep cellular vitality.", sort_order: 1 },
      { icon_name: "Activity", title: "Enhanced Blood Flow & Tone", description: "Herbal vasodilators help stimulate micro-circulation and relieve local muscular stiffness.", sort_order: 2 },
      { icon_name: "ShieldCheck", title: "100% Ayurvedic & Non-Sticky", description: "Quickly absorbed sesame and herbal oil base that leaves no greasy residue or unpleasant odor.", sort_order: 3 },
      { icon_name: "Heart", title: "Daily Confidence & Stamina", description: "Regular application helps restore vigor, ease performance fatigue, and foster long-term vitality.", sort_order: 4 }
    ],
    ingredients: [
      { name: "Shuddha Shilajit", sanskrit_name: "Asphaltum punjabianum", property: "Ancient Himalayan mineral pitch enriched with 84+ minerals and fulvic acid.", sort_order: 1 },
      { name: "Swarna Bhasma (Gold Ash)", sanskrit_name: "Swarna Bhasma", property: "Classical Ayurvedic calcined gold known for deep tissue penetrative potency (Yogavahi).", sort_order: 2 },
      { name: "Kesar (Saffron)", sanskrit_name: "Crocus sativus", property: "Improves cutaneous circulation and delivers an aromatic, relaxing essence.", sort_order: 3 },
      { name: "Nutmeg (Jaiphal)", sanskrit_name: "Myristica fragrans", property: "Warming herb that relaxes tense nerves and stimulates sensory sensitivity.", sort_order: 4 },
      { name: "Malkangani (Jyotishmati)", sanskrit_name: "Celastrus paniculatus", property: "Stimulates localized blood capillaries and supports nerve tone.", sort_order: 5 },
      { name: "Cold-Pressed Sesame Oil Base", sanskrit_name: "Tila Taila", property: "The classical Ayurvedic vehicle that carries herbal actives deep into muscular tissues.", sort_order: 6 }
    ],
    usage_steps: [
      { step: 1, title: "Take 5 to 7 Drops", instruction: "Dispense 5 to 7 drops of Lava 31 Gold onto clean, dry palms.", tip: "Rub hands together gently for 3-5 seconds to warm the oil slightly." },
      { step: 2, title: "Gentle Massage", instruction: "Massage gently with light fingertips until completely absorbed by the skin.", tip: "Apply once daily before bedtime. Avoid washing off immediately to allow absorption." },
      { step: 3, title: "Consistent Course", instruction: "Use regularly for 60 to 90 days for optimal, long-lasting wellness results.", tip: "For external application only. Do not apply on open cuts or inflamed skin." }
    ],
    faqs: [
      { question: "Is Lava 31 Gold safe for daily external use?", answer: "Yes, Lava 31 Gold is formulated purely from standardized Ayurvedic botanical and mineral extracts in a natural sesame oil base. It is completely safe, dermatologically friendly, and free from synthetic parabens or mineral oils.", sort_order: 1 },
      { question: "How long should I use it before noticing results?", answer: "Most users report noticeable improvements in tone, relaxation, and vigor within 2 to 3 weeks of consistent daily application. We recommend completing the full 60-90 day course.", sort_order: 2 },
      { question: "Is the packaging discreet?", answer: "Absolutely. We value your privacy. All orders are packed in discreet, tamper-proof brown carton boxes without any product details or brand names on the outer delivery label.", sort_order: 3 },
      { question: "Are there any side effects?", answer: "Since it is an external Ayurvedic formulation free from steroids or chemical additives, there are no reported systemic side effects. Perform a small patch test if you have hyper-sensitive skin.", sort_order: 4 },
      { question: "Can I use this alongside other Ayurvedic supplements?", answer: "Yes, external oils like Lava 31 Gold can be used concurrently with oral wellness formulations such as Yameny Khalta without any adverse interactions.", sort_order: 5 },
      { question: "How can I order via WhatsApp?", answer: "Simply click the 'Order on WhatsApp' button on this page. It will automatically open WhatsApp with your product details pre-filled. Our customer concierge will assist with instant address confirmation.", sort_order: 6 }
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
    short_description: "A unique blend of time-tested herbs to support your overall health and well-being.",
    long_description: "Shivshakti Ayurvedic Churna is a classical digestive and gut-cleansing formulation composed of revered Ayurvedic carminatives. Blending Haritaki, Bibhitaki, Amalaki (Triphala), Saunf, Ajwain, Hing, and rock salts, it naturally relieves bloating, hyper-acidity, constipation, and metabolic sluggishness without causing dependency or cramping.",
    in_stock: true,
    benefits: [
      { icon_name: "Leaf", title: "Gentle Gut Detoxification", description: "Cleanses accumulated metabolic toxins (Ama) from the digestive tract gently and naturally.", sort_order: 1 },
      { icon_name: "CheckCircle2", title: "Relief from Gas & Acidity", description: "Neutralizes stomach acid and eases abdominal heaviness, heartburn, and post-meal sluggishness.", sort_order: 2 },
      { icon_name: "ShieldCheck", title: "Non-Habit Forming Formula", description: "Unlike harsh chemical laxatives, Shivshakti Churna supports natural intestinal peristalsis without dependency.", sort_order: 3 },
      { icon_name: "Sparkles", title: "Metabolic Agni Balance", description: "Kindles the digestive fire (Jatharagni) to enhance nutrient absorption and clear skin complexion.", sort_order: 4 }
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
      { step: 1, title: "Measure Half to One Spoon", instruction: "Take 1/2 to 1 teaspoon (approx. 3g-5g) of Shivshakti Churna.", tip: "Start with 1/2 teaspoon for the first 3 days to allow your digestive tract to adjust." },
      { step: 2, title: "Lukewarm Water", instruction: "Mix with a glass of lukewarm water or swallow directly followed by water.", tip: "Best consumed at bedtime, at least 45 minutes after your evening dinner." },
      { step: 3, title: "Wake Up Refreshed", instruction: "Enjoy effortless, complete morning elimination and a light, energized stomach.", tip: "Drink adequate water throughout the day for optimal detoxification benefits." }
    ],
    faqs: [
      { question: "Is Shivshakti Churna habit-forming?", answer: "No. Unlike synthetic chemical laxatives, Shivshakti Churna works by balancing natural digestive enzymes (Agni) and soothing the mucosal lining. It does not weaken natural bowel motility and is non-habit forming.", sort_order: 1 },
      { question: "When is the ideal time to take it?", answer: "The best time to take Shivshakti Churna is at night before bed, 45 to 60 minutes after dinner, mixed with a cup of lukewarm water.", sort_order: 2 },
      { question: "Can it be taken for chronic acidity and bloating?", answer: "Yes, the combination of Saunf, Ajwain, and Triphala specifically targets excess Pitta (heat/acidity) and sluggish Vata in the gastrointestinal tract, offering soothing relief.", sort_order: 3 },
      { question: "Does it cause stomach cramps or sudden urgency?", answer: "No. The herbs are balanced with Sendha Namak and Saunf to ensure gentle, comfortable morning evacuation without painful abdominal spasms or sudden urgency.", sort_order: 4 },
      { question: "Can I take it daily?", answer: "Yes, it is designed for safe daily use during periods of digestive distress or as a periodic detoxifier for 30 to 60 days.", sort_order: 5 },
      { question: "How is it packaged and shipped?", answer: "It is securely packed in an airtight food-grade container with moisture-locking seal to retain botanical freshness and aroma.", sort_order: 6 }
    ]
  }
];

async function seed() {
  console.log("Seeding Ayubazaar database in Supabase...");

  for (const item of SEED_PRODUCTS) {
    const { benefits, ingredients, usage_steps, faqs, ...productData } = item;

    // Check if product exists
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
      console.log(`Product already exists: ${productData.name} (${productId})`);
    }

    // Insert benefits
    await supabase.from('product_benefits').delete().eq('product_id', productId);
    await supabase.from('product_benefits').insert(benefits.map(b => ({ ...b, product_id: productId })));

    // Insert ingredients
    await supabase.from('product_ingredients').delete().eq('product_id', productId);
    await supabase.from('product_ingredients').insert(ingredients.map(i => ({ ...i, product_id: productId })));

    // Insert usage steps
    await supabase.from('product_usage_steps').delete().eq('product_id', productId);
    await supabase.from('product_usage_steps').insert(usage_steps.map(u => ({ ...u, product_id: productId })));

    // Insert FAQs
    await supabase.from('product_faqs').delete().eq('product_id', productId);
    await supabase.from('product_faqs').insert(faqs.map(f => ({ ...f, product_id: productId })));

    console.log(`Synced content for ${productData.name}`);
  }

  console.log("Seeding completed successfully!");
}

seed().catch(console.error);
