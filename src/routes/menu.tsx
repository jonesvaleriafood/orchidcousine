import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Page, Eyebrow, DishCard, menu, WHATSAPP, VENUE, media } from "@/components/site";
import { Button } from "@/components/ui/button";
import { CelebrationPackages, LitrePots } from "@/components/offerings";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { allDishes } from "@/lib/menu";

export const Route = createFileRoute("/menu")({
  validateSearch: (search: Record<string, unknown>): { item?: string } => {
    const item = search["item"];
    return typeof item === "string" && allDishes.some(d => d.id === item) ? { item } : {};
  },
  head: () => ({ meta: [
    { title: "Menu, Litre Pots & Celebration Packages — Orchid Cuisines" },
    { name: "description", content: "Explore Orchid Cuisines signature plates, soups and stews in litre containers, engagement catering and wedding menus in Ibadan." },
    { property: "og:title", content: "Menu & Packages — Orchid Cuisines, Ibadan" },
    { property: "og:description", content: "Signature plates, soups by the litre and chef-led celebration packages." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
    { property: "og:image", content: media.socialPreviewImage }, { name: "twitter:image", content: media.socialPreviewImage },
    { property: "og:url", content: "https://orchidcousine.pages.dev/menu" },
  ], links: [{ rel: "canonical", href: "https://orchidcousine.pages.dev/menu" }]  }), component: MenuPage,
});
const views = ["Signature plates", "Soups & litre pots", "Celebration packages"] as const;
function MenuPage() {
  const { item } = Route.useSearch();
  const navigate = Route.useNavigate();
  const selected = allDishes.find(d => d.id === item);
  useEffect(() => { if (item) setView(views[0]); }, [item]);
  const [view, setView] = useState<(typeof views)[number]>(views[0]);
  return <Page>
    <section className="mx-auto max-w-7xl px-6 pb-10 pt-16"><Eyebrow>Made with the Orchid touch</Eyebrow><h1 className="font-display text-6xl md:text-7xl">A menu for <em className="text-primary">your moments.</em></h1><p className="mt-5 text-muted-foreground">One plate. A family pot. A celebration to remember. Prepared by our independent kitchen at {VENUE}, Oluyole, Ibadan.</p></section>
    <div className="sticky top-20 z-20 border-y border-border bg-background/95 backdrop-blur"><div role="tablist" aria-label="Menu categories" className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-4">{views.map((v, i) => <Button key={v} id={`menu-tab-${i}`} role="tab" aria-selected={view === v} aria-controls="menu-content" variant={view === v ? "default" : "ghost"} onClick={() => setView(v)} className="shrink-0">{v}</Button>)}</div></div>
    <div id="menu-content" role="tabpanel" aria-labelledby={`menu-tab-${views.indexOf(view)}`}>
      {view === views[0] && <>{selected ? <section className="mx-auto max-w-7xl px-6 py-12"><Button variant="link" className="mb-6 px-0" onClick={() => navigate({ search: {} })}><ArrowLeft /> All menu items</Button><div className="max-w-md"><DishCard key={selected.id} d={selected} /></div></section> : menu.map(c => <section key={c.category} className="mx-auto max-w-7xl px-6 py-12"><div className="mb-8 border-b border-border pb-5"><h2 className="font-display text-4xl">{c.category}</h2><p className="mt-2 text-sm text-muted-foreground">{c.note}</p></div><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{c.dishes.map(d => <DishCard key={d.name} d={d} />)}</div></section>)}<div className="pb-16 text-center"><Button asChild size="lg"><a href={WHATSAPP} target="_blank" rel="noreferrer">Place an order <ArrowUpRight /></a></Button></div></>}
      {view === views[1] && <section className="mx-auto max-w-7xl px-6 py-16"><LitrePots /></section>}
      {view === views[2] && <section className="mx-auto max-w-7xl px-6 py-16"><CelebrationPackages /></section>}
    </div>
  </Page>;
}
