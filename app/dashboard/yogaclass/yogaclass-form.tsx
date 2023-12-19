'use client';
 
import { lusitana } from '@/app/ui/fonts';
import {
  UserIcon,
  IdentificationIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '../../ui/button';
import { FormEvent, useState, ChangeEvent } from 'react';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
 
export default function YogaClassForm () {
  const router = useRouter();
  const [error, setError] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')
  const handleYogaForm = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  const formData = new FormData(e.currentTarget)

  try {
    const response = await fetch(`/api/auth/yogaclass`, {
    method: 'POST',
    body: JSON.stringify({
    email: formData.get('email'),
    age: formData.get('age'),
    date: formData.get('date'),
    batch: formData.get('batch'),
  })
  })
  console.log(response)
  const responseData = await response.json()
  if (response.ok) {
    setSuccessMessage(responseData.message)
    router.push('/dashboard/yogaclass/check')
  } else {
    const errorData = await response.json()
    setError(responseData.error || 'Check your email again')
    }
  }catch(error){
    console.error('Check your email')
    setError('Check your email')
  }};

  
  // for date
  const [selectedDate, setSelectedDate] = useState<string>('');

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedDate(value);
  };
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
  };

  return (
    <>
     <Toaster />
    <form onSubmit={handleYogaForm} className="w-full max-w-md space-y-3">
      <div className="rounded-lg bg-white px-6 pb-4 pt-8">
        <h1 className={`${lusitana} mb-3 text-2xl`}>
          Take Admission for the Yoga Classes!!
        </h1>
        {/* Email */}
        <div className="mt-4 relative">
          <div>
            <label
              className="block text-xs font-medium text-gray-900"
              htmlFor="name"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-900"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your registered email"
                required
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {/* Age */}
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Age
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-900"
                id="age"
                type="number"
                name="age"
                placeholder="Enter your age"
                required
                min={1}
                max={100}
              />
              <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
            {/* Date */}
            <div className="mt-4">
              <label className="ml-2 mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="dateInput">Date</label>
                <div className="relative">
                <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                type="date"
                id="date"
                name='date'
                value={selectedDate}
                onChange={handleDateChange}
                required
                min = {getCurrentDate()}
                max = "2050-12-31"
                // You can add min and max attributes if you want to limit the selectable range
              />
              <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            </div>
            {/* Batch */}
          <div className="mt-4 rel">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="batch"
            >
              Batch
            </label>
            <div className="relative">
              <select
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="batch"
                name="batch"
                required
              >
                <option value="" disabled selected hidden style={{ color: 'gray' }}>
                    Enter the batch of classes
                </option>
                <option value="6:00 AM - 7:00 AM" style={{ color: '#1a202c' }}>Batch 6:00 AM - 7:00 AM</option>
                <option value="7:00 AM - 8:00 AM" style={{ color: '#1a202c' }}>Batch 7:00 AM - 8:00 AM</option>
                <option value="8:00 AM - 9:00 AM" style={{ color: '#1a202c' }}>Batch 8:00 AM - 9:00 AM</option>
                <option value="5:00 PM - 6:00 PM" style={{ color: '#1a202c' }}>Batch 5:00 PM - 6:00 PM</option>
              </select>
              <svg
                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                ></path>
              </svg>
              <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {/* Display Success Message */}
          {successMessage && (
             <p className='mb-3 text-black '>{successMessage}</p>
           )}

          {/* Display Error */}
          {error && <p className='mb-3 text-red-500'>{error}</p>}
        </div>
        <Button className='mt-4 w-full'>
           Submit Details <ArrowRightIcon className='ml-auto h-5 w-5 text-gray-50' />
        </Button>
      </div>
    </form>
    </>
  );
}