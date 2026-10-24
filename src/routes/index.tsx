import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, ArrowUpRight, ChefHat, Heart, MapPin, ArrowLeft, ArrowRight } from "lucide-react";
import { Page, Eyebrow, DishCard, media, WHATSAPP, INSTAGRAM, ADDRESS } from "@/components/site";
import { Button } from "@/components/ui/button";
import { CelebrationPackages, LitrePots } from "@/components/offerings";
import { HomeOpening } from "@/components/home-opening";
import { allDishes } from "@/lib/menu";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Orchid Cuisines — A Chef's Signature Taste in Ibadan" },
    { name: "description", content: "Discover Orchid Cuisines: a personal chef brand in Ibadan, with signature plates, engagement and wedding catering, and soups and stews by the litre." },
    { property: "og:title", content: "Orchid Cuisines — A Chef's Signature Taste in Ibadan" },
    { property: "og:description", content: "One chef. Distinctive flavours. Signature plates, celebration tables and pots for home in Ibadan." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
    { property: "og:image", content: media.socialPreviewImage }, { name: "twitter:image", content: media.socialPreviewImage },
    { name: "keywords", content: "Orchid Cuisines, private chef Ibadan, catering Ibadan, wedding catering Ibadan, food Oluyole, 5:30 Bar & Lounge, jollof, pasta, small chops, food by the litre" },
    { property: "og:url", content: "https://orchidcousine.pages.dev/" },
  ], links: [{ rel: "canonical", href: "https://orchidcousine.pages.dev/" }],
  scripts: [{ type: "application/ld+json", children: JSON.stringify({
    "@context": "https://schema.org", "@type": "Restaurant", name: "Orchid Cuisines",
    description: "Chef-led private chef and catering kitchen in Ibadan.", servesCuisine: ["Nigerian", "Intercontinental"],
    telephone: "+2349069460611", priceRange: "₦₦", sameAs: [INSTAGRAM], image: media.socialPreviewImage,
    address: { "@type": "PostalAddress", streetAddress: ADDRESS, addressLocality: "Ibadan", addressRegion: "Oyo", addressCountry: "NG" },
    openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "19:30", closes: "21:30" }],
  }) }],
  }), component: Index,
});

function ChefVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  return <div className="relative mx-auto aspect-[9/16] w-full max-w-xs overflow-hidden rounded-lg">
    <video ref={ref} src={media.chefVideo} poster={media.chefPoster} autoPlay muted loop playsInline onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} className="h-full w-full object-cover" />
    <div className="absolute inset-x-0 bottom-0 flex justify-between bg-background/80 p-4">
      <Button size="icon" aria-label={playing ? "Pause" : "Play"} onClick={() => { const v = ref.current; if (!v) return; if (v.paused) void v.play().catch(() => setPlaying(false)); else v.pause(); }}>{playing ? <Pause /> : <Play />}</Button>
      <Button size="icon" variant="secondary" aria-label={muted ? "Unmute" : "Mute"} onClick={() => { const v = ref.current; if (!v) return; v.muted = !v.muted; setMuted(v.muted); }}>{muted ? <VolumeX /> : <Volume2 />}</Button>
    </div>
  </div>;
}
function Index() {
  const featured = ["penne-pasta", "chinese-fried-rice", "loaded-fries"].flatMap(id => { const dish = allDishes.find(d => d.id === id); return dish ? [dish] : []; });
  return <Page>
    <HomeOpening />
    <div className="border-y border-border bg-card"><div className="mx-auto grid max-w-7xl grid-cols-3 gap-3 px-6 py-6 text-center text-xs sm:text-sm"><span>Signature plates</span><span className="border-x border-border">Private celebrations</span><span>Soups & stews by the litre</span></div></div>
    <section className="bg-paper text-ink"><div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
      <div className="mx-auto grid w-full max-w-md grid-cols-2 items-end gap-4"><ChefVideo /><img src={media.chefBar} alt="The Orchid Cuisines chef at the bar" loading="lazy" className="aspect-[9/16] w-full rounded-lg object-cover object-top" /></div>
      <div><Eyebrow>The woman behind the flavour</Eyebrow><h2 className="font-display text-5xl md:text-6xl">Not just a kitchen.<br /><em>A chef's signature.</em></h2><p className="mt-6 leading-relaxed text-paper-muted">Orchid Cuisines is personal. Nigerian comfort, continental inspiration, and the care of a chef who cooks every plate like it is going to someone she knows.</p><p className="mt-4 leading-relaxed text-paper-muted">Find our independent kitchen at 5:30 Bar & Lounge, opposite Energy Switch filling station, Sharp Corner, Oluyole, Ibadan. The lounge is our setting; the food, the imagination and the Orchid touch are our own.</p><p className="mt-6 font-display text-3xl italic">“Small kitchen. Generous spirit.”</p><div className="mt-8 flex flex-wrap gap-6 border-t border-ink/20 pt-6 text-sm"><span className="flex items-center gap-2"><ChefHat className="size-4 text-primary" />Chef-led</span><span className="flex items-center gap-2"><Heart className="size-4 text-primary" />Made with care</span><span className="flex items-center gap-2"><MapPin className="size-4 text-primary" />Ibadan at heart</span></div></div>
    </div></section>
    <section className="mx-auto max-w-7xl px-6 py-20"><div className="mb-10 flex flex-wrap items-end justify-between gap-4"><div><Eyebrow>A taste of Orchid</Eyebrow><h2 className="font-display text-5xl">The chef's signatures.</h2></div><Button asChild variant="outline" className="h-11"><Link to="/menu">See the whole menu <ArrowUpRight /></Link></Button></div><div className="grid items-stretch gap-6 md:grid-cols-3">{featured.map(d => <DishCard key={d.name} d={d} />)}</div></section>
    <section className="border-y border-border bg-card/40"><div className="mx-auto max-w-7xl px-6 py-20"><LitrePots /></div></section>
    <section className="mx-auto max-w-7xl px-6 py-20"><CelebrationPackages /></section>
    <section className="border-t border-border bg-paper text-ink"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-16 md:flex-row md:items-center"><div><p className="mb-3 text-sm text-paper-muted">From our Oluyole kitchen to your home or celebration.</p><h2 className="font-display text-5xl">Let's make it <em>an Orchid occasion.</em></h2></div><Button asChild size="lg" className="h-12 shrink-0"><a href={WHATSAPP} target="_blank" rel="noreferrer">Talk to the chef <ArrowUpRight /></a></Button></div></section>
  </Page>;
}
