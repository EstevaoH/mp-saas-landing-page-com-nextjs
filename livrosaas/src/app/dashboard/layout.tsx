import Navbar from '@/components/navBar';
import { redirect } from 'next/navigation';
import { auth } from '../../../auth';


export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    return redirect('/login');
  }
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-neutral-950">
      <Navbar userName={session?.user?.userName} id={session.user.id} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}