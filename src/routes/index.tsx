import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VslPlayer } from "@/components/vsl-player";
import { landingConfig as config } from "@/lib/landing-config";
import { checkoutWithCampaign, emitLandingEvent, formatPrice } from "@/lib/landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Inteligência Comportamental | Mental Fullness Academy" },
      { name: "description", content: "a ciência por trás das vendas Online. Conheça o treinamento Inteligência Comportamental da Mental Fullness Academy." },
      { property: "og:title", content: "Inteligência Comportamental | Mental Fullness Academy" },
      { property: "og:description", content: "a ciência por trás das vendas Online. Conheça o treinamento da Mental Fullness Academy." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...(config.bannerUrl?.startsWith("https://") ? [
        { property: "og:image", content: config.bannerUrl },
        { name: "twitter:image", content: config.bannerUrl },
      ] : []),
    ],
  }),
  component: Index,
});

function Index() {
  const [checkout, setCheckout] = useState(() => checkoutWithCampaign(config.checkoutUrl, ""));
  useEffect(() => {
    setCheckout(checkoutWithCampaign(config.checkoutUrl, window.location.search));
    emitLandingEvent("page_view", config.tracking.enabled);
  }, []);

  return (
    <main className="sales-page">
      {config.bannerUrl && <img className="course-banner" src={config.bannerUrl} alt="Banner oficial do treinamento Inteligência Comportamental" width="1920" height="640" fetchPriority="high" />}
      <div className="course-heading">
        <h1>Inteligência Comportamental</h1>
        <p className="course-subtitle">a ciência por trás das vendas Online</p>
        <p className="course-intro">Assista ao vídeo abaixo, que preparamos especialmente para apresentar um importante pilar das vendas online, muitas vezes negligenciado, mas que pode ser justamente o que falta para destravar seus resultados.</p>
      </div>
      <div className="vsl-section">
        <VslPlayer url={config.youtubeUrl} thumbnail={config.videoThumbnailUrl} onStart={() => emitLandingEvent("video_start", config.tracking.enabled)} />
      </div>
      <div className="purchase-section">
        {checkout ? (
          <Button variant="purchase" size="purchase" asChild>
            <a href={checkout} onClick={() => emitLandingEvent("checkout_click", config.tracking.enabled)}>
              Quero destravar minhas vendas <ArrowRight strokeWidth={2} aria-hidden="true" />
            </a>
          </Button>
        ) : (
          <Button variant="purchase" size="purchase" disabled>Quero destravar minhas vendas <ArrowRight strokeWidth={2} aria-hidden="true" /></Button>
        )}
        <p className="investment">Investimento único de <strong>{formatPrice(config.priceBRL)}</strong></p>
        <p className="purchase-trust"><ShieldCheck size={14} aria-hidden="true" /> Compra segura · Acesso imediato</p>
        <p className="payment-provider">Pagamento pela Hotmart</p>
      </div>
      <section className="support-section" aria-labelledby="support-heading">
        <h2 id="support-heading">Ficou com alguma dúvida?</h2>
        {config.supportEmail ? (
          <a className="support-contact" href={`mailto:${config.supportEmail}`}><Mail size={14} aria-hidden="true" /> Fale conosco por e-mail</a>
        ) : (
          <span className="support-contact" aria-disabled="true"><Mail size={14} aria-hidden="true" /> Fale conosco por e-mail</span>
        )}
      </section>
      <footer className="institutional-footer">
        {config.logoUrl && (
          <div className="institutional-logo-frame">
            <img className="institutional-logo" src={config.logoUrl} alt="Mental Fullness" loading="lazy" />
          </div>
        )}
        <p className="institutional-name">Mental Fullness Academy</p>
        <p className="institutional-byline">Uma iniciativa Mental Fullness</p>
        <div className="legal-links">
          {config.privacyUrl ? <a href={config.privacyUrl}>Política de privacidade</a> : <span aria-disabled="true">Política de privacidade</span>}
          <span aria-hidden="true">·</span>
          {config.termsUrl ? <a href={config.termsUrl}>Termos de uso</a> : <span aria-disabled="true">Termos de uso</span>}
        </div>
      </footer>
    </main>
  );
}
