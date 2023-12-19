import { Button } from "@/app/ui/button";
import Link from "next/link";
import PaymentForm from "@/app/dashboard/payment/paymentProcess/payment-form"

export default function PaymentProcessPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
        <PaymentForm/>
    </main>
  );
}