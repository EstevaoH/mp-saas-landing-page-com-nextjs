import Link from "next/link";
import Image from 'next/image';
import logo from '../app/assets/logo.svg'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";

export function Header() {
    return (
        <header className="flex justify-between items-center py-4">
            <Image src={logo} alt="Logotipo" />
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <MenuIcon size={24} className="md:hidden cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Menu</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Funcionamento</DropdownMenuItem>
                    <DropdownMenuItem>Preço</DropdownMenuItem>
                    <DropdownMenuItem>
                        <Button variant={"link"}>Login</Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <nav className="items-center gap-1 hidden md:flex">
                <ul>
                    <Button variant={'link'}>Funcionanmento</Button>
                    <Button variant={'link'}>Preço</Button>
                    <Button variant={'outline'}>Login</Button>
                </ul>
            </nav>
        </header>
    )
}