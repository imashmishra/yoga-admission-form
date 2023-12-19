import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { Button } from '@/app/ui/button';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { sql } from '@vercel/postgres';
import { Payment } from '@/app/lib/definitions';
import { auth } from '@/auth';
import { error } from 'console';
 
export default async function Page() {

  //for update batch and payment status at 1st of every month
  // const session = await auth()
  // const currentDate = new Date();
  // const date = currentDate.getDate();
  // if (date === 19){
  //   console.log("true");
  //   // updateBatchAtOne.bind(null, session, date);
  //   updatePaymentAtOne.bind(null, session);
  // }
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Yoga Classes!! Yoga Classes!! Yoga Classes!!
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <Link href="/dashboard/yogaclass">
      <Button className='mt-4 w-full'>
           Register for Yoga Classes <ArrowRightIcon className='ml-auto h-5 w-5 text-gray-50' />
            </Button>
      </Link>
      </div>
      {/* <PaymentStatusForm/> */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">      
      </div>
    </main>
  );
}