import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { BookOpen, ChevronDown, Gift } from "lucide-react";

const MODULES = [
  {
    number: "01",
    title: "O Brasil que quer ganhar dinheiro",
    description:
      "Compreenda a dimensão do mercado digital brasileiro e descubra uma nova perspectiva sobre as vendas online.",
  },
  {
    number: "02",
    title: "Quem consome no Brasil?",
    description:
      "Conheça o perfil dos consumidores brasileiros, suas classes sociais e sua capacidade de compra.",
  },
  {
    number: "03",
    title: "O que a população brasileira deseja?",
    description:
      "Descubra os desejos e as motivações humanas que influenciam as decisões de compra.",
  },
  {
    number: "04",
    title: "Onde está a atenção na Internet?",
    description:
      "Identifique onde os consumidores dedicam seu tempo e como chegar às pessoas certas.",
  },
  {
    number: "05",
    title: "O que o Brasil compra?",
    description:
      "Conheça os produtos, serviços e hábitos de consumo que movimentam o mercado brasileiro.",
  },
  {
    number: "06",
    title: "Por que as pessoas compram?",
    description:
      "Compreenda os fatores psicológicos e comportamentais que influenciam uma decisão de compra.",
  },
  {
    number: "07",
    title: "Onde estão as oportunidades?",
    description:
      "Aprenda a identificar oportunidades de negócio e avaliar sua viabilidade antes de investir.",
  },
] as const;

/**
 * Curriculum section with 7 expandable modules and a visually distinct
 * collapsible special bonus, all collapsed by default with multi-open support.
 */
export function CurriculumSection() {
  return (
    <div className="curriculum-inner">
      <div className="curriculum-header">
        <div>
          <h2 id="curriculum-heading" className="curriculum-title">
            O que você vai aprender
          </h2>
          <span className="section-accent-line" aria-hidden="true" />
        </div>
        <div className="curriculum-icon-box" aria-hidden="true">
          <BookOpen size={24} strokeWidth={1.75} />
        </div>
      </div>

      <AccordionPrimitive.Root type="multiple" className="curriculum-list">
        {MODULES.map((mod) => (
          <AccordionPrimitive.Item key={mod.number} value={`module-${mod.number}`} className="module-item">
            <AccordionPrimitive.Header className="module-header">
              <AccordionPrimitive.Trigger className="module-trigger">
                <span className="module-title-group">
                  <span className="module-number">{mod.number}</span>
                  <span className="module-title">{mod.title}</span>
                </span>
                <ChevronDown size={18} strokeWidth={1.75} className="module-chevron" aria-hidden="true" />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionPrimitive.Content className="accordion-content">
              <p className="module-description">{mod.description}</p>
            </AccordionPrimitive.Content>
          </AccordionPrimitive.Item>
        ))}

        <AccordionPrimitive.Item value="bonus-especial" className="bonus-item">
          <AccordionPrimitive.Header className="module-header">
            <AccordionPrimitive.Trigger className="bonus-trigger">
              <span className="bonus-trigger-left">
                <span className="bonus-gift-icon" aria-hidden="true">
                  <Gift size={20} strokeWidth={1.75} />
                </span>
                <span className="bonus-heading-group">
                  <span className="bonus-label">Bônus especial</span>
                  <span className="bonus-title">Inteligência Artificial como Copilot</span>
                </span>
              </span>
              <ChevronDown size={18} strokeWidth={1.75} className="bonus-chevron" aria-hidden="true" />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="accordion-content">
            <div className="bonus-content">
              <p className="bonus-lead">
                E se você pudesse analisar o potencial de um negócio antes mesmo de investir seu dinheiro?
              </p>
              <p className="bonus-description">
                Você receberá uma ferramenta exclusiva para utilizar a inteligência artificial na investigação de
                oportunidades comerciais, avaliando seu potencial e seus riscos.
              </p>
              <p className="bonus-included">Já incluído no treinamento, sem custo adicional.</p>
            </div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      </AccordionPrimitive.Root>
    </div>
  );
}
