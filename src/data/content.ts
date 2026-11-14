import { getCollection, type CollectionEntry } from "astro:content";

// Drafts show up in `npm run dev` and are left out of the built site.
const visible = ({ data }: { data: { draft: boolean } }) =>
  import.meta.env.DEV || !data.draft;

const newestFirst = (a: { data: { date: Date } }, b: { data: { date: Date } }) =>
  b.data.date.valueOf() - a.data.date.valueOf();

export async function getUpdates(): Promise<CollectionEntry<"updates">[]> {
  return (await getCollection("updates", visible)).sort(newestFirst);
}

// "Mon, Sep 23, 2024"
export const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

export const isoDate = (date: Date) => date.toISOString().slice(0, 10);
