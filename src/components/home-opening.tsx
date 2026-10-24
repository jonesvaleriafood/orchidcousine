import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VENUE, MAP_LINK } from "@/components/site";
import rice from "@/assets/p6.jpg.asset.json";
import pasta from "@/assets/p3.jpg.asset.json";
import friedRice from "@/assets/p7.jpg.asset.json";

const slides = [
  { image: rice.url, name: "Smoky jollof, chicken & plantain", title: "Rooted in Ibadan.", subtitle: "A personal touch. A taste of our own." },
  { image: pasta.url, name: "Penne pasta & chicken", title: "A world of flavour.", subtitle: "Continental inspiration. An unmistakable Orchid touch." },
  { image: friedRice.url, name: "Fried rice, chicken & plantain", title: "Made for your moments.", subtitle: "From your favourite plate to your biggest celebration." },
] as const;
export function HomeOpening() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);
  const slide = slides[active] ?? slides[0];
  const change = (direction: number) => setActive(current => (current + direction + slides.length) % slides.length);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (paused || motion.matches) return;
    const timer = window.setInterval(() => { if (!document.hidden) setActive(current => (current + 1) % slides.length); }, 6500);
    return () => window.clearInterval(timer);
  }, [paused, active]);
  return <section className="brand-hero signature-hero opening-carousel relative isolate overflow-hidden" aria-roledescription="carousel" aria-label="Orchid signature dishes" onTouchStart={e => { touchStart.current = e.touches[0]?.clientX ?? null; }} onTouchEnd={e => { const end = e.changedTouches[0]?.clientX; if (touchStart.current !== null && end !== undefined && Math.abs(end - touchStart.current) > 50) change(end < touchStart.current ? 1 : -1); touchStart.current = null; }}>
    {slides.map((s, i) => <img key={s.image} src={s.image} alt={s.name} aria-hidden={i !== active} className={`opening-photo absolute inset-0 h-full w-full object-cover ${i === active ? "is-active" : ""}`} fetchPriority={i === 0 ? "high" : "auto"} />)}
    <div className="opening-inner relative z-10 mx-auto flex max-w-7xl flex-col justify-between px-6 py-10 md:px-12 md:py-14">
      <div className="flex items-center gap-3 text-xs uppercase text-foreground/85"><span className="h-px w-10 bg-primary" />Independent chef · Ibadan</div>
      <div className="opening-copy py-8"><p className="mb-4 font-display text-2xl italic text-primary">{slide.title}</p><h1 className="opening-title font-display">Orchid<br /><em className="text-primary">Cuisines.</em></h1><p className="mt-6 max-w-lg font-display text-2xl sm:text-3xl">{slide.subtitle}</p><div className="mt-7 flex flex-col gap-3 sm:flex-row"><Button asChild size="lg" className="h-12"><Link to="/menu">Explore the menu <ArrowUpRight /></Link></Button><Button asChild size="lg" variant="outline" className="h-12 bg-background/30"><Link to="/pricing">See prices <ArrowUpRight /></Link></Button></div></div>
      <div className="opening-bottom grid gap-5 border-t border-foreground/25 pt-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end"><div className="min-w-0"><a href={MAP_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-foreground/80"><MapPin className="size-4 shrink-0 text-primary" />{VENUE} · Oluyole</a><p className="mt-2 text-xs text-foreground/65">Signature plates / Private celebrations / Family pots</p></div><div className="flex items-center gap-3"><Button size="icon" variant="outline" aria-label="Previous opening" onClick={() => change(-1)}><ArrowLeft /></Button><span className="w-12 text-center text-xs">0{active + 1} / 03</span><Button size="icon" variant="outline" aria-label="Next opening" onClick={() => change(1)}><ArrowRight /></Button><Button size="icon" variant="ghost" aria-label={paused ? "Resume slideshow" : "Pause slideshow"} onClick={() => setPaused(!paused)}>{paused ? <Play /> : <Pause />}</Button></div></div>
    </div>
    <div className="opening-dish-label absolute bottom-36 right-12 z-10 hidden text-right lg:block"><span className="mb-2 block text-xs uppercase text-foreground/80">From our kitchen</span><span className="font-display text-2xl">{slide.name}</span></div>
  </section>;
}