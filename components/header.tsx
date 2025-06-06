"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, BookOpen, Info } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { href: "/reading-progress", label: "Progress", icon: BookOpen },
    { href: "/about", label: "About", icon: Info },
  ];
  

  return (
    <nav className="backdrop-blur-sm border-b border-gray-800">
      <div className="flex items-center justify-between h-[var(--navbar-height)] px-[var(--primary-offset)]">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="ReadNow" width={32} height={32} />
          <span className="text-xl font-bold text-white">ReadNow</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 text-gray-300 hover:text-violet-400 transition-colors"
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          ))}
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
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 px-4 py-3 text-gray-300 hover:bg-gray-800/50 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      )}



    </nav>
  );
};
