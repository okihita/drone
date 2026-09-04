import PaymentsCyberView from "@/components/trade/PaymentsCyberView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payments & Cybersecurity Pacts | Digital Trade Agreements — DRONE",
  description: "Tracking ASEAN Regional Payment Connectivity (RPC) QR code corridors, e-invoicing standards, and national CERT breach disclosure windows.",
};

export default function TradePaymentsCyberPage() {
  return <PaymentsCyberView />;
}
