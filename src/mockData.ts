import { ScanReport } from "./types";

export const MOCK_REPORTS: ScanReport[] = [
  {
    id: "classic-crispy-slices",
    userId: "demo-user",
    productName: "Classic Salted Crispy Slices",
    imageUrl: "https://images.unsplash.com/photo-1566478989037-eec170784d09?w=300&auto=format&fit=crop&q=80",
    ingredientsText: "Potatoes, Vegetable Oil (Palm Oil), Salt, Monosodium Glutamate (MSG), Artificial Onion Flavor, Citric Acid, Disodium Inosinate, Disodium Guanylate.",
    truthScore: 42,
    timestamp: new Date().toISOString(),
    ingredientsBreakdown: [
      { name: "Skins & Potatoes", rating: "Good", description: "Standard carbohydrate source, safe and clean." },
      { name: "Vegetable Oil (Palm Oil)", rating: "Bad", description: "Highly processed, rich in saturated fats and bad for cholesterol levels." },
      { name: "Salt", rating: "Okay", description: "Essential mineral, but extremely dense in this high concentration." },
      { name: "Monosodium Glutamate (MSG)", rating: "Bad", description: "Flavor enhancer linked to acute headaches, water retention, and sensitivities." },
      { name: "Artificial Flavoring", rating: "Bad", description: "Chemically synthesized compounds used to mimic natural products." },
      { name: "Citric Acid", rating: "Okay", description: "Generally safe preservative and acidity driver." },
      { name: "Disodium Inosinate", rating: "Bad", description: "Synthesized flavor enhancer, synergistic with MSG for nervous responses." },
      { name: "Disodium Guanylate", rating: "Bad", description: "chemical food additive, commonly avoided by health conscious eaters." }
    ],
    claims: [
      { claim: "Made with Best Quality Potatoes", reality: "Partially True", explanation: "While it does contain real potatoes, they are thinly sliced and submerged in heavy processed oils." },
      { claim: "No Added Color or Preservative", reality: "Partially True", explanation: "No artificial food colors are included, but processing additives are extremely high." },
      { claim: "No Artificial Flavors", reality: "False", explanation: "Contains artificial food grade flavor compounds." }
    ],
    healthImpacts: [
      "High sodium density may increase blood pressure and water retention quickly.",
      "Contains chemical flavor synergists linked to sensory fatigue or headaches.",
      "Industrial palm oil consumption elevates LDL (bad) cholesterol."
    ],
    alternatives: [
      { name: "Baked Sea Salt Cassava Crisps", score: 78, description: "Oven baked, low saturated fats and clean root starch." },
      { name: "Organic Sweet Potato Thins", score: 85, description: "Kettle cooked in avocado oil, source of vitamins and low sodium." },
      { name: "Sorghum Air-Popped Slices", score: 89, description: "Fiber-rich popped kernels, completely palm-oil free." }
    ],
    reaction: {
      expectationImage: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop&q=80",
      expectationTitle: "Expectation (What They Show)",
      realityImage: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=400&auto=format&fit=crop&q=80",
      realityTitle: "Reality (What You Get)",
      commentary: "Looks good on the outside, but inside is 60% salty processed palm-oil mist.",
      reactionGif: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?w=400&auto=format&fit=crop&q=80",
      memeHeading: "THAT'S WHAT I'M EATING?!"
    }
  },
  {
    id: "neon-rush-energy",
    userId: "demo-user",
    productName: "Neon Rush Energy Drink",
    imageUrl: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&auto=format&fit=crop&q=80",
    ingredientsText: "Carbonated Water, High Fructose Corn Syrup, Citric Acid, Taurine, Sodium Citrate, Natural and Artificial Flavors, Caffeine, Sodium Benzoate, Sucralose, Yellow 5, Red 40.",
    truthScore: 28,
    timestamp: new Date().toISOString(),
    ingredientsBreakdown: [
      { name: "Carbonated Water", rating: "Good", description: "Bubbly pure base." },
      { name: "High Fructose Corn Syrup", rating: "Bad", description: "Highly caloric refined sweetener linked to fatty liver and insulin spikes." },
      { name: "Taurine", rating: "Okay", description: "Amino acid that helps circulation, safe in small doses." },
      { name: "Caffeine (160mg)", rating: "Bad", description: "Extremely high dosage; causes rapid heart rate, insomnia, and nervous crashes." },
      { name: "Sodium Benzoate", rating: "Bad", description: "Chemical preservative that can form carcinogens when mixed with Vitamin C." },
      { name: "Sucralose", rating: "Bad", description: "Zero-calc sweeteners showing adverse reactions in gut microbiome flora." },
      { name: "Yellow 5 & Red 40", rating: "Bad", description: "Azo-dye artificial food coloring compounds correlated with hyperactivity." }
    ],
    claims: [
      { claim: "Ultimate Stamina Booster", reality: "Partially True", explanation: "Boosts physical energy for 45 minutes, followed by immediate lethargy." },
      { claim: "Zero Crash Formula", reality: "False", explanation: "Contains both Fructose energy spikes and high dose caffeine, generating a guaranteed drop." }
    ],
    healthImpacts: [
      "Heavy stimulant rush spikes acute adrenal fatigue risk.",
      "Excessive sugar syrup raises risk of long-term diabetes.",
      "Artificial food colors may cause behavior spikes or allergic sensitivity."
    ],
    alternatives: [
      { name: "Organic Ceremonial Matcha Sparkler", score: 88, description: "L-Theanine driven clean focus, completely dye-free." },
      { name: "Cold-Brewed Lemon Yerba Mate", score: 81, description: "Leaf harvested sustained energy, low added syrup." }
    ],
    reaction: {
      expectationImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&auto=format&fit=crop&q=80",
      expectationTitle: "Expectation (Glow and Prowess)",
      realityImage: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80",
      realityTitle: "Reality (Unavoidable Crash)",
      commentary: "Your nervous system is hosting a chaotic festival, but your physical battery is at 1%.",
      reactionGif: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&auto=format&fit=crop&q=80",
      memeHeading: "THAT'S WHAT I'M DRINKING?!"
    }
  },
  {
    id: "sour-gummy-bands",
    userId: "demo-user",
    productName: "Fruit-Blast Sour Gummy Bands",
    imageUrl: "https://images.unsplash.com/photo-1581798459219-318e76aecc7b?w=300&auto=format&fit=crop&q=80",
    ingredientsText: "Sugar, Glucose-Fructose Syrup, Gelatin, Citric Acid, Malic Acid, Fumaric Acid, Artificial Fruit Flavors, Titanium Dioxide, Yellow 6, Blue 1, Red 40.",
    truthScore: 31,
    timestamp: new Date().toISOString(),
    ingredientsBreakdown: [
      { name: "Sugar & Sweeteners", rating: "Bad", description: "Excess sugars cause tooth decay, high glucose levels, and glycemic burden." },
      { name: "Gelatin", rating: "Okay", description: "Animal connective derivative. Safe but non-vegetarian." },
      { name: "Malic & Fumaric Acids", rating: "Okay", description: "Synthesized acidity regulators creating the sour exterior coating." },
      { name: "Titanium Dioxide", rating: "Bad", description: "Opacifying agent restricted in multiple countries due to genotoxicity concerns." },
      { name: "Yellow 6 & Red 40", rating: "Bad", description: "Synthetic petroleum derived dyes prohibited in many kids foods." }
    ],
    claims: [
      { claim: "Made with Real Fruit Extracts", reality: "False", explanation: "Flavors are entirely synthetic chemical representations." },
      { claim: "100% Fat-Free Treats", reality: "True", explanation: "Contains no fats, but compensates with pure caloric density and sugar overload." }
    ],
    healthImpacts: [
      "Extremely fast sugar metabolism feeds teeth microforms leading to cavities.",
      "Titanium Dioxide presents risk factors under study for immune cell impacts.",
      "High artificial dye amounts are tied to digestive microflora disruptions."
    ],
    alternatives: [
      { name: "Freeze-Dried Organic Berries", score: 94, description: "No added sugar, high vitamin C and antioxidant count." },
      { name: "Real Apple Pectin Fruit Leather", score: 86, description: "Naturally sweetened alternative using slow simmered purees." }
    ],
    reaction: {
      expectationImage: "https://images.unsplash.com/photo-1499591404179-11c9c02ece62?w=400&auto=format&fit=crop&q=80",
      expectationTitle: "Expectation (Sweet Sweet Rainbow)",
      realityImage: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=400&auto=format&fit=crop&q=80",
      realityTitle: "Reality (Dentistry Feast)",
      commentary: "Dentists across the globe are clapping! A single bag will pay for their summer vacation.",
      reactionGif: "https://images.unsplash.com/photo-1558244661-d248897f7bc4?w=400&auto=format&fit=crop&q=80",
      memeHeading: "DENTIST VACATION SPONSOR!"
    }
  }
];

export const PRESET_OPTIONS = [
  {
    name: "Classic Salted Crispy Slices",
    desc: "Simulate potato slices with salty seasoning",
    presetId: "classic-crispy-slices",
    emoji: "🥔"
  },
  {
    name: "Neon Rush Energy Drink",
    desc: "Simulate caffeine rich canned drink",
    presetId: "neon-rush-energy",
    emoji: "🥫"
  },
  {
    name: "Fruit-Blast Sour Gummy Bands",
    desc: "Simulate bright chewy synthetic gummies",
    presetId: "sour-gummy-bands",
    emoji: "🍬"
  }
];
