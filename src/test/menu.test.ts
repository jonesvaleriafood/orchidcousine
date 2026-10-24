import { describe, expect, it } from "vitest";
import { allDishes, servingPrice, mealCartItem, requiresProtein, proteinChoices, pricingPreview } from "@/lib/menu";
import { addCartItem, cartSubtotal, orderMessage } from "@/lib/orders";

describe("Published menu pricing", () => {
  it("uses distinct previews with neutral descriptions and no image labels", () => {
    const ids = ["gizdodo", "turkey", "egg", "fish-croaker", "hake", "plantain", "beef", "asun", "coleslaw", "jiggy-shawarma", "chicken", "oreo-creme", "vanilla", "strawberry", "chocolate", "pine-ginger", "tigernut", "zobo"];
    const previews = ids.map(id => {
      const dish = allDishes.find(d => d.id === id);
      if (!dish) throw new Error(`Missing ${id}`);
      const preview = pricingPreview(dish);
      expect(preview.isGenerated).toBe(true);
      expect(preview.label).toBe("");
      expect(preview.alt).toBe(dish.name);
      return preview;
    });
    expect(new Set(previews.map(p => p.src)).size).toBe(ids.length);
  });
  it("populates the full menu and uses varied supplied rice previews", () => {
    for (const dish of allDishes) expect(pricingPreview(dish).src).toBeTruthy();
    const riceIds = ["asun-rice", "native-rice", "oc-rice", "chinese-fried-rice", "coconut-rice"];
    const previews = allDishes.filter(d => riceIds.includes(d.id)).map(pricingPreview);
    expect(previews).toHaveLength(5);
    expect(new Set(previews.map(p => p.src)).size).toBeGreaterThanOrEqual(4);
  });
  it("provides a preview for every priced item with neutral image descriptions", () => {
    for (const dish of allDishes.filter(d => d.amount !== null)) {
      const preview = pricingPreview(dish);
      expect(preview.src).toBeTruthy();
      if (!dish.img && !dish.poster) {
        expect(preview.isReference).toBe(true);
        expect(preview.alt).toBe(dish.name);
      } else {
        expect(preview.src).toBe(dish.img ?? dish.poster);
        expect(preview.isReference).toBe(false);
      }
    }
  });
  it("preserves informational base prices but requires protein for rice orders", () => {
    const rice = allDishes.find(d => d.id === "chinese-fried-rice");
    if (!rice) throw new Error("Rice missing");
    expect(rice.amount).toBe(5000);
    expect(servingPrice(rice)).toBe(8000);
    expect(servingPrice(rice, "included")).toBe(8000);
    expect(mealCartItem(rice, "unknown").option).toContain("Chicken");
    expect(allDishes.find(d => d.id === "chicken")?.amount).toBe(3000);
  });
  it("keeps different meal options separate and sends the accurate total", () => {
    const rice = allDishes.find(d => d.id === "chinese-fried-rice");
    if (!rice) throw new Error("Rice missing");
    let items = addCartItem([], mealCartItem(rice));
    items = addCartItem(items, mealCartItem(rice, "turkey"));
    expect(items).toHaveLength(2);
    expect(cartSubtotal(items)).toBe(18000);
    const message = orderMessage(items, { name: "Test", phone: "08012345678", fulfillment: "Collection", address: "", date: "2026-10-20", time: "20:00", notes: "" });
    for (const value of ["₦18,000", "Chicken portion", "Turkey portion"]) expect(message).toContain(value);
  });
  it("never offers a protein-free required meal and preserves proteins already named", () => {
    for (const dish of allDishes.filter(requiresProtein)) {
      expect(mealCartItem(dish, "included").unitPrice).toBe((dish.amount ?? 0) + 3000);
      for (const protein of proteinChoices) expect(servingPrice(dish, protein.id)).toBe((dish.amount ?? 0) + (protein.amount ?? 0));
    }
    const penne = allDishes.find(d => d.id === "penne-pasta");
    const native = allDishes.find(d => d.id === "native-pasta");
    if (!penne || !native) throw new Error("Pasta missing");
    expect(servingPrice(penne, "included")).toBe(8000);
    expect(mealCartItem(penne, "").option).toContain("Chicken");
    expect(servingPrice(penne, "chicken")).toBe(8000);
    expect(servingPrice(native)).toBe(5000);
  });
  it("has unique item links and preserves unconfirmed specials as enquiries", () => {
    expect(new Set(allDishes.map(d => d.id)).size).toBe(allDishes.length);
    expect(allDishes.find(d => d.id === "loaded-fries")?.amount).toBe(10000);
    expect(allDishes.find(d => d.id === "watermelon")?.amount).toBe(3000);
    expect(allDishes.find(d => d.id === "beef-jollof")?.amount).toBeNull();
  });
});