import EditForm from '@/app/ui/profile/edit-form';
import ProfileBreadcrumbs from '@/app/ui/profile/breadcrumbs';
import {auth } from "@/auth";

export default async function EditProfilePage({ params }: { params: { email: string } }) {
  const session = await auth()
  const email = session?.user?.email;
  
  return (
    <main>
      <ProfileBreadcrumbs
        breadcrumbs={[
          { label: 'Profile', href: '/dashboard/profile' },
          {
            label: 'Edit Profile',
            href: `/dashboard/profile/${email}/edit`,
            active: true,
          },
        ]}
      />
      <EditForm session = {session} />
    </main>
  );
}