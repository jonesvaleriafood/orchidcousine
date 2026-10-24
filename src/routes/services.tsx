import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Eyebrow, media, VENUE } from "@/components/site";
import { Button } from "@/components/ui/button";
import { CelebrationPackages, enquiryLink } from "@/components/offerings";
import { ArrowUpRight, ArrowDown, Check } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({ meta: [
    { title: "Private Chef, Engagement & Wedding Catering — Orchid Cuisines Ibadan" },
    { name: "description", content: "A personal chef for your special moments in Ibadan. Enquire about private dinners, engagement food, wedding packages and family litre pots." },
    { property: "og:title", content: "Your Private Chef in Ibadan — Orchid Cuisines" },
    { property: "og:description", content: "Personal menus for engagements, weddings, intimate dinners and your family table." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
    { property: "og:image", content: media.socialPreviewImage }, { name: "twitter:image", content: media.socialPreviewImage },
    { property: "og:url", content: "/services" },
  ], links: [{ rel: "canonical", href: "/services" }]  }), component: Services,
});
function Services() {
  return <Page>
    <section className="private-chef-opening relative isolate overflow-hidden">
      <img src={media.chefPortrait} alt="The woman behind Orchid Cuisines" fetchPriority="high" className="private-chef-portrait absolute right-0 top-0 h-full w-full object-cover object-top md:w-[62%]" />
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col justify-between gap-10 px-6 py-10 md:px-12 md:py-14 private-chef-intro">
        <p className="text-xs uppercase text-foreground/80">Orchid Cuisines / Private experiences / Ibadan</p>
        <div className="private-chef-copy"><Eyebrow>Your occasion. Her signature.</Eyebrow><h1 className="font-display">Your<br /><em className="text-primary">Private Chef.</em></h1><p className="mt-5 max-w-sm text-base leading-relaxed text-foreground/85">Not just a plate. A personal connection, a menu made for you, and the woman behind every flavour.</p><Button asChild size="lg" className="mt-7 h-12"><a href={enquiryLink("Hello Orchid Cuisines! I'd like to enquire about a private chef experience. My occasion is: __. Date: __. Guests: __. Location: __.")} target="_blank" rel="noreferrer">Talk to your chef <ArrowUpRight /></a></Button></div>
        <a href="#private-services" className="flex w-fit items-center gap-3 text-sm text-foreground/80"><ArrowDown className="size-4 text-primary" /> Dinners · Engagements · Weddings</a>
      </div>
    </section>
    <section className="bg-paper text-ink"><div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-[0.65fr_1.35fr] md:gap-16 md:px-12"><div><p className="mb-3 text-xs uppercase text-paper-muted">The Orchid approach</p><h2 className="font-display text-4xl">One chef.<br /><em>Your kind of gathering.</em></h2></div><div><p className="max-w-2xl font-display text-2xl leading-relaxed md:text-3xl">“A table should feel like the people gathered around it.”</p><p className="mt-4 max-w-xl text-sm leading-relaxed text-paper-muted">An independent chef brand based at {VENUE}, Oluyole. For private occasions, the conversation starts with your tastes — from Nigerian favourites to continental plates.</p><div className="mt-6 flex flex-wrap gap-x-7 gap-y-3 text-sm">{["Personal menus", "Dietary preferences discussed", "Home & private venues"].map(t => <span key={t} className="flex items-center gap-2"><Check className="size-4 text-primary" />{t}</span>)}</div></div></div></section>
    <section id="private-services" className="scroll-mt-24"><div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-20"><CelebrationPackages presentation="private" /></div></section>
    <section className="border-y border-border bg-card"><div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-[0.75fr_1.25fr] md:gap-20"><figure><div className="mx-auto grid max-w-md grid-cols-2 items-end gap-4"><video src={media.chefVideo} poster={media.chefPoster} muted loop playsInline controls preload="none" aria-label="Meet the Orchid Cuisines chef" className="aspect-[9/16] w-full rounded-lg object-cover" /><img src={media.chefLounge} alt="The Orchid Cuisines chef at the lounge" loading="lazy" className="aspect-[9/16] w-full rounded-lg object-cover object-top" /></div><figcaption className="mt-4 text-center text-xs uppercase text-muted-foreground">The person behind your experience</figcaption></figure><div><Eyebrow>Meet your chef</Eyebrow><h2 className="font-display text-5xl">A familiar face.<br /><em className="text-primary">A personal touch.</em></h2><p className="mt-5 max-w-lg leading-relaxed text-muted-foreground">From the first conversation to your celebration menu, your experience is shaped with the chef. Share the flavours you love, the people you're bringing together and what would make the occasion yours.</p><div className="mt-8 space-y-5">{[["Your occasion", "Share your date, venue and guest count."], ["Your menu", "Discuss dishes, portions and dietary preferences."], ["Your arrangements", "Confirm the quote and service details directly with the chef."]].map(([title, copy], i) => <div key={title} className="flex gap-4 border-t border-border pt-4"><span className="font-display text-2xl text-primary">0{i + 1}</span><div><h3 className="font-display text-2xl">{title}</h3><p className="mt-1 text-sm text-muted-foreground">{copy}</p></div></div>)}</div></div></div></section>
    <section><div className="mx-auto grid max-w-7xl items-center gap-8 px-6 py-16 md:grid-cols-[1fr_auto] md:px-12"><div><Eyebrow>Let's make it personal</Eyebrow><h2 className="font-display text-5xl">What are you celebrating?</h2><p className="mt-4 text-sm text-muted-foreground">Private services are quoted individually. Your enquiry isn't a confirmed booking.</p></div><Button asChild size="lg" className="h-12"><a href={enquiryLink("Hello Orchid Cuisines! I'd like to plan a private occasion. Occasion: __. Date: __. Guests: __. Venue: __. Preferred dishes: __.")} target="_blank" rel="noreferrer">Start a conversation <ArrowUpRight /></a></Button><div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 md:col-span-2"><p className="text-sm text-muted-foreground">Just looking for a generous pot to share?</p><Button asChild variant="ghost"><Link to="/menu">Explore family pots & menus <ArrowUpRight /></Link></Button></div></div></section>
  </Page>;
}
