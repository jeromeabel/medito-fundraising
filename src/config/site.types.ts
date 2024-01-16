type NavlinkType = {
  href: string;
  label: string;
};

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
  nav: NavlinkType[];
};
