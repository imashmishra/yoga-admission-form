import BatchChangeForm from '@/app/ui/batchChange/batchChange-form';
import ProfileBreadcrumbs from '@/app/ui/batchChange/breadcrumbs';
import {auth } from "@/auth";

export default async function EditBatchPage({ params }: { params: { email: string } }) {
  const session = await auth()
  const email = session?.user?.email;
  
  return (
    <main>
      <ProfileBreadcrumbs
        breadcrumbs={[
          { label: 'Batch', href: '/dashboard/batch' },
          {
            label: 'Change Batch (for next month)',
            href: `/dashboard/batch/${email}/edit`,
            active: true,
          },
        ]}
      />
      <BatchChangeForm session = {session} />
    </main>
  );
}