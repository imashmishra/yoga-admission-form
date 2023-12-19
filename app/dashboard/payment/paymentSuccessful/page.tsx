import { Button } from "@/app/ui/button";
import Link from "next/link";

export default function PaymentSuccessfulPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div>
            Payment Successfull!!
        </div>
        <Link href="/dashboard">
          <Button>
            Home
          </Button>
        </Link>
      </div>
    </main>
  );
}