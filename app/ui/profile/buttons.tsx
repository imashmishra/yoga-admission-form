import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
  
  export function UpdateProfile({ email }: { email: string }) {
    return (
      <Link
        href={`/dashboard/profile/${email}/edit`}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <PencilIcon className="w-5" />
      </Link>
    );
  }