/// <reference types="google.maps" />
import { useEffect, useRef, useState } from "react";
import { MapPin, ArrowUpRight, Navigation } from "lucide-react";
import { MAP_LINK, DIRECTIONS_LINK, LOCATION, VENUE } from "@/components/site";
import boundary from "@/lib/ibadan-shape.json";
import mapPreview from "@/assets/ibadan-street-map.jpg.asset.json";

declare global {
  interface Window { initOrchidMap?: () => void }
}

function tokenHex(token: string) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
  ctx.fillRect(0, 0, 1, 1);
  return "#" + Array.from(ctx.getImageData(0, 0, 1, 1).data).slice(0, 3).map(v => v.toString(16).padStart(2, "0")).join("");
}

export function IbadanMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    // Restricted browser maps are only loaded on authorized, credential-free origins.
    if (!window.location.hostname.endsWith(".lovable.app") && !window.location.hostname.endsWith(".lovableproject.com")) {
      setStatus("preview");
      return;
    }
    const key = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY"];
    if (!key) { setStatus("unavailable"); return; }
    let disposed = false;
    let map: google.maps.Map | undefined;
    const init = () => {
      if (disposed || !ref.current) return;
      map = new google.maps.Map(ref.current, {
        center: { lat: 7.39, lng: 3.85 }, zoom: 11, clickableIcons: false,
        disableDefaultUI: true, zoomControl: true, gestureHandling: "cooperative",
        styles: [
          { elementType: "geometry", stylers: [{ color: tokenHex("--map-land") }] },
          { elementType: "labels.text.fill", stylers: [{ color: tokenHex("--foreground") }] },
          { elementType: "labels.text.stroke", stylers: [{ color: tokenHex("--background") }] },
          { featureType: "road", elementType: "geometry", stylers: [{ color: tokenHex("--primary") }] },
          { featureType: "water", elementType: "geometry", stylers: [{ color: tokenHex("--map-water") }] },
          { featureType: "poi", stylers: [{ visibility: "off" }] },
          { featureType: "transit", stylers: [{ visibility: "off" }] },
        ],
      });
      const pinColor = tokenHex("--primary");
      const focus = (spot: google.maps.LatLng, exact: boolean) => {
        map?.setCenter(spot);
        map?.setZoom(exact ? 15 : 12);
        if (exact && map) {
          new google.maps.Marker({
            position: spot, map, title: VENUE,
            icon: { path: google.maps.SymbolPath.CIRCLE, scale: 10, fillColor: pinColor, fillOpacity: 1, strokeColor: "#ffffff", strokeWeight: 3 },
          });
        }
        if (!disposed) setStatus("ready");
      };
      // The default view opens on the venue: Google resolves the shared exact-destination address.
      new google.maps.Geocoder().geocode({ address: LOCATION, region: "ng" }, (results, state) => {
        if (disposed) return;
        const spot = state === "OK" ? results?.[0]?.geometry?.location : undefined;
        if (spot && map) focus(spot, true);
        else map?.fitBounds(boundary.bounds, 0);
        if (!disposed) setStatus("ready");
      });
    };
    if (window.google?.maps?.Map) init();
    else {
      window.initOrchidMap = init;
      const script = document.createElement("script");
      script.id = "orchid-google-map";
      script.async = true;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&loading=async&callback=initOrchidMap&channel=${import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID"] ?? ""}`;
      script.onerror = () => { if (!disposed) setStatus("unavailable"); };
      document.head.appendChild(script);
    }
    return () => { disposed = true; if (map) google.maps.event.clearInstanceListeners(map); document.getElementById("orchid-google-map")?.remove(); };
  }, []);
  return <div className="ibadan-atlas">
    <div className="mb-5 flex items-baseline justify-between gap-4"><p className="font-display text-5xl text-primary sm:text-7xl">Ibadan.</p><span className="text-right text-xs text-muted-foreground">Our city. Our flavour.<br />{boundary.label}</span></div>
    <svg className="absolute size-0" aria-hidden="true"><defs><clipPath id="ibadan-outline" clipPathUnits="objectBoundingBox"><path d={boundary.path} /></clipPath></defs></svg>
    <div className="ibadan-map-shell">
      <div className="ibadan-map-cutout"><img src={mapPreview.url} alt="Street map of Ibadan showing roads and neighbourhoods" className="absolute inset-0 h-full w-full object-fill" /><div ref={ref} className={`relative h-full w-full ${status !== "ready" ? "invisible" : ""}`} aria-label="Orange-styled Google map of Ibadan" /></div>
      <a href={MAP_LINK} target="_blank" rel="noreferrer" className="ibadan-location group"><MapPin className="size-8 shrink-0 text-primary" /><span><span className="block font-display text-2xl">Orchid Cuisines <ArrowUpRight className="inline size-4" /></span><span className="block text-xs text-muted-foreground">{VENUE} · Oluyole area</span></span></a>
      <span className="absolute right-2 top-5 text-xs text-primary">N ↑</span>
      <a href={DIRECTIONS_LINK} target="_blank" rel="noreferrer" className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-lg transition-transform hover:scale-[1.03] sm:left-auto sm:right-4">
        <Navigation className="size-4" /> Turn-by-turn directions
      </a>
    </div>
    <div className="mt-4 flex flex-wrap justify-between gap-3 text-xs text-muted-foreground"><a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer" className="hover:text-primary">Map © OpenStreetMap contributors</a><a href={boundary.source} target="_blank" rel="noreferrer" className="hover:text-primary">Ibadan boundary source</a><span>Oluyole area · open directions for the exact destination</span></div>
  </div>;
}