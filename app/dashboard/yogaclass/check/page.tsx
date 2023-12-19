import { User } from '@/app/lib/definitions';
import { Button } from '@/app/ui/button';
import { sql } from '@vercel/postgres';
import Link from 'next/link';
import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Toaster } from 'react-hot-toast';
import { lusitana } from '@/app/ui/fonts';
import { getUser } from '@/app/lib/actions';
import { auth } from '@/auth'
import { error } from 'console';

const CheckEligibility = async () => {
  try{
  interface Session {
    user: {
    name: string
    email: string
  }  
    expires: string
  }

  const session = await auth()
  const sessionObject = {
  session
  }
  const email = session?.user?.email
  const ageSelect = await sql`SELECT * FROM "yogaclass" WHERE email = ${email}`;
  
  // user.rows[0].age
  console.log(ageSelect);
  const agee = ageSelect.rows[0]
  console.log("age",agee);
  const age = agee['age']
  console.log("value", age);
  
  
  if (age >= 18 && age <= 65){
    return(
      <div className="flex items-center justify-center h-screen">
        <Toaster />
        <form className='space-y-3'>
        <div className='flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8'>
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
        Congratulations!!!
            </h1>
            <div className='w-full'>

                {/* Message */}
                <div className='mt-4'>
                  Thank you for joining Yoga Classes.
                </div>
                <Link href = "/dashboard/payment/paymentProcess">
                  <Button className='mt-4 w-50'>
                  Make Payment  <ArrowRightIcon className='ml-auto h-5 w-5 text-gray-50' />
                  </Button>
                </Link>
            </div>
        </div>
        </form>
        </div>
    )
  }else{
    throw error
  }}catch(error){
    return(
      <div className="flex items-center justify-center h-screen">
        <Toaster />
        <form className='space-y-3'>
        <div className='flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8'>
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
            Sorry!
            </h1>
            <div className='w-full'>
                {/* Message */}
                <div className='mt-4'>
                Enrollment is limited to individuals between the ages of 18 and 65.
                </div>
            </div>
            <Link href = "/dashboard">
              <Button className='mt-4 w-50'>
              Home  
              </Button>
            </Link>
        </div>
        </form>
        </div>
    )
  }
} 


export default CheckEligibility;