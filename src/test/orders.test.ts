import { describe, expect, it } from "vitest";
import { addCartItem, cartSubtotal, orderMessage, type CartItem } from "@/lib/orders";
describe("WhatsApp order curation", () => {
  it("merges identical options but keeps different litre sizes separate", () => {
    const pot = { id: "stew:2", name: "Stew", option: "2 litres", unitPrice: null };
    let rows = addCartItem([], pot); rows = addCartItem(rows, pot);
    rows = addCartItem(rows, { ...pot, id: "stew:5", option: "5 litres" });
    expect(rows.map(row => [row.option, row.quantity])).toEqual([["2 litres", 2], ["5 litres", 1]]);
  });
  it("includes every item, quote exclusions, delivery details and payment status", () => {
    const items: CartItem[] = [{ id: "rice", name: "Jollof", option: "Standard serving", unitPrice: 6500, quantity: 2 }, { id: "stew", name: "Stew", option: "5 litres", unitPrice: null, quantity: 1 }];
    expect(cartSubtotal(items)).toBe(13000);
    const message = orderMessage(items, { name: "Ada", phone: "08012345678", fulfillment: "Delivery", address: "Oluyole", date: "2026-10-20", time: "20:00", notes: "No nuts" });
    for (const value of ["Jollof", "Quantity: 2", "5 litres", "quote required", "₦13,000", "Oluyole", "No nuts", "9069460611", "NOT VERIFIED"]) expect(message).toContain(value);
  });
});