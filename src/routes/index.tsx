import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { ConversionBlock } from "@/components/conversion-block";
import { CurriculumSection } from "@/components/curriculum-section";
import { VslPlayer } from "@/components/vsl-player";
import { landingConfig as config } from "@/lib/landing-config";
import { checkoutWithCampaign, emitLandingEvent } from "@/lib/landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Inteligência Comportamental | Mental Fullness Academy" },
      {
        name: "description",
        content:
          "a ciência por trás das vendas Online. Conheça o treinamento Inteligência Comportamental da Mental Fullness Academy.",
      },
      { property: "og:title", content: "Inteligência Comportamental | Mental Fullness Academy" },
      {
        property: "og:description",
        content: "a ciência por trás das vendas Online. Conheça o treinamento da Mental Fullness Academy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...(config.bannerUrl?.startsWith("https://")
        ? [
            { property: "og:image", content: config.bannerUrl },
            { name: "twitter:image", content: config.bannerUrl },
          ]
        : []),
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

  const handleCheckoutClick = (placement: "vsl" | "curriculum") => {
    emitLandingEvent("checkout_click", config.tracking.enabled, { placement });
  };

  return (
    <main className="sales-page">
      <section className="hero-band">
        {config.bannerUrl && (
          <div className="banner-container">
            <img
              className="course-banner"
              src={config.bannerUrl}
              alt="Banner oficial do treinamento Inteligência Comportamental"
              width="1920"
              height="640"
              fetchPriority="high"
            />
          </div>
        )}
        <div className="page-container">
          <div className="course-heading">
            <div className="course-identity">
              <h1>Inteligência Comportamental</h1>
              <p className="course-subtitle">a ciência por trás das vendas Online</p>
            </div>
            <span className="section-accent-line" aria-hidden="true" />
            <p className="course-intro">Assista ao vídeo abaixo e descubra como tudo funciona.</p>
          </div>
          <div className="vsl-section">
            <VslPlayer
              url={config.youtubeUrl}
              thumbnail={config.videoThumbnailUrl}
              onStart={() => emitLandingEvent("video_start", config.tracking.enabled)}
            />
          </div>
          <ConversionBlock
            checkout={checkout}
            priceBRL={config.priceBRL}
            showTrust
            placement="vsl"
            onCheckoutClick={handleCheckoutClick}
          />
        </div>
      </section>

      <section className="curriculum-band" aria-labelledby="curriculum-heading">
        <div className="page-container">
          <CurriculumSection />
          <ConversionBlock
            checkout={checkout}
            priceBRL={config.priceBRL}
            placement="curriculum"
            onCheckoutClick={handleCheckoutClick}
          />
        </div>
      </section>

      <section className="support-section" aria-labelledby="support-heading">
        <div className="page-container">
          <h2 id="support-heading">Ficou com alguma dúvida?</h2>
          {config.supportEmail ? (
            <a className="support-contact" href={`mailto:${config.supportEmail}`}>
              <Mail size={14} strokeWidth={1.75} aria-hidden="true" /> Fale conosco por e-mail
            </a>
          ) : (
            <span className="support-contact" aria-disabled="true">
              <Mail size={14} strokeWidth={1.75} aria-hidden="true" /> Fale conosco por e-mail
            </span>
          )}
        </div>
      </section>

      <footer className="institutional-footer">
        <div className="page-container">
          {config.logoUrl && (
            <div className="institutional-logo-frame">
              <img className="institutional-logo" src={config.logoUrl} alt="Mental Fullness" loading="lazy" />
            </div>
          )}
          <div className="institutional-identity">
            <p className="institutional-name">Mental Fullness Academy</p>
            <p className="institutional-byline">Uma iniciativa Mental Fullness</p>
          </div>
          <div className="legal-links">
            {config.privacyUrl ? (
              <a href={config.privacyUrl}>Política de privacidade</a>
            ) : (
              <span aria-disabled="true">Política de privacidade</span>
            )}
            <span aria-hidden="true">·</span>
            {config.termsUrl ? (
              <a href={config.termsUrl}>Termos de uso</a>
            ) : (
              <span aria-disabled="true">Termos de uso</span>
            )}
          </div>
        </div>
      </footer>
    </main>
  );
}
