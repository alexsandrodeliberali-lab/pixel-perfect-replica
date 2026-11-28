import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ConversionBlock } from "@/components/conversion-block";
import { landingConfig } from "@/lib/landing-config";

describe("Bloco de compra", () => {
  it("mostra o CTA literal aprovado com o preço único informado", () => {
    render(
      <ConversionBlock
        checkout="https://pay.hotmart.com/T108646514R?checkoutMode=10"
        priceBRL={landingConfig.priceBRL}
        placement="vsl"
        onCheckoutClick={() => {}}
      />,
    );

    expect(screen.getByText("Quero destravar minhas vendas")).toBeTruthy();
    expect(screen.getByText("Investimento único de")).toBeTruthy();
    expect(screen.getByText("R$ 39,90")).toBeTruthy();
  });

  it("aponta o botão para o checkout oficial configurado", () => {
    render(
      <ConversionBlock
        checkout={landingConfig.checkoutUrl}
        priceBRL={landingConfig.priceBRL}
        placement="curriculum"
        onCheckoutClick={() => {}}
      />,
    );

    const link = screen.getByRole("link", { name: /Quero destravar minhas vendas/i });
    expect(link.getAttribute("href")).toBe("https://pay.hotmart.com/T108646514R?checkoutMode=10");
  });
});
