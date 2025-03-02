import Logo from "@/components/logo";
import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="flex flex-col items-center justify-center py-40">
            <Link href={'/'}>
                <Logo />
            </Link>
            {children}
            <Toaster />
        </section>
    )
}