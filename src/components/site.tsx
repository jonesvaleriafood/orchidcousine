import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Instagram, Phone, MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import p1 from "@/assets/p1.jpg.asset.json";
import p2 from "@/assets/p2.jpg.asset.json";
import p3 from "@/assets/p3.jpg.asset.json";
import p4 from "@/assets/p4.jpg.asset.json";
import p5 from "@/assets/p5.jpg.asset.json";
import p6 from "@/assets/p6.jpg.asset.json";
import p7 from "@/assets/p7.jpg.asset.json";
import p8 from "@/assets/p8.jpg.asset.json";
import socialPreview from "@/assets/social-preview.jpg.asset.json";
import v3330 from "@/assets/v3330.mp4.asset.json";
import v3331 from "@/assets/v3331.mp4.asset.json";
import chefCompatible from "@/assets/chef-compatible.webm.asset.json";
import chefPoster from "@/assets/chef-poster.jpg.asset.json";
import v3334 from "@/assets/v3334.mp4.asset.json";
import v3335 from "@/assets/v3335.mp4.asset.json";
import { productMedia } from "@/lib/product-media";
import { CartButton, useCart } from "@/components/cart";
import { menu, servingPrice, requiresProtein, proteinChoices, mealCartItem, pricingPreview, type Dish } from "@/lib/menu";
export { menu, type Dish } from "@/lib/menu";

export const media = {
  flyer: p1.url,
  logo: p8.url,
  socialPreview: socialPreview.url,
  socialPreviewImage: `https://id-preview--6ee0f5a8-1323-4cfc-8c45-4723f85f2bd5.lovable.app${socialPreview.url}`,
  chefVideo: productMedia.chefVideo,
  chefPoster: productMedia.chefPoster,
  chefLounge: productMedia.chefLounge,
  chefPortrait: productMedia.chefPortrait,
  chefBar: productMedia.chefBar,
  reels: [v3330.url, v3331.url, v3334.url, v3335.url],
};

export const PHONE = "0906 946 0611";
export const WALK_IN_HOURS = "Tuesday–Sunday · 7:30pm–9:30pm";
export const PHONE_LINK = "tel:+2349069460611";
export const WHATSAPP = "https://wa.me/2349069460611";
export const INSTAGRAM = "https://instagram.com/orchid_cuisines";
export const VENUE = "5:30 Bar & Lounge";
export const ADDRESS = "Opposite Energy Switch filling station, Sharp Corner, Oluyole, Ibadan";
export const LOCATION = `${VENUE}, ${ADDRESS}`;
export const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(LOCATION)}`;
export const MAP_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(LOCATION)}&output=embed`;
export const DIRECTIONS_LINK = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(LOCATION)}`;

const nav = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu & Packages" },
  { to: "/pricing", label: "Prices" },
  { to: "/services", label: "Private Chef" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-md">
      <div className="mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-4 sm:px-6 xl:flex xl:justify-between">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <img src={media.logo} alt="Orchid Cuisines logo" className="h-10 w-10 shrink-0 rounded-full object-cover" />
          <span className="leading-none"><span className="block whitespace-nowrap font-display text-xl sm:text-2xl">Orchid <span className="text-primary">Cuisines</span></span><span className="mt-1 block text-[10px] uppercase text-muted-foreground">The chef’s signature · Ibadan</span></span>
        </Link>
        <nav className="hidden items-center gap-5 xl:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="text-sm uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary" activeProps={{ className: "text-primary" }} activeOptions={{ exact: true }}>
              {n.label}
            </Link>
          ))}
          <Button asChild><a href={WHATSAPP} target="_blank" rel="noreferrer">
            Talk to the chef <Instagram className="size-4" />
          </a></Button>
        </nav>
        <div className="flex shrink-0 items-center gap-2"><CartButton /><Button variant="ghost" size="icon" className="xl:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </Button></div>
      </div>
      {open && (
        <nav className="flex flex-col gap-4 border-t border-border bg-background px-6 py-6 xl:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="text-sm uppercase tracking-[0.2em]">{n.label}</Link>
          ))}
          <Button asChild><a href={WHATSAPP} target="_blank" rel="noreferrer">Talk to the chef</a></Button>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3">
        <div>
          <img src={media.logo} alt="Orchid Cuisines logo" className="mb-4 size-20 rounded-full object-cover" />
          <p className="font-display text-3xl">Orchid <span className="text-primary">Cuisines</span></p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">One chef. A distinctive taste of Ibadan. Signature plates, celebration tables and pots to take home.</p>
        </div>
        <div className="space-y-3 text-sm">
          <p className="text-xs uppercase tracking-[0.25em] text-primary">Visit</p>
          <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> <a href={MAP_LINK} target="_blank" rel="noreferrer" className="hover:text-primary">{VENUE}</a></p>
          <p className="max-w-xs leading-relaxed text-muted-foreground">{ADDRESS}</p>
          <p className="text-muted-foreground">Independent chef-owned kitchen at the lounge.</p>
          <p className="text-muted-foreground">Walk-in orders<br />{WALK_IN_HOURS}</p>
        </div>
        <div className="space-y-3 text-sm">
          <p className="text-xs uppercase tracking-[0.25em] text-primary">Reach us</p>
          <a href={PHONE_LINK} className="flex items-center gap-2 hover:text-primary"><Phone className="h-4 w-4 text-primary" /> {PHONE}</a>
          <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary"><Instagram className="h-4 w-4 text-primary" /> @orchid_cuisines</a>
        </div>
      </div>
      <p className="border-t border-border py-6 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Orchid Cuisines. All rights reserved.</p>
    </footer>
  );
}

export function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-20">{children}</main>
      <Footer />
    </div>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-primary"><span className="h-px w-10 bg-primary" />{children}</p>;
}

export function DishCard({ d }: { d: Dish }) {
  const cart = useCart();
  const [proteinId, setProteinId] = useState(requiresProtein(d) ? "" : "included");
  const needsSelection = requiresProtein(d) && !proteinId;
  const amount = servingPrice(d, proteinId);
  const price = d.price;
  const preview = pricingPreview(d);
  return (
    <article id={`item-${d.id}`} className="group flex h-full scroll-mt-40 flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/60">
      <div className="relative aspect-[4/5] overflow-hidden">
        {d.video ? (
          <video src={d.video} poster={preview.src} muted loop playsInline controls preload="none" aria-label={`${d.name} video`} className="h-full w-full object-cover" />
        ) : (
          <img src={preview.src} alt={preview.alt} loading="lazy" width={1024} height={1280} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        )}
        {d.tag && <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">{d.tag}</span>}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-2">
          <h3 className="font-display text-2xl leading-tight">{d.name}</h3>
          <span className="shrink-0 font-semibold text-primary">{price}</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{d.desc}</p>
        {d.photoNote && <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{d.photoNote}</p>}
        <div className="mt-auto pt-4">{d.chickenOption && <><label className="mb-3 block text-xs text-muted-foreground">{requiresProtein(d) ? "Base price above · protein required" : "Extra protein · named proteins already included"}<select aria-label={`Protein for ${d.name}`} value={proteinId} onChange={e => setProteinId(e.target.value)} className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">{requiresProtein(d) ? <option value="" disabled>Choose a protein portion</option> : <option value="included">Included proteins only</option>}{proteinChoices.map(p => <option key={p.id} value={p.id}>{p.name} +{p.price}</option>)}</select></label><div className="mb-4 flex min-h-6 justify-between gap-3 text-sm"><span className="text-muted-foreground">Meal total</span><span className="font-semibold text-primary">{needsSelection ? "Select protein" : amount === null ? "Quote required" : `₦${amount.toLocaleString("en-NG")}`}</span></div></>}
        <Button className="h-11 w-full" disabled={needsSelection} onClick={() => { if (needsSelection) return; cart.add(mealCartItem(d, proteinId)); }}>Add to cart <Plus className="size-4" /></Button></div>
      </div>
    </article>
  );
}
