import { FEED_SOURCES, Section, SECTION_ORDER } from "./sources";

export interface Headline {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  source: string;
  section: Section;
}

function decodeEntities(str: string): string {
  return str
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function extractTag(block: string, tag: string): string {
  const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  return match ? decodeEntities(match[1]) : "";
}

function parseRss(xml: string): Omit<Headline, "source" | "section">[] {
  const items: Omit<Headline, "source" | "section">[] = [];
  const itemMatches = xml.match(/<item[\s\S]*?<\/item>/gi) || [];

  for (const block of itemMatches) {
    const title = extractTag(block, "title");
    const link = extractTag(block, "link") || extractTag(block, "guid");
    const pubDate = extractTag(block, "pubDate") || extractTag(block, "published");
    const description = extractTag(block, "description") || extractTag(block, "summary");

    if (title && link) {
      items.push({ title, link, pubDate, description });
    }
  }

  return items;
}

async function fetchFeed(url: string): Promise<Omit<Headline, "source" | "section">[]> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; JornalMundoBot/1.0)" },
      // Recarrega a cada hora (ISR) - é isso que garante as atualizações automáticas.
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return parseRss(xml);
  } catch {
    return [];
  }
}

export async function getHeadlinesBySection(): Promise<Record<Section, Headline[]>> {
  const results = await Promise.all(
    FEED_SOURCES.map(async (source) => {
      const items = await fetchFeed(source.url);
      return items.map((item) => ({
        ...item,
        source: source.name,
        section: source.section,
      }));
    })
  );

  const bySection: Record<Section, Headline[]> = {
    Mundo: [],
    Economia: [],
    Tecnologia: [],
    Ciência: [],
  };

  for (const list of results) {
    for (const headline of list) {
      bySection[headline.section].push(headline);
    }
  }

  // Ordena por data (mais recentes primeiro) e remove duplicados por título
  for (const section of SECTION_ORDER) {
    const seen = new Set<string>();
    bySection[section] = bySection[section]
      .filter((h) => {
        const key = h.title.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .sort((a, b) => {
        const da = new Date(a.pubDate).getTime() || 0;
        const db = new Date(b.pubDate).getTime() || 0;
        return db - da;
      });
  }

  return bySection;
}
