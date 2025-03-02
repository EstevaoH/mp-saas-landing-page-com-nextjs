'use client';

import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function Navbar({ userName }: { userName: string | null | undefined }) {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-gray-700 hover:text-gray-900">
            <Logo />
          </Link>
        </div>
        <nav className="flex items-center space-x-4">
          <Link href="/dashboard" className="text-gray-700 hover:text-gray-900">
            <Button
              variant={'link'}
              className={cn(pathname === '/dashboard' ? 'underline' : '')}
            >
              Livro do Mês
            </Button>
          </Link>
          <Link
            href="/dashboard/my-signature"
            className="text-gray-700 hover:text-gray-900"
          >
            <Button
              variant={'link'}
              className={cn(
                pathname === '/dashboard/my-signature' ? 'underline' : ''
              )}
            >
              Minha Assinatura
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-gray-700 hover:text-gray-900">
                <User size={24} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4">
              <Link href={'/profile'}>
                <DropdownMenuLabel className="font-light uppercase text-xs cursor-pointer">
                  {userName}
                </DropdownMenuLabel>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <button className="cursor-pointer" onClick={() => signOut({ callbackUrl: '/login' })}>
                  Encerrar Sessão
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}