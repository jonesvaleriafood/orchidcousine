import { createFileRoute } from "@tanstack/react-router";
import { Phone, Instagram, MapPin, Clock, ArrowUpRight, Navigation } from "lucide-react";
import { Page, Eyebrow, PHONE, PHONE_LINK, INSTAGRAM, WHATSAPP, media, VENUE, ADDRESS, LOCATION, MAP_LINK, WALK_IN_HOURS } from "@/components/site";
import { Button } from "@/components/ui/button";
import { IbadanMap } from "@/components/ibadan-map";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Orders — Orchid Cuisines" },
      { name: "description", content: `Find Orchid Cuisines at ${LOCATION}. Contact our independent kitchen for meal orders and private chef enquiries.` },
      { property: "og:title", content: "Contact & Orders — Orchid Cuisines" },
      { property: "og:description", content: `Visit our independent chef-owned kitchen at ${LOCATION}, or enquire on WhatsApp.` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: media.socialPreviewImage },
      { name: "twitter:image", content: media.socialPreviewImage },
      { property: "og:url", content: "https://orchidcousine.pages.dev/contact" },
    ],
    links: [{ rel: "canonical", href: "https://orchidcousine.pages.dev/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const items = [
    [Phone, "Call or WhatsApp", PHONE, WHATSAPP],
    [Instagram, "Instagram", "@orchid_cuisines", INSTAGRAM],
    [MapPin, "Find our kitchen", LOCATION, MAP_LINK],
    [Clock, "Walk-in orders", WALK_IN_HOURS, undefined],
  ] as const;
  return (
    <Page>
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <Eyebrow>Contact</Eyebrow>
        <h1 className="font-display text-5xl sm:text-6xl">Orchid Cuisines.<br /><em className="text-primary">At home in Ibadan.</em></h1>
        <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">Find our independent chef-owned kitchen at {VENUE}. Come for a signature plate, order a pot for home, or talk to the chef about your next celebration.</p>
        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <img src={media.flyer} alt="Orchid Cuisines original We have relocated to Ibadan flyer with contact details" className="mx-auto h-auto w-full max-w-md rounded-lg" />
          <div className="grid gap-4 sm:grid-cols-2">
          {items.map(([Icon, t, v, href]) => {
            const body = (<><Icon className="h-6 w-6 text-primary" /><p className="mt-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">{t}</p><p className="mt-2 break-words font-display text-2xl leading-snug">{v}</p></>);
            return href ? (
              <a key={t} href={href} target="_blank" rel="noreferrer" className="rounded-lg border border-border bg-card p-6 hover:border-primary">{body}</a>
            ) : (
              <div key={t} className="rounded-lg border border-border bg-card p-6">{body}</div>
            );
          })}
          <div className="flex flex-wrap gap-3 sm:col-span-2">
            <Button asChild size="lg"><a href={WHATSAPP} target="_blank" rel="noreferrer">Enquire on WhatsApp <ArrowUpRight /></a></Button>
            <Button asChild size="lg" variant="outline"><a href={PHONE_LINK}><Phone /> Call {PHONE}</a></Button>
          </div>
          </div>
        </div>
      </section>
      <section className="border-t border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
            <div><Eyebrow>Visit Orchid</Eyebrow><h2 className="font-display text-4xl">{VENUE}</h2><p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">{ADDRESS}</p><p className="mt-2 text-sm text-muted-foreground">Our own kitchen, our own flavour — located at the lounge.</p></div>
            <Button asChild size="lg"><a href={MAP_LINK} target="_blank" rel="noreferrer"><Navigation /> Get directions <ArrowUpRight /></a></Button>
          </div>
          <IbadanMap />
        </div>
      </section>
    </Page>
  );
}
