export const site = {
  name: "eiilo",
  description: "We make fun games and great software.",
  email: "hi@eiilo.com",
  games: "https://games.eiilo.com/",
  blog: "https://blog.eiilo.com/",
};

type Link = { name: string; path: string };

// The bar at the top. Games and Blog are on their own sites.
export const nav: Link[] = [
  { name: "Home", path: "/" },
  { name: "Games", path: site.games },
  { name: "Blog", path: site.blog },
  { name: "Updates", path: "/updates/" },
  { name: "About us", path: "/about/" },
  { name: "Contact", path: "/contact/" },
];

export const footer: Link[] = [
  { name: "Privacy policy", path: "/privacy/" },
  { name: "Terms and conditions", path: "/terms/" },
  { name: "Sitemap", path: "/sitemap/" },
  { name: "RSS", path: "/rss.xml" },
];
