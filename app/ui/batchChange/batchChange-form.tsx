'use client';

import { UserForm } from '@/app/lib/definitions';
import {
  CheckIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateBatch } from '@/app/lib/actions';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

export default function EditBatchForm({
  session,
}: {
  session: any;
}) {

  const updateBatchWithEmail = updateBatch.bind(null, session);

  
  return (
    <form action={updateBatchWithEmail}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
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
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/batchChange"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Confirm Change</Button>
      </div>
    </form>
  );
}