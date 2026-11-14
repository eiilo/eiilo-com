import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Static output only: `npm run build` writes plain files to dist/,
// which the GitHub Pages workflow publishes as they are.
export default defineConfig({
  site: "https://eiilo.com",
  trailingSlash: "always",
  integrations: [sitemap()],
  // The blog moved to blog.eiilo.com. These are the addresses it had here.
  redirects: {
    "/blog": "https://blog.eiilo.com/",
    "/blog/announcing-eiilo": "https://blog.eiilo.com/announcing-eiilo/",
  },
});
