export type Section = "Mundo" | "Economia" | "Tecnologia" | "Ciência";

export interface FeedSource {
  section: Section;
  name: string;
  url: string;
}

// Fontes RSS públicas, sem necessidade de chave de API.
// Para trocar ou adicionar fontes, edite esta lista.
export const FEED_SOURCES: FeedSource[] = [
  { section: "Mundo", name: "BBC News", url: "http://feeds.bbci.co.uk/news/world/rss.xml" },
  { section: "Mundo", name: "Al Jazeera", url: "https://www.aljazeera.com/xml/rss/all.xml" },
  { section: "Mundo", name: "NPR", url: "https://feeds.npr.org/1004/rss.xml" },
  { section: "Economia", name: "BBC News", url: "http://feeds.bbci.co.uk/news/business/rss.xml" },
  { section: "Tecnologia", name: "BBC News", url: "http://feeds.bbci.co.uk/news/technology/rss.xml" },
  { section: "Ciência", name: "BBC News", url: "http://feeds.bbci.co.uk/news/science_and_environment/rss.xml" },
];

export const SECTION_ORDER: Section[] = ["Mundo", "Economia", "Tecnologia", "Ciência"];
