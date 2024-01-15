export type SiteType = {
  name: string;
  description: string;
  keywords: string;
  icon: string;
  ogImage: ImageMetadata;
  themeColor: string;
  author: string;
  twitterAcount: string;
  socials: {
    twitter: string;
    facebook: string;
    instagram: string;
    linkedin: string;
  };
};

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
};
