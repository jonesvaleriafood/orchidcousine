import rice from "@/assets/p6.jpg.asset.json";
import pasta from "@/assets/p3.jpg.asset.json";
import noodles from "@/assets/p5.jpg.asset.json";
import friedRice from "@/assets/p7.jpg.asset.json";
import familyRice from "@/assets/litre-rice-full.jpg";
import familyPasta from "@/assets/litre-pasta.jpg";
import egusi from "@/assets/litre-egusi.jpg";
import ofada from "@/assets/litre-ofada.jpg";
import litreContainer from "@/assets/orchid-litre-container.png.asset.json";
import { productMedia } from "@/lib/product-media";

export const offeringImages = { rice: rice.url, pasta: pasta.url, noodles: noodles.url, friedRice: friedRice.url, familyRice, familyPasta, egusi, ofada, litreContainer: litreContainer.url };
export const potSizes = ["1 litre", "2 litres", "3 litres", "5 litres"] as const;
export const pots = [
  { name: "Rice, Chicken & Plantain", description: "Your Orchid rice favourite, with chicken and golden plantain for the family table.", image: offeringImages.familyRice, caption: "Rice, chicken & plantain · photo-edited serving preview" },
  { name: "Penne Pasta & Chicken", description: "Penne, peppers and roast chicken. A generous meal to share.", image: offeringImages.familyPasta, caption: "Penne pasta & chicken · photo-edited serving preview" },
  { name: "Red Pepper Stew & Eggs", description: "Rich red-pepper stew with your choice of protein and eggs. Confirm your combination with the chef.", image: offeringImages.litreContainer, video: productMedia.stewVideo, caption: "Original stew photo and video · container reference" },
  { name: "Egusi & Assorted Meat", description: "Melon-seed soup, leafy greens and assorted meat, made for sharing.", image: offeringImages.egusi, caption: "Egusi · illustrative photo edit in your container" },
  { name: "Ofada / Ayamase", description: "Slow-cooked green-pepper sauce with assorted meat and a bold finish.", image: offeringImages.ofada, caption: "Ofada / Ayamase · illustrative photo edit in your container" },
  { name: "Beef Jollof", description: "Your jollof and beef favourite for the family table. Portions and protein choices confirmed on enquiry.", image: productMedia.ricePoster, video: productMedia.riceVideo, caption: "Original beef jollof video · individual serving shown, not a litre container" },
  { name: "Cheesy Pasta Bake", description: "A cheesy pasta favourite to share. Ask the chef about family portions and suitable container sizes.", image: productMedia.pasta, caption: "Original pasta photo · individual serving shown, not a litre container" },
  { name: "Pepper Soup", description: "A warming pot of pepper soup for sharing. Confirm fish or other protein choices with the chef.", image: productMedia.soupPoster, video: productMedia.soupVideo, caption: "Original pepper soup video · small cup shown, not a litre container" },
];
export const celebrationPackages = [
  { name: "Engagement Table", label: "The beginning of forever", description: "A celebratory spread for your introduction or engagement, with Nigerian favourites and a personal touch.", includes: ["Jollof & fried rice", "Chicken & plantain", "Small chops"], enquiry: "engagement catering" },
  { name: "Wedding Feast", label: "Your day. Your menu.", description: "A considered wedding menu, from the first small bite to a generous main course, tailored to your celebration.", includes: ["Bespoke menu consultation", "Native & continental options", "Buffet or plated service enquiry"], enquiry: "a wedding package" },
  { name: "Private Chef Experience", label: "Something just for you", description: "An intimate dinner, birthday table or special evening, with a menu created around your taste.", includes: ["Personalised courses", "Dietary preferences discussed", "Home or private venue"], enquiry: "a private chef experience" },
];