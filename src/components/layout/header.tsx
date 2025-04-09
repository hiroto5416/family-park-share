'use client';

// import Link from 'next/link';
import React from 'react';
// import { Button } from '../ui/button';
// import { Trees, LogIn, UserPlus, User, LogOut } from 'lucide-react';
// import { useScrollDirection } from '@/hooks/useScrollDirection';
import { cn } from '@/lib/utils';
// import { usePathname } from 'next/navigation';
// import { signOut, useSession } from 'next-auth/react';

export function Header() {
  // const isVisible = useScrollDirection();
  // const pathname = usePathname();
  // const { data: session } = useSession();

  // ログインページと新規登録ページではボタンを非表示
  // const shouldShowAuthButtons = !['/login', '/signin'].includes(pathname);

  // const handleLogout = async () => {
  //   await signOut({ redirect: true, callbackUrl: '/' });
  // };

  return (
    <header
      className={cn(
        'border-b bg-white sticky top-0 z-50 transition-transform duration-300',
        
      )}
    >
      
    </header>
  );
}
