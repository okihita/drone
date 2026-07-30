import DefaPaymentsCyberView from "@/components/defa/DefaPaymentsCyberView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regional Payment Connectivity & Cyber Defense | DEFA Observatory",
  description: "Tracking ASEAN Regional Payment Connectivity (RPC) QR code corridors, e-invoicing standards, and national CERT breach disclosure windows.",
};

export default function DefaPaymentsCyberPage() {
  return <DefaPaymentsCyberView />;
}
