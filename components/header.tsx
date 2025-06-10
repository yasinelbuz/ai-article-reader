"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, BookOpen, Info } from "lucide-react";
import dynamic from "next/dynamic";

const Switch = dynamic(() => import("./ui/switch"), { ssr: false });

const menuItems = [
  { href: "/reading-progress", label: "Progress", icon: BookOpen },
  { href: "/about", label: "About", icon: Info },
];

type MenuMapProps = {
  setIsOpen: (value: boolean) => void;
}

const MenuMap = ({ setIsOpen }: MenuMapProps) => (
  <>
    <Switch />
    {menuItems.map((item) => (
      <Link
        key={item.href}
        href={item.href}
        className="flex items-center gap-2 "
        onClick={() => setIsOpen(false)}
      >
        <item.icon className="w-4 h-4" />
        <span>{item.label}</span>
      </Link>
    ))}
  </>
)

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="backdrop-blur-lg border-b dark:border-gray-800 border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between h-[var(--navbar-height)] px-[var(--primary-offset)]">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="ReadNow" width={32} height={32} />
          <span className="text-xl font-bold dark:text-white text-black">ReadNow</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <MenuMap setIsOpen={setIsOpen} />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden py-4">
          <MenuMap setIsOpen={setIsOpen} />
        </div>
      )}
    </nav>
  );
};
