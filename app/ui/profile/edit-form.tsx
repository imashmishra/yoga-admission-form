'use client';

import { UserForm } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateProfile } from '@/app/lib/actions';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

export default function EditProfileForm({
  session,
}: {
  session: any;
}) {

  const updateProfileWithEmail = updateProfile.bind(null, session);

  
  return (
    <form action={updateProfileWithEmail}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
        <div>
             <label
                 className='mb-3 mt-5 block text-xs font-medium text-gray-900'
                 htmlFor='name'
            >
             Full Name
             </label>
             <input
               className='w-full rounded-md border border-gray-200 py-[9px] pl-3 pr-10 text-sm outline-2 placeholder:text-gray-500'
               id='name'
               type='text'
               name='name'
               placeholder='Enter your full name'
               required
            />
           </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/profile"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Profile</Button>
      </div>
    </form>
  );
}