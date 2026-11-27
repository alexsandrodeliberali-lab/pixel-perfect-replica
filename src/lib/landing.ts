export function youtubeId(value: string | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return null;
    let id: string | null = null;
    if (url.hostname === "youtu.be") id = url.pathname.split("/")[1] ?? null;
    if (["youtube.com", "www.youtube.com", "m.youtube.com"].includes(url.hostname)) {
      id = url.searchParams.get("v");
      if (!id && ["embed", "shorts"].includes(url.pathname.split("/")[1] ?? "")) {
        id = url.pathname.split("/")[2] ?? null;
      }
    }
    return id && /^[\w-]{11}$/.test(id) ? id : null;
  } catch {
    return null;
  }
}

export function checkoutWithCampaign(checkout: string | null, search: string): string | null {
  if (!checkout) return null;
  try {
    const url = new URL(checkout);
    if (url.protocol !== "https:" || !(url.hostname === "hotmart.com" || url.hostname.endsWith(".hotmart.com"))) return null;
    const allowed = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "src", "sck"];
    const campaign = new URLSearchParams(search);
    for (const key of allowed) {
      const value = campaign.get(key);
      if (value && !url.searchParams.has(key)) url.searchParams.set(key, value);
    }
    return url.toString();
  } catch {
    return null;
  }
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

// Ponto de integração, sem pixels, rede ou registro de conversões fictícias.
export function emitLandingEvent(name: "page_view" | "video_start" | "checkout_click", enabled: boolean) {
  if (!enabled) return;
  window.dispatchEvent(new CustomEvent("mental-fullness:event", { detail: { name } }));
}