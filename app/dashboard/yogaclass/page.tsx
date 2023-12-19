import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import YogaClassForm from '@/app/dashboard/yogaclass/yogaclass-form';
 
export default function YogaClassFormPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <YogaClassForm />
      </div>
    </main>
  );
}