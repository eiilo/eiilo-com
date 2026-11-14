import rss from "@astrojs/rss";
import { getUpdates } from "../data/content";
import { site } from "../data/site";

// The updates, newest first. The blog has its own feed at blog.eiilo.com/rss.xml.
export async function GET(context) {
  return rss({
    title: "eiilo updates",
    description: site.description,
    site: context.site,
    items: (await getUpdates()).map((update) => ({
      title: update.data.title,
      pubDate: update.data.date,
      link: `/updates/${update.id}/`,
    })),
  });
}
