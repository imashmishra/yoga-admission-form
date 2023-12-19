'use client';
 
import { lusitana } from '@/app/ui/fonts';
import {
  UserIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
 
export default function PaymentForm() {
  
    const router = useRouter();
    const [error, setError] = useState<string>('')
    const [successMessage, setSuccessMessage] = useState<string>('')
    const makePayment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
  
    try {
      const response = await fetch(`/api/auth/payment`, {
      method: 'POST',
      body: JSON.stringify({
      account: formData.get('account'),
      name: formData.get('name'),
    })
    })
    console.log(response)
    const date = new Date();
    const currentDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    console.log("curr",currentDate);
    
    const responseData = await response.json()
    if (response.ok) {
      setSuccessMessage(responseData.message)
      router.push('/dashboard/payment/paymentSuccessful')
    } else {
      const errorData = await response.json()
      setError(responseData.error || 'Check your email again')
      }
    }catch(error){
      console.error('Check your email')
      setError('Check your email')
    }};
 
  return (
    <form onSubmit={makePayment} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Make Payment
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="account"
            >
              Account Number 
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="account"
                type="text"
                name="account"
                placeholder="Enter your account number"
                required
                minLength={11}
                pattern="[0-9]{11,14}"
              />
              <BanknotesIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="name"
            >
              Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="name"
                type="text"
                name="name"
                placeholder="Enter name of the Account holder"
                required
                pattern="^[A-Za-z]+$"
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
          <Button className='mt-4 w-full'>
           Pay <ArrowRightIcon className='ml-auto h-5 w-5 text-gray-50' />
          </Button>
      </div>
    </form>
  );
}