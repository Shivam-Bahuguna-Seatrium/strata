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
    id: 'citrus-lime',
    name: 'Citrus Lime',
    emoji: '🍋‍🟩',
    color: '#7CCF00',
    stat: '3.0K mg',
    benefit: 'Clean, crisp everyday hydration',
    badge: 'Available Now',
    price: 15,
    tagline: 'Sharp. Clean. Refreshing.',
    description: 'Zesty citrus-lime with a clean electrolyte finish. Crisp hydration, zero sugar.',
    available: true,
  },
  {
    id: 'tropical-punch',
    name: 'Tropical Punch',
    emoji: '🥭',
    color: '#FFD700',
    stat: '3.0K mg',
    benefit: 'Daily energy without the crash',
    badge: 'Coming Soon',
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
    badge: 'Coming Soon',
    price: 20,
    tagline: 'Recovery tastes this good',
    description: 'Mixed berry antioxidant blend. Tastes like dessert, works like science.',
    available: true,
  },
];

/** Only flavors marked available */
export const getActiveFlavors = () => FLAVORS.filter(f => f.available);

/** Brand constants */
export const BRAND = {
  name: 'STRATA',
  tagline: 'Hydrate Properly.',
  subTagline: "You're not tired. You're dehydrated.",
  antiSugar: "Sugar isn't energy. It's drama.",
  science: 'Water is the base. Electrolytes lock it in.',
  positioning: 'Daily hydration that restores baseline performance. No sugar. No crashes. Just science.',
  stats: {
    electrolytes: '3 Key',
    sugar: '0g',
    calories: 'Low',
  },
} as const;
