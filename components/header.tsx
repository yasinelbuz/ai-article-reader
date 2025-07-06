'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, BookOpen, Info } from 'lucide-react';
import dynamic from 'next/dynamic';
import { siteConfig } from '@/config/site';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Switch = dynamic(() => import('./ui/switch'), { ssr: false });

const menuItems = [
  { href: '/reading-progress', label: 'Progress', icon: BookOpen },
  { href: '/about', label: 'About', icon: Info },
];

type MenuMapProps = {
  setIsOpen: (value: boolean) => void;
};

const MenuMap = ({ setIsOpen }: MenuMapProps) => {

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLanguageChange = (selectedLang: string) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('language', selectedLang);
    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <Switch />
      <div className="flex items-center gap-2">
        <Select onValueChange={(value: string) => {
          handleLanguageChange(value as string)
        }}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Dil Seçiniz" />
          </SelectTrigger>
          <SelectContent>
          <SelectItem value="english">English</SelectItem>
          <SelectItem value="germany">German</SelectItem>
          <SelectItem value="russian">Russian</SelectItem>
        </SelectContent>
      </Select>
      </div>
      
      {menuItems.map(item => (
        <Link
          key={item.href}
          href={item.href}
          className="flex items-center gap-2 py-2 md:py-0 border-t md:border-t-0 border-gray-200 dark:border-gray-800"
          onClick={() => setIsOpen(false)}
        >
          <item.icon className="w-4 h-4" />
          <span>{item.label}</span>
        </Link>
      ))}
    </>
  );
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="backdrop-blur-lg border-b dark:border-gray-800 border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between h-[var(--navbar-height)] px-[var(--primary-offset)]">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt={siteConfig.name} width={32} height={32} />
          <div className="text-xl font-bold dark:text-white text-black">
            <span className="text-gray-400">{siteConfig.name}</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <MenuMap setIsOpen={setIsOpen} />
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-300" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden p-8">
          <MenuMap setIsOpen={setIsOpen} />
        </div>
      )}
    </nav>
  );
};
