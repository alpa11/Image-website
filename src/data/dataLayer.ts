/**
 * Data Layer — abstraction over content sources.
 * Currently reads from local TypeScript files.
 * TODO: Replace implementations with Firestore fetches when ready.
 * Pattern: getSystems() -> firestore.collection("systems").get()
 */

import { systems, type SystemData } from "./systems";
import { siteContent } from "./siteContent";

// ─── Systems ───────────────────────────────────────────────────

export function getSystems(): SystemData[] {
  // TODO: return (await db.collection("systems").get()).docs.map(d => d.data())
  return systems.filter((s) => s.isActive);
}

export function getSystemBySlug(slug: string): SystemData | undefined {
  // TODO: return (await db.collection("systems").where("slug","==",slug).get()).docs[0]?.data()
  return systems.find((s) => s.slug === slug && s.isActive);
}

export function updateSystem(id: string, data: Partial<SystemData>): void {
  // TODO: await db.collection("systems").doc(id).update(data)
  const idx = systems.findIndex((s) => s.id === id);
  if (idx !== -1) Object.assign(systems[idx], data);
}

// ─── Site Content ──────────────────────────────────────────────

export function getSiteContent() {
  // TODO: return (await db.collection("siteContent").doc("global").get()).data()
  return siteContent;
}

export function updateSiteContent(section: string, data: Record<string, unknown>): void {
  // TODO: await db.collection("siteContent").doc("global").update({ [section]: data })
  Object.assign((siteContent as Record<string, unknown>)[section] as object, data);
}

// ─── Portfolio ─────────────────────────────────────────────────

export interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  result: string;
  imageUrl: string | null;
  linkUrl: string | null;
  status: "active" | "archived" | "placeholder";
  type: "design" | "development" | "full-stack" | "consulting";
  isFeatured: boolean;
  isActive: boolean;
}

// TODO: Replace with Firestore fetch from collection "portfolio"
const portfolioItems: PortfolioItem[] = [
  // Placeholder — real project data to be added in admin panel
  // The "עיצוב גביע ישראל" project will be added when assets are ready
];

export function getPortfolio(): PortfolioItem[] {
  // TODO: return (await db.collection("portfolio").orderBy("isFeatured","desc").get()).docs.map(d => d.data())
  return portfolioItems.filter((p) => p.isActive);
}

export function updatePortfolioItem(id: string, data: Partial<PortfolioItem>): void {
  // TODO: await db.collection("portfolio").doc(id).update(data)
  const idx = portfolioItems.findIndex((p) => p.id === id);
  if (idx !== -1) Object.assign(portfolioItems[idx], data);
}
