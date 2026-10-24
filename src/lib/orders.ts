export const TRANSFER = { bank: "OPay", account: "9069460611" };
export const ORDER_WHATSAPP = "https://wa.me/2349069460611";
export type CartItem = { id: string; name: string; option: string; quantity: number; unitPrice: number | null; image?: string | undefined };
export type OrderDetails = { name: string; phone: string; fulfillment: "Collection" | "Delivery"; address: string; date: string; time: string; notes: string };
export const money = (value: number) => `₦${value.toLocaleString("en-NG")}`;
export function addCartItem(items: CartItem[], item: Omit<CartItem, "quantity">): CartItem[] {
  const existing = items.find(row => row.id === item.id);
  return existing ? items.map(row => row.id === item.id ? { ...row, quantity: Math.min(99, row.quantity + 1) } : row) : [...items, { ...item, quantity: 1 }];
}
export const cartSubtotal = (items: CartItem[]) => items.reduce((sum, row) => sum + (row.unitPrice ?? 0) * row.quantity, 0);
export function orderMessage(items: CartItem[], details: OrderDetails) {
  return ["ORCHID CUISINES · ORDER REQUEST", "", ...items.map((row, i) => `${i + 1}. ${row.name} — ${row.option}\n   Quantity: ${row.quantity} ${row.unitPrice === null ? "· Price: quote required" : `· Listed unit price: ${money(row.unitPrice)} · Line estimate: ${money(row.unitPrice * row.quantity)}`}`), "", `Listed-price subtotal: ${money(cartSubtotal(items))}`, "Prices shown are estimates pending chef confirmation. Unpriced items and any delivery fee are additional; please quote the final total before payment.", "", `Customer: ${details.name.trim()}`, `Phone: ${details.phone.trim()}`, `Fulfilment: ${details.fulfillment}`, details.fulfillment === "Delivery" ? `Delivery address: ${details.address.trim()}` : "Collection: 5:30 Bar & Lounge, opposite Energy Switch filling station, Sharp Corner, Oluyole, Ibadan", `Requested date: ${details.date}`, `Requested time: ${details.time}`, `Notes / dietary preferences: ${details.notes.trim() || "None"}`, "", `Payment method: Bank transfer · ${TRANSFER.bank} · ${TRANSFER.account}`, "Payment status: NOT VERIFIED. Please confirm availability, final quote, beneficiary name and arrangements before I transfer. I will send proof of payment here.", "This is an order request, not a confirmed booking."].join("\n");
}