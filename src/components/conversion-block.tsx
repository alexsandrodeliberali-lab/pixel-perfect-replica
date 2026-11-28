import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/landing";

interface ConversionBlockProps {
  checkout: string | null;
  priceBRL: number;
  showTrust?: boolean;
  placement: "vsl" | "curriculum";
  onCheckoutClick: (placement: "vsl" | "curriculum") => void;
}

/**
 * Reusable conversion CTA + price block so both purchase moments share
 * identical styling, price configuration, and click-placement tracking.
 */
export function ConversionBlock({
  checkout,
  priceBRL,
  showTrust = false,
  placement,
  onCheckoutClick,
}: ConversionBlockProps) {
  return (
    <div className={showTrust ? "purchase-section" : "purchase-section purchase-section--secondary"}>
      {checkout ? (
        <Button variant="purchase" size="purchase" asChild>
          <a href={checkout} onClick={() => onCheckoutClick(placement)}>
            Quero participar <ArrowRight strokeWidth={1.85} aria-hidden="true" />
          </a>
        </Button>
      ) : (
        <Button variant="purchase" size="purchase" disabled>
          Quero participar <ArrowRight strokeWidth={1.85} aria-hidden="true" />
        </Button>
      )}
      <p className="investment">
        Investimento único de <strong>{formatPrice(priceBRL)}</strong>
      </p>
      {showTrust && (
        <div className="trust-block">
          <p className="purchase-trust">
            <ShieldCheck size={14} strokeWidth={1.75} aria-hidden="true" /> Compra segura · Acesso imediato
          </p>
          <p className="payment-provider">Pagamento pela Hotmart</p>
        </div>
      )}
    </div>
  );
}
