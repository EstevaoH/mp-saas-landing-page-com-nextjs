import Image from "next/image";
import logoSvg from '@/app/assets/logo.svg';

export default function Logo(){
    return <Image src={logoSvg} alt="Logotipo" />
}