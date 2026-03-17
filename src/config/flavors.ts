/**
 * STRATA Flavors Configuration
 * 
 * To add a new flavor:
 * 1. Add a new entry to the FLAVORS array below
 * 2. That's it — all components auto-populate from this config
 */

export interface Flavor {
  id: string;
  name: string;
  emoji: string;
  color: string;
  stat: string;         // electrolyte content
  benefit: string;      // one-liner benefit
  badge: string;        // product badge label
  price: number;        // price per pack
  tagline: string;      // short creative tagline
  description: string;  // longer description for detail views
  available: boolean;   // toggle on/off without removing
}

export const FLAVORS: Flavor[] = [
  {
    id: 'watermelon-rush',
    name: 'Watermelon Rush',
    emoji: '🍉',
    color: '#FF1493',
    stat: '3.2K mg',
    benefit: 'Perfect post-workout rehydration',
    badge: 'Best Seller',
    price: 15,
    tagline: 'The OG hydration hit',
    description: 'Crisp watermelon with a clean electrolyte finish. Our #1 seller for a reason.',
    available: true,
  },
  {
    id: 'tropical-punch',
    name: 'Tropical Punch',
    emoji: '🥭',
    color: '#FFD700',
    stat: '3.0K mg',
    benefit: 'Daily energy without the crash',
    badge: 'Comming Soon',
    price: 15,
    tagline: 'Island vibes, zero sugar',
    description: 'Mango-pineapple fusion packed with potassium. Your daily energy ritual.',
    available: true,
  },
  {
    id: 'berry-blast',
    name: 'Berry Blast',
    emoji: '🫐',
    color: '#8B5CF6',
    stat: '3.1K mg',
    benefit: 'Antioxidant-rich recovery blend',
    badge: 'Comming Soon',
    price: 20,
    tagline: 'Recovery tastes this good',
    description: 'Mixed berry antioxidant blend. Tastes like dessert, works like science.',
    available: true,
  },
//   {
//     id: 'citrus-glow',
//     name: 'Citrus Glow',
//     emoji: '🍊',
//     color: '#FF5F00',
//     stat: '2.8K mg',
//     benefit: 'Morning hydration + Vitamin C boost',
//     badge: 'New',
//     price: 15,
//     tagline: 'Your morning glow-up',
//     description: 'Orange-grapefruit with 100% daily Vitamin C. Replace OJ, keep the glow.',
//     available: true,
//   },
// //   {
//     id: 'grape-surge',
//     name: 'Grape Surge',
//     emoji: '🍇',
//     color: '#00E5FF',
//     stat: '3.0K mg',
//     benefit: 'Smooth, sustained hydration',
//     badge: 'Classic',
//     price: 15,
//     tagline: 'Smooth operator',
//     description: 'Cool grape with magnesium for all-day calm energy. Smooth and steady.',
//     available: true,
//   },
//   {
//     id: 'lemon-zest',
//     name: 'Lemon Zest',
//     emoji: '🍋',
//     color: '#00FF00',
//     stat: '2.7K mg',
//     benefit: 'Sharp, clean, and refreshing',
//     badge: 'Natural',
//     price: 15,
//     tagline: 'Clean and sharp',
//     description: 'Tart lemon with a hint of ginger. Zero sugar, maximum freshness.',
//     available: true,
//   },

  // ──────────────────────────────────────────────
  // ADD NEW FLAVORS BELOW — just copy a block above
  // and modify. All components will pick it up.
  // ──────────────────────────────────────────────

  // Example (uncomment to activate):
  // {
  //   id: 'mint-chill',
  //   name: 'Mint Chill',
  //   emoji: '🌿',
  //   color: '#10B981',
  //   stat: '2.9K mg',
  //   benefit: 'Cooling menthol hydration',
  //   badge: 'Coming Soon',
  //   price: 15,
  //   tagline: 'Ice cold clarity',
  //   description: 'Peppermint with eucalyptus. Cold-brew your focus.',
  //   available: false,
  // },
];

/** Only flavors marked available */
export const getActiveFlavors = () => FLAVORS.filter(f => f.available);

/** Get a flavor by its id */
export const getFlavorById = (id: string) => FLAVORS.find(f => f.id === id);

/** Festival color palette derived from active flavors */
export const getFlavorColors = () => getActiveFlavors().map(f => f.color);

/** Brand constants */
export const BRAND = {
  name: 'STRATA',
  tagline: 'Hydrate Properly.',
  subTagline: "You're not tired. You're dehydrated.",
  antiSugar: "Sugar isn't energy. It's drama.",
  science: 'Water is the base. Electrolytes lock it in.',
  positioning: 'Daily hydration that restores baseline performance. No sugar. No crashes. Just science.',
  stats: {
    users: '50K+',
    rating: '4.9★',
    recommend: '98%',
    sold: '1M+',
  },
  electrolytes: [
    { symbol: 'Na', name: 'Sodium', role: 'Maintains blood volume, supports nerve signaling, retains fluid in circulation' },
    { symbol: 'K', name: 'Potassium', role: 'Regulates fluid inside cells, supports muscle and nerve function' },
    { symbol: 'Mg', name: 'Magnesium', role: 'Supports muscle relaxation, energy production (ATP), nerve stability' },
  ],
  dehydrationEffects: [
    'Fatigue & low energy',
    'Reduced concentration',
    'Headaches',
    'Mood changes',
    'Slower reaction time',
  ],
} as const;
