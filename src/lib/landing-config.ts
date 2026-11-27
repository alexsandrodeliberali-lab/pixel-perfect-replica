import courseCover from "@/assets/course-cover.jpg.asset.json";
import videoCover from "@/assets/video-cover.jpg.asset.json";
import institutionLogo from "@/assets/mental-fullness-logo.png.asset.json";

// PENDENTE: substituir os campos null apenas pelos materiais e destinos oficiais.
export const landingConfig = {
  youtubeUrl: "https://www.youtube.com/watch?v=TsC9Qbe_89M" as string | null,
  checkoutUrl: "https://pay.hotmart.com/T108646514R?checkoutMode=10" as string | null,
  priceBRL: 49.9,
  supportEmail: "academy@mentalfullness.com.br" as string | null,
  privacyUrl: null as string | null,
  termsUrl: null as string | null,
  bannerUrl: courseCover.url as string | null,
  videoThumbnailUrl: videoCover.url as string | null,
  logoUrl: institutionLogo.url as string | null,
  tracking: {
    metaPixelId: null as string | null,
    analyticsId: null as string | null,
    // Somente habilitar após integrar uma gestão de consentimento apropriada.
    enabled: false,
  },
};