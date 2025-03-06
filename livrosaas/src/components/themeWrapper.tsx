'use client';

import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme();

    // return (
    //     <div
    //         className={cn(
    //             'min-h-screen bg-background',
    //             theme === 'dark' ? 'text-foreground' : ''
    //         )}
    //     >
    //         {children}
    //     </div>
    // );
}