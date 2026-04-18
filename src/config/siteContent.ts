/**
 * STRATA — Central Site Content Configuration
 *
 * All headings, subheadings, body copy, labels, CTAs, data arrays,
 * and structural content live here. Edit this single file to update
 * every page and component across the website.
 *
 * Components import what they need:
 *   import { heroContent } from '@/config/siteContent';
 */

// ─────────────────────────────────────────────
// META / SEO
// ─────────────────────────────────────────────
export const metaContent = {
  title: 'STRATA HYDRATION | Electrolyte Drink Mix',
  description:
    'Electrolyte powered hydration designed for daily performance. 0g Sugar, 3x Hydration, Low Calories. Fuel your day with STRATA Hydration.',
  keywords: [
    'hydration',
    'electrolyte',
    'drink mix',
    'citrus lime',
    'sugar free',
    'vegan',
  ],
};

// ─────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────
export const navContent = {
  logoAlt: 'Strata Hydration',
  links: [
    { label: 'Hydration', href: '/' },
    { label: 'Fuel', href: '/fuel' },
    { label: 'Boost', href: '/boost' },
    { label: 'Science', href: '/science' },
    { label: 'Sip', href: '/sip' },
    { label: 'Voices', href: '/voices' },
    { label: 'Refuel', href: '/refuel' },
  ],
};

// ─────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────
export const heroContent = {
  accentLine: 'Feeling Tired?',
  headingMain: 'HYDRATE',
  headingScript: 'the hustle',
  subtitle: 'Natural flavors. Zero sugar. Zero compromise.',
  productAlt: 'STRATA Hydration',
  cta: {
    primary: { label: 'Shop Now', href: '/fuel' },
    secondary: { label: 'The Science', href: '#benefits' },
  },
  ticker: [
    '🧊 Zero Sugar',
    '💯 Vegan',
    '🌾 Gluten-Free',
    '⚡ Fast Acting',
    '🔬 Science-Backed',
  ],
};

// ─────────────────────────────────────────────
// HYDRATION SECTION
// ─────────────────────────────────────────────
export const hydrationContent = {
  badge: '💧 Hydration Lab',
  heading: 'Choose Your',
  headingAccent: 'Flavor',
  availableBadge: 'Available Now',
  comingSoonLabel: 'Coming Soon',
  ctaPrefix: '🍋‍🟩 Shop',
  ctaSuffix: '🍋‍🟩',
  ticker: [
    '⚡ Fast Acting',
    '💧 Deep Hydration',
    '🧪 Electrolytes',
    '🍃 Clean Formula',
  ],
};

// ─────────────────────────────────────────────
// BOOST ( "How It Works" ) SECTION
// ─────────────────────────────────────────────
export const boostContent = {
  badge: '💧 Restore Your Baseline',
  heading: "You're Not Tired. You're",
  headingAccent: 'Dehydrated.',
  subtitle:
    'Water is the base. Electrolytes lock it in. Strata restores what your body actually needs.',
  stepsLabel: 'Dehydrated → Restored',
  steps: [
    { num: '01', title: 'Dehydrated', icon: '😴', color: '#FF1493' },
    { num: '02', title: 'Sip Strata', icon: '🧪', color: '#00E5FF' },
    { num: '03', title: 'Electrolytes Activate', icon: '⚡', color: '#4CAF50' },
    { num: '04', title: 'Baseline Restored', icon: '🔋', color: '#FF8C00' },
  ],
  momentsLabel: 'Hydrate Properly',
  moments: [
    {
      title: 'Morning Reset',
      sub: 'Start hydrated, not caffeinated. Your body lost fluids overnight — replenish before coffee.',
      when: 'Morning',
      icon: '☀️',
      color: '#FF8C00',
    },
    {
      title: 'Pre-Workout',
      sub: 'Electrolytes before effort. Prime your muscles and prevent cramping before you push.',
      when: 'Before Gym',
      icon: '🏋️',
      color: '#FF1493',
    },
    {
      title: 'Deep Work',
      sub: 'Clarity over coffee. Dehydration kills focus — electrolytes keep your brain sharp.',
      when: 'At Work',
      icon: '🧠',
      color: '#00E5FF',
    },
    {
      title: 'Wind Down',
      sub: 'Recover while you rest. Magnesium supports muscle recovery and calms your system.',
      when: 'Evening',
      icon: '🌙',
      color: '#4CAF50',
    },
  ],
};

// ─────────────────────────────────────────────
// SCIENCE SECTION
// ─────────────────────────────────────────────
export const scienceContent = {
  badge: "🚫 Sugar Isn't Energy",
  heading: 'Sugar Is Drama.',
  headingAccent: 'Science Is Strata.',
  subtitle:
    "A glucose spike isn't hydration — it's a crash waiting to happen. Electrolytes correct the real imbalance.",
  benefitsLabel: 'What Dehydration Takes — Strata Gives Back',
  benefits: [
    { icon: '🔋', title: 'Sustained Energy', desc: 'Not a spike. Real fuel.', color: '#FF8C00' },
    { icon: '🧠', title: 'Mental Clarity', desc: 'Focus without the fog.', color: '#4CAF50' },
    { icon: '😌', title: 'Stable Mood', desc: 'No irritability. No crash.', color: '#00E5FF' },
    { icon: '⚡', title: 'Fast Reactions', desc: 'Stay sharp when it counts.', color: '#FFD700' },
    { icon: '🚫', title: 'Zero Sugar', desc: "Sugar isn't energy. It's drama.", color: '#FF1493' },
  ],
  electrolyteLabel: 'The Electrolyte Stack',
  molecules: [
    {
      symbol: 'Na',
      name: 'Sodium',
      color: '#00E5FF',
      tagline: 'The fluid keeper',
      benefits: [
        'Maintains blood volume',
        'Supports nerve signaling',
        'Retains fluid in circulation',
      ],
    },
    {
      symbol: 'K',
      name: 'Potassium',
      color: '#FF1493',
      tagline: 'The cell regulator',
      benefits: [
        'Regulates fluid inside cells',
        'Supports muscle function',
        'Keeps nerve signals firing',
      ],
    },
    {
      symbol: 'Mg',
      name: 'Magnesium',
      color: '#4CAF50',
      tagline: 'The recovery engine',
      benefits: [
        'Supports muscle relaxation',
        'Drives energy production (ATP)',
        'Stabilizes nerve function',
      ],
    },
  ],
};

// ─────────────────────────────────────────────
// SIP ( "How To Use" ) SECTION
// ─────────────────────────────────────────────
export const sipContent = {
  badge: '🥤 How To Sip',
  heading: 'Tear. Pour.',
  headingAccent: 'Dominate.',
  subtitle:
    'No shaker. No recipe. Just rip, mix, and let the electrolytes do their thing.',
  stepsLabel: '4 Steps. Zero Effort.',
  steps: [
    {
      num: '01',
      title: 'Tear It Open',
      icon: '✂️',
      desc: 'Rip the sachet. No blender, no prep, no drama.',
      color: '#FF1493',
    },
    {
      num: '02',
      title: 'Pour & Mix',
      icon: '💧',
      desc: 'Drop it into 500ml of cold water. Watch it dissolve instantly.',
      color: '#00E5FF',
    },
    {
      num: '03',
      title: 'Sip & Absorb',
      icon: '🥤',
      desc: 'Drink up. Electrolytes hit your bloodstream within minutes.',
      color: '#4CAF50',
    },
    {
      num: '04',
      title: 'Feel the Shift',
      icon: '⚡',
      desc: 'Energy, focus, clarity — no crash. Just your baseline, restored.',
      color: '#FF8C00',
    },
  ],
  tipsLabel: 'Pro Tips',
  tips: [
    { icon: '🧊', tip: 'Cold water hits harder', color: '#00E5FF' },
    { icon: '🚰', tip: '500ml — not more, not less', color: '#0077FF' },
    { icon: '⏱️', tip: "Sip, don't chug", color: '#4CAF50' },
    { icon: '🔁', tip: '1–2 sachets daily', color: '#FF8C00' },
    { icon: '🚫', tip: 'Never mix with milk or juice', color: '#FF1493' },
  ],
};

// ─────────────────────────────────────────────
// VOICES ( Reviews ) SECTION
// ─────────────────────────────────────────────
export const voicesContent = {
  badge: '💬 Real People. Real Sips.',
  heading: 'The Streets Are',
  headingAccent: 'Talking.',
  subtitle:
    "Don't take our word for it. These sippers switched to Strata and never looked back.",
  stats: [
    { value: '4.9', label: 'Avg Rating', icon: '⭐' },
    { value: '10K+', label: 'Happy Sippers', icon: '🥤' },
    { value: '0g', label: 'Sugar', icon: '🚫' },
    { value: '93%', label: 'Reorder Rate', icon: '🔁' },
  ],
  reviewsLabel: 'Sippers',
  reviews: [
    {
      name: 'T',
      role: 'Field Engineer',
      avatar: '🏗',
      rating: 5,
      text: "On-site 12 hours in 40°C heat. Strata is the only thing that keeps me from crashing by noon. My crew thinks I'm built different — nah, I'm just hydrated.",
      tag: 'Field',
      color: '#FF1493',
      rotate: -2,
      floatDuration: 5,
    },
    {
      name: 's',
      role: 'Data Scientist',
      avatar: '📊',
      rating: 5,
      text: 'Training models till 3am. Coffee gave me anxiety. Strata gives clarity. My code quality literally improved after I switched — brain fog is not a vibe.',
      tag: 'Focus',
      color: '#00E5FF',
      rotate: 1.5,
      floatDuration: 6,
    },
    {
      name: 'K',
      role: 'Boxer',
      avatar: '🥊',
      rating: 5,
      text: 'Twelve rounds in the ring and I still feel locked in. Strata before sparring is non-negotiable now. No sugar crash, just pure knockout energy.',
      tag: 'Combat',
      color: '#DC2626',
      rotate: -1,
      floatDuration: 5.2,
    },
  ],
  verifiedLabel: 'Verified Sipper',
};

// ─────────────────────────────────────────────
// REFUEL ( Contact ) SECTION
// ─────────────────────────────────────────────
export const refuelContent = {
  badge: '📬 Drop Us A Line',
  heading: 'Ready To',
  headingAccent: 'Refuel?',
  subtitle:
    'Questions, collabs, or just wanna say hi? Drop a message — we flow right back.',
  formTitle: 'Send A Ripple 💧',
  formFields: {
    name: { label: 'Your Name', placeholder: 'e.g. Shivam' },
    email: { label: 'Email', placeholder: 'you@example.com' },
    message: { label: 'Message', placeholder: "What's on your mind?" },
  },
  submitLabel: 'Send Message →',
  sendingLabel: '💧 Sending...',
  sentLabel: '✅ Message Sent!',
  successMessage: 'We got your ripple! Flowing back soon. 💧',
  errorMessage: 'Something went wrong. Try again or email us directly.',
  contactCards: [
    {
      icon: '📧',
      title: 'Email Us Directly',
      detail: 'hello@stratahydration.com',
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      detail: 'We respond within 24 hours',
    },
    {
      icon: '🤝',
      title: 'Collabs Welcome',
      detail: "Gyms, athletes, creators — let's build",
    },
  ],
  hydrationFact: {
    title: 'Hydration Fact',
    text: "By the time you feel thirsty, you're already 2% dehydrated — enough to cut focus by 25%. Don't wait. Hydrate.",
  },
};

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────
export const footerContent = {
  heroStatement: {
    heading: 'Hydrate',
    headingOutline: 'Properly.',
  },
  columns: {
    explore: {
      title: 'Explore',
      hoverColor: '#00FFFF',
      links: [
        { label: 'Home', href: '/' },
        { label: 'Hydration', href: '/fuel' },
        { label: 'Boost', href: '/boost' },
        { label: 'Science', href: '/science' },
        { label: 'Sip', href: '/sip' },
        { label: 'Voices', href: '/voices' },
        { label: 'Refuel', href: '/refuel' },
      ],
    },
    flavors: {
      title: 'Flavors',
      hoverColor: '#FF69B4',
      // Links are auto-populated from active flavors in the component
    },
    connect: {
      title: 'Connect',
      hoverColor: '#FFD700',
      links: [
        { label: 'Email Us', href: '/refuel' },
        { label: 'Instagram', href: '__INSTAGRAM__' },
        { label: 'WhatsApp', href: '__WHATSAPP__' },
        { label: 'Twitter / X', href: '__TWITTER__' },
      ],
    },
  },
  bottomBar: {
    privacyLabel: 'Privacy',
    termsLabel: 'Terms',
  },
};
