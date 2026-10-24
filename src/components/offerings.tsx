import { useState } from "react";
import { ArrowUpRight, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP, Eyebrow } from "@/components/site";
import { celebrationPackages, offeringImages, pots, potSizes } from "@/lib/offerings";
import { useCart } from "@/components/cart";

export function enquiryLink(message: string) {
  return `${WHATSAPP}?text=${encodeURIComponent(message)}`;
}

export function CelebrationPackages({ presentation = "default" }: { presentation?: "default" | "private" }) {
  if (presentation === "private") return <div>
    <div className="mb-10 flex flex-wrap items-end justify-between gap-5"><div><Eyebrow>Private services</Eyebrow><h2 className="font-display text-5xl md:text-6xl">An occasion.<br /><em className="text-primary">Entirely yours.</em></h2></div><p className="max-w-sm text-sm leading-relaxed text-muted-foreground">Your people, your favourite flavours, your own menu. Each experience begins with a conversation.</p></div>
    {[celebrationPackages[2], celebrationPackages[0], celebrationPackages[1]].map((p, i) => p && <article key={p.name} className="grid gap-6 border-t border-border py-9 md:grid-cols-[60px_minmax(0,1fr)_minmax(0,0.85fr)] md:gap-8">
      <span className="font-display text-4xl text-primary">0{i + 1}</span><div><p className="mb-2 text-xs uppercase text-muted-foreground">{p.label}</p><h3 className="font-display text-4xl">{p.name}</h3><p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">{p.description}</p></div><div><ul className="space-y-3 text-sm">{p.includes.map(item => <li key={item} className="flex gap-3"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{item}</li>)}</ul><p className="mb-4 mt-6 text-xs text-muted-foreground">Quote tailored to your menu & guest count</p><Button asChild variant="outline" className="h-11 w-full sm:w-auto"><a href={enquiryLink(`Hello Orchid Cuisines! I'd like to enquire about ${p.enquiry}. My event date is: __. Guest count: __. Venue: __.`)} target="_blank" rel="noreferrer">Discuss {i === 0 ? "your dinner" : i === 1 ? "your engagement" : "your wedding"} <ArrowUpRight /></a></Button></div>
    </article>)}
  </div>;
  return (
    <div>
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div><Eyebrow>Gather beautifully</Eyebrow><h2 className="font-display text-5xl">Big moments.<br /><em className="text-primary">Unforgettable food.</em></h2><p className="mt-5 max-w-lg text-muted-foreground">From an introduction between families to the wedding of your dreams. A menu that feels like you, cooked with the Orchid touch.</p></div>
        <div className="grid grid-cols-2 gap-3"><img src={offeringImages.noodles} alt="Orchid noodles and chicken in takeaway boxes" loading="lazy" className="aspect-[4/5] w-full rounded-lg object-cover" /><div className="pt-10"><img src={offeringImages.friedRice} alt="Orchid fried rice, chicken and plantain" loading="lazy" className="aspect-[4/5] w-full rounded-lg object-cover" /></div></div>
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {celebrationPackages.map((p, i) => <article key={p.name} className="flex flex-col rounded-lg border border-border bg-card p-7"><div className="flex items-center justify-between"><span className="font-display text-4xl text-primary">0{i + 1}</span><ArrowUpRight className="size-5 text-muted-foreground" /></div><p className="mt-6 text-xs uppercase text-primary">{p.label}</p><h3 className="mt-2 font-display text-3xl">{p.name}</h3><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.description}</p><ul className="my-6 space-y-3 text-sm">{p.includes.map(item => <li key={item} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{item}</li>)}</ul><div className="mt-auto border-t border-border pt-5"><p className="mb-4 text-xs text-muted-foreground">Priced to your menu & guest count</p><Button asChild variant="outline" className="w-full"><a href={enquiryLink(`Hello Orchid Cuisines! I'd like to enquire about ${p.enquiry}. My event date is: __. Guest count: __. Venue: __.`)} target="_blank" rel="noreferrer">Enquire about package <ArrowUpRight /></a></Button></div></article>)}
      </div>
    </div>
  );
}

export function LitrePots() {
  const cart = useCart();
  const [size, setSize] = useState<string>(potSizes[1]);
  const [dish, setDish] = useState(pots[0]?.name ?? "Peppered Beef Stew");
  const selected = pots.find(p => p.name === dish);
  const image = selected?.image ?? offeringImages.litreContainer;
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
      <figure>{selected && "video" in selected && selected.video ? <video key={selected.video} src={selected.video} poster={image} controls muted playsInline preload="none" aria-label={`${dish} serving video`} className="aspect-[4/5] max-h-[620px] w-full rounded-lg object-cover" /> : <img src={image} alt={`${dish} — ${selected?.caption}`} loading="lazy" className="aspect-[4/5] max-h-[620px] w-full rounded-lg object-cover" />}<figcaption className="mt-3 text-xs text-muted-foreground">{selected?.caption}. Container shown is not a capacity guide.</figcaption></figure>
      <div><Eyebrow>Take a little Orchid home</Eyebrow><h2 className="font-display text-5xl">Your favourites.<br /><em className="text-primary">A bigger helping.</em></h2><p className="mt-4 text-muted-foreground">Rice, pasta and family favourites in generous containers. Soups and stews by the litre. Something delicious for your own table.</p>
        <label htmlFor="pot-dish" className="mb-2 mt-7 block text-sm font-semibold">Choose your pot</label><select id="pot-dish" value={dish} onChange={e => setDish(e.target.value)} className="h-12 w-full rounded-md border border-input bg-background px-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring">{pots.map(p => <option key={p.name}>{p.name}</option>)}</select><p className="mt-2 min-h-10 text-sm text-muted-foreground">{selected?.description}</p>
        <fieldset className="mt-5"><legend className="mb-3 text-sm font-semibold">Container size</legend><div className="grid grid-cols-4 gap-2">{potSizes.map(s => <Button key={s} variant={s === size ? "default" : "outline"} aria-pressed={s === size} onClick={() => setSize(s)} className="px-1">{s}</Button>)}</div></fieldset>
        <p className="mb-5 mt-4 text-xs text-muted-foreground">Sizes, protein choices & prices confirmed by the chef.</p><Button size="lg" className="h-12 w-full sm:w-auto" onClick={() => cart.add({ id: `pot:${dish}:${size}`, name: dish, option: size, unitPrice: null, image })}><MessageCircle />Add this pot to cart <ArrowUpRight /></Button>
      </div>
    </div>
  );
}