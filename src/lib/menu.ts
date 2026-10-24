import penne from "@/assets/p3.jpg.asset.json";
import rice from "@/assets/p6.jpg.asset.json";
import friedRice from "@/assets/p7.jpg.asset.json";
import spaghetti from "@/assets/p2.jpg.asset.json";
import wings from "@/assets/p4.jpg.asset.json";
import { productMedia } from "@/lib/product-media";
import plantainCloseup from "@/assets/pricing-plantain.jpg.asset.json";
import chickenCloseup from "@/assets/pricing-chicken.jpg.asset.json";
import beefCloseup from "@/assets/pricing-beef.jpg.asset.json";
import eggCloseup from "@/assets/pricing-egg.jpg.asset.json";
import pastaCloseup from "@/assets/pricing-pasta.jpg.asset.json";
import riceCloseup from "@/assets/pricing-rice.jpg.asset.json";
import bitesCloseup from "@/assets/pricing-bites.jpg.asset.json";
import drinkCloseup from "@/assets/pricing-drink.jpg.asset.json";
import yellowJuiceCloseup from "@/assets/pricing-yellow-juice.jpg.asset.json";
import redJuiceCloseup from "@/assets/pricing-red-juice.jpg.asset.json";
import gizdodoImage from "@/assets/menu-gizdodo.jpg";
import turkeyImage from "@/assets/menu-turkey.jpg";
import eggImage from "@/assets/menu-egg.jpg";
import croakerImage from "@/assets/menu-croaker.jpg";
import hakeImage from "@/assets/menu-hake.jpg";
import plantainImage from "@/assets/menu-plantain.jpg";
import beefImage from "@/assets/menu-beef.jpg";
import asunImage from "@/assets/menu-asun.jpg";
import coleslawImage from "@/assets/menu-coleslaw.jpg";
import shawarmaImage from "@/assets/menu-shawarma.jpg";
import chickenImage from "@/assets/menu-chicken.jpg";
import oreoImage from "@/assets/menu-oreo.jpg";
import vanillaImage from "@/assets/menu-vanilla.jpg";
import strawberryImage from "@/assets/menu-strawberry.jpg";
import chocolateImage from "@/assets/menu-chocolate.jpg";
import pineappleImage from "@/assets/menu-pine-ginger.jpg";
import tigernutImage from "@/assets/menu-tigernut.jpg";
import zoboImage from "@/assets/menu-zobo.jpg";

export type Dish = { id: string; name: string; desc: string; price: string; amount: number | null; img?: string; video?: string; poster?: string; tag?: string; chickenOption?: boolean; photoNote?: string };
const item = (id: string, name: string, amount: number | null, desc: string, extra: Partial<Dish> = {}): Dish => ({ id, name, amount, price: amount === null ? "Enquire" : `₦${amount.toLocaleString("en-NG")}`, desc, ...extra });
const mealPhotoNote = "Serving photo includes chicken. Base rice is ₦5,000; with a chicken portion, the plate is ₦8,000. Protein is required.";
export const menu: { category: string; note: string; dishes: Dish[] }[] = [
  { category: "Pasta Arena", note: "Pasta, the Orchid way", dishes: [
    item("stir-fry-pasta", "Stir fry pasta & sausage", 4000, "Stir-fried pasta with sausage.", { img: spaghetti.url, chickenOption: true, photoNote: mealPhotoNote }),
    item("native-pasta", "Native pasta, fish, ponmo, assorted & boiled egg", 5000, "Native-style pasta with fish, ponmo, assorted meat and boiled egg."),
    item("penne-pasta", "Penne pasta, sausage & chicken chunks", 5000, "Penne with sausage and chicken chunks. A separate chicken portion is not included.", { img: penne.url, chickenOption: true, photoNote: "Base pasta is ₦5,000. Choose a protein portion; with chicken the meal is ₦8,000." }),
  ] },
  { category: "Rice Villa", note: "Rice + chicken ₦8,000 · named meat and fish are included; plain rice requires a protein portion", dishes: [
    item("asun-rice", "Asun rice", 5000, "Rice with peppered asun.", { chickenOption: true }),
    item("native-rice", "Native rice, ponmo, fish, assorted & boiled egg", 5000, "Native rice with ponmo, fish, assorted meat and boiled egg.", { chickenOption: true }),
    item("oc-rice", "OC rice", 5000, "Stir fry basmati rice with sausage and beef chunks.", { chickenOption: true }),
    item("chinese-fried-rice", "Chinese fried rice", 5000, "Orchid's vegetable fried rice.", { img: friedRice.url, chickenOption: true, photoNote: mealPhotoNote }),
    item("coconut-rice", "Coconut Rice", 5000, "Fragrant coconut rice.", { chickenOption: true }),
  ] },
  { category: "Sides", note: "A little something alongside", dishes: [
    item("plantain", "Plantain", 1000, "Golden plantain."), item("coleslaw", "Coleslaw", 1000, "Fresh coleslaw."),
  ] },
  { category: "Protein", note: "Choose your extra portion", dishes: [
    item("chicken", "Chicken", 3000, "A separate portion of chicken."), item("turkey", "Turkey", 5000, "A portion of turkey."),
    item("fish-croaker", "Fish Croaker", 3000, "A portion of croaker fish."), item("hake", "Hake", 2000, "A portion of hake fish."),
    item("beef", "Beef", 1000, "A portion of beef."), item("egg", "Egg", 500, "A boiled egg."),
  ] },
  { category: "Finger Foods", note: "Small bites, generous flavour", dishes: [
    item("jiggy-shawarma", "Jiggy shawarma", 3500, "Orchid's shawarma."),
    item("loaded-fries", "Loaded fries", 10000, "Fries topped with peppered bites and onions.", { img: productMedia.fries }),
    item("gizdodo", "Gizdodo", 3000, "Peppered gizzard and plantain."), item("asun", "Asun", 3000, "Peppered asun."),
    item("chicken-fries", "Chicken and Fries", 7000, "Chicken with fries.", { img: wings.url }),
  ] },
  { category: "Milkshakes", note: "Something sweet to finish", dishes: [
    item("oreo-creme", "Oreo and crème", 9000, "Oreo and crème milkshake."), item("vanilla", "Vanilla", 8000, "Vanilla milkshake."),
    item("strawberry", "Strawberry", 8000, "Strawberry milkshake."), item("chocolate", "Chocolate", 8000, "Chocolate milkshake."),
  ] },
  { category: "Juice (35 cl)", note: "Fresh flavours · prices for 35 cl", dishes: [
    item("pine-ginger", "Pine&ger", 3000, "35 cl juice. Confirm today's blend with the chef."),
    item("watermelon", "Watermelon", 3000, "Watermelon juice · 35 cl. Other pouch and bottle sizes quoted separately.", { video: productMedia.watermelonVideo, poster: productMedia.watermelonPoster, photoNote: "Video shows available packaging; listed price is for 35 cl." }),
    item("tigernut", "Tigernut Drink", 2500, "Tigernut drink · 35 cl."), item("zobo", "Zobo Drink", 1500, "Zobo drink · 35 cl."),
  ] },
  { category: "More from the Kitchen", note: "Available portions and prices confirmed with the chef", dishes: [
    item("smoky-jollof", "Smoky Jollof", null, "Smoky jollof, chicken and plantain. Ask about today's plate price.", { img: rice.url }),
    item("cheesy-pasta", "Cheesy Pasta Bake", null, "Pasta beneath a golden melted-cheese topping.", { img: productMedia.pasta }),
    item("pepper-soup", "Catfish Pepper Soup", null, "Ask about fish, portions and accompaniments.", { video: productMedia.soupVideo, poster: productMedia.soupPoster }),
    item("small-chops", "Small Chops Platter", null, "Small bites for the table.", { video: productMedia.platterVideo, poster: productMedia.platterPoster }),
    item("red-stew", "Red Pepper Stew & Eggs", null, "Red stew with protein and boiled eggs.", { video: productMedia.stewVideo, poster: productMedia.stewPoster }),
    item("beef-jollof", "Beef Jollof Bowl", null, "Jollof crowned with braised beef.", { video: productMedia.riceVideo, poster: productMedia.ricePoster }),
    item("chicken-chops", "Chicken & Small Chops Box", null, "Chicken with puff-puff and bite-sized favourites.", { img: productMedia.chops, video: productMedia.chopsVideo, poster: productMedia.chopsPoster }),
    item("drizzle-drink", "Chocolate-Drizzle Drink", null, "Creamy drink with chocolate drizzle. Confirm the flavour and size.", { img: productMedia.drink }),
  ] },
];
export const allDishes = menu.flatMap(category => category.dishes);
const generatedPreviews: Record<string, string> = {
  gizdodo: gizdodoImage, turkey: turkeyImage, egg: eggImage,
  "fish-croaker": croakerImage, hake: hakeImage, plantain: plantainImage,
  beef: beefImage, asun: asunImage, coleslaw: coleslawImage,
  "jiggy-shawarma": shawarmaImage, chicken: chickenImage,
  "oreo-creme": oreoImage, vanilla: vanillaImage, strawberry: strawberryImage,
  chocolate: chocolateImage, "pine-ginger": pineappleImage, tigernut: tigernutImage, zobo: zoboImage,
};
// Reference photos fill catalogue gaps without claiming to show an unphotographed item.
export function pricingPreview(dish: Dish) {
  const ownPhoto = dish.img ?? dish.poster;
  if (ownPhoto) return { src: ownPhoto, alt: dish.name, isReference: false, isGenerated: false, label: "" };
  const generated = generatedPreviews[dish.id];
  if (generated) return { src: generated, alt: dish.name, isReference: true, isGenerated: true, label: "" };
  const category = menu.find(group => group.dishes.some(item => item.id === dish.id))?.category;
  const details: Record<string, { src: string; subject: string }> = {
    plantain: { src: plantainCloseup.url, subject: "Plantain detail from your pasta plate" },
    chicken: { src: chickenCloseup.url, subject: "Chicken detail from your rice plate" },
    beef: { src: beefCloseup.url, subject: "Beef detail from your jollof bowl" },
    egg: { src: eggCloseup.url, subject: "Boiled egg detail from your red stew" },
    "asun-rice": { src: productMedia.ricePoster, subject: "Orchid beef jollof bowl" },
    "native-rice": { src: riceCloseup.url, subject: "Orchid seasoned rice detail" },
    "oc-rice": { src: rice.url, subject: "Orchid rice plate" },
    "coconut-rice": { src: friedRice.url, subject: "Orchid vegetable rice serving" },
    gizdodo: { src: plantainCloseup.url, subject: "Orchid plantain detail" },
    asun: { src: bitesCloseup.url, subject: "Orchid peppered bites detail" },
    "pine-ginger": { src: yellowJuiceCloseup.url, subject: "Orchid yellow drink pouch" },
    zobo: { src: redJuiceCloseup.url, subject: "Orchid red watermelon drink pouch" },
  };
  const references: Record<string, { src: string; subject: string }> = {
    "Pasta Arena": { src: pastaCloseup.url, subject: "Orchid pasta detail" },
    "Rice Villa": { src: riceCloseup.url, subject: "Orchid rice detail" },
    "Sides": { src: rice.url, subject: "Orchid rice, chicken and plantain plate" },
    "Protein": { src: productMedia.stewPoster, subject: "Orchid mixed-protein stew" },
    "Finger Foods": { src: productMedia.chops, subject: "Orchid chicken and small chops box" },
    "Milkshakes": { src: drinkCloseup.url, subject: "Orchid chocolate-drizzle drink close-up" },
    "Juice (35 cl)": { src: yellowJuiceCloseup.url, subject: "Orchid drink pouch close-up" },
  };
  const reference = details[dish.id] ?? references[category ?? ""] ?? { src: rice.url, subject: "Orchid kitchen serving" };
  return { src: reference.src, alt: dish.name, isReference: true, isGenerated: false, label: "" };
}
export const proteinChoices = menu.find(c => c.category === "Protein")?.dishes ?? [];
export function requiresProtein(dish: Dish) { return ["stir-fry-pasta", "penne-pasta", "chinese-fried-rice", "coconut-rice"].includes(dish.id); }
export function servingPrice(dish: Dish, proteinId: string = "chicken") {
  if (dish.amount === null) return null;
  if (!dish.chickenOption) return dish.amount;
  const protein = proteinChoices.find(p => p.id === proteinId);
  const proteinAmount = protein?.amount ?? (requiresProtein(dish) ? 3000 : 0);
  return dish.amount + proteinAmount;
}
export function mealCartItem(dish: Dish, proteinId: string = "chicken") {
  const protein = dish.chickenOption ? proteinChoices.find(p => p.id === proteinId) ?? (requiresProtein(dish) ? proteinChoices.find(p => p.id === "chicken") : undefined) : undefined;
  return { id: `dish:${dish.id}:${protein?.id ?? "included"}`, name: dish.name, option: protein ? `Meal + ${protein.name} portion (+${protein.price})` : "Standard serving · named ingredients included", unitPrice: servingPrice(dish, protein?.id ?? "included"), image: dish.img ?? dish.poster };
}