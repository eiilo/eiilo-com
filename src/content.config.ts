import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Every Markdown file in src/content/updates is an update. The file name is
// the URL. A build fails with a clear message when a field is missing or
// mistyped. (Blog posts are in the eiilo-blog-com repository.)
const updates = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/updates" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { updates };
