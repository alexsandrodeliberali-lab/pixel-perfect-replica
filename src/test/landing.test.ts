import { describe, expect, it } from "vitest";
import { landingConfig } from "@/lib/landing-config";
import { checkoutWithCampaign, formatPrice, youtubeId } from "@/lib/landing";

describe("Regras do treinamento", () => {
  it("utiliza o vídeo oficial informado", () => {
    expect(youtubeId(landingConfig.youtubeUrl)).toBe("TsC9Qbe_89M");
  });
  it("direciona ao checkout oficial com o modo fornecido", () => {
    expect(checkoutWithCampaign(landingConfig.checkoutUrl, "")).toBe("https://pay.hotmart.com/T108646514R?checkoutMode=10");
  });
  it("utiliza o e-mail oficial de suporte", () => {
    expect(landingConfig.supportEmail).toBe("academy@mentalfullness.com.br");
  });
  it("oferece investimento único de R$ 39,90", () => {
    expect(landingConfig.priceBRL).toBe(39.9);
    expect(formatPrice(landingConfig.priceBRL).replace(/\s/g, " ")).toBe("R$ 39,90");
  });
  it("preserva os parâmetros compatíveis de campanha no checkout", () => {
    const result = checkoutWithCampaign("https://pay.hotmart.com/ABC?off=real", "?utm_source=meta&utm_campaign=campanha&src=anuncio&email=private");
    expect(result).not.toBeNull();
    if (!result) return;
    const url = new URL(result);
    expect(url.searchParams.get("utm_source")).toBe("meta");
    expect(url.searchParams.get("utm_campaign")).toBe("campanha");
    expect(url.searchParams.get("src")).toBe("anuncio");
    expect(url.searchParams.get("off")).toBe("real");
    expect(url.searchParams.has("email")).toBe(false);
  });
  it("não inventa checkout quando não existe configuração oficial", () => {
    expect(checkoutWithCampaign(null, "?utm_source=meta")).toBeNull();
    expect(checkoutWithCampaign("https://example.com", "")).toBeNull();
  });
  it("aceita vídeo YouTube e não inventa vídeo ausente", () => {
    expect(youtubeId(null)).toBeNull();
    expect(youtubeId("https://youtu.be/abcdefghijk")).toBe("abcdefghijk");
    expect(youtubeId("https://www.youtube.com/watch?v=abcdefghijk")).toBe("abcdefghijk");
    expect(youtubeId("https://example.com/watch?v=abcdefghijk")).toBeNull();
  });
  it("mantém rastreamento desativado sem configuração e consentimento", () => {
    expect(landingConfig.tracking.enabled).toBe(false);
    expect(landingConfig.tracking.metaPixelId).toBeNull();
  });
});