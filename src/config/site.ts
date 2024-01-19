import type { SiteType } from '@config/site.types';

export const SITE: SiteType = {
  name: 'Medito Fundraising',
  description: 'Support Medito Foundation by building a more mindful world',
  keywords: 'meditation, fundraising, mindfull, medito, medito app',
  icon: '/favicon.png',
  ogImage: {
    src: '/og.jpg',
    width: 1200,
    height: 628,
    format: 'jpg',
  },
  themeColor: '#ffffff',
  author: 'Jérôme Abel',
  twitterAcount: '@jeromeabeldev',
  socials: {
    twitter: 'https://twitter.com/meditohq',
    facebook: 'https://www.facebook.com/meditohq',
    instagram: 'https://www.instagram.com/meditohq',
    linkedin: 'https://www.linkedin.com/in//company/meditofoundation',
  },
  nav: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Campaigns', href: '/campaign' },
    { label: 'Blog', href: '/blog' },
  ],
};

export const FOOTER = [
  {
    title: 'Organization',
    items: ['About Medito.org', 'Legal Notices', 'Impact', 'Jobs', 'Team'],
  },
  {
    title: 'Community',
    items: ['Blog', 'Press', 'Community Rules'],
  },
  {
    title: 'Support',
    items: ['Help', 'Guides', 'Data Usage Policy', 'Terms', 'Cookies'],
  },
  {
    title: 'Social media',
    items: ['Twitter', 'Facebook', 'Instagram'],
  },
];

export const REWARDS = [
  {
    name: 'Gratitude Wall Recognition',
    description:
      "Leave your mark on the Medito Foundation's Gratitude Wall, a special section on our website dedicated to honoring our generous supporters.",
    value: '5',
  },
  {
    name: 'Mindfulness Mastery Pack',
    description:
      'Unlock exclusive access to a curated collection of guided meditation sessions, mindfulness challenges, and advanced techniques.',
    value: '25',
  },
  {
    name: 'Exclusive Medito Bundle',
    description:
      'Receive a specially designed merchandise bundle featuring Medito Foundation-branded items, including a cozy meditation blanket, a high-quality meditation cushion, and a personalized thank-you card.',
    value: '60',
  },
  {
    name: 'Meditation Retreat Experience',
    description:
      'Embark on a transformative weekend meditation retreat at a serene location. Immerse yourself in a peaceful environment, guided by experienced meditation instructors.',
    value: '150',
  },
];
