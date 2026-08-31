"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FolderKanban,
  Columns2,
  SlidersHorizontal,
  Layers,
  Sparkles,
  Menu,
  X,
  BookOpen,
} from "lucide-react";
import { useProjectSchedule } from "@/lib/project-store";
import { useCompareList } from "@/lib/compare-store";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { itemCount } = useProjectSchedule();
  const { compareCount } = useCompareList();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Specifier", icon: Sparkles },
    { href: "/configure", label: "Configurator", icon: SlidersHorizontal },
    { href: "/catalog", label: "Catalogue", icon: Layers },
    {
      href: "/compare",
      label: "Compare",
      icon: Columns2,
      badge: compareCount > 0 ? compareCount : null,
    },
    {
      href: "/project",
      label: "Schedule",
      icon: FolderKanban,
      badge: itemCount > 0 ? itemCount : null,
    },
    { href: "/about-demo", label: "Heritage", icon: BookOpen },
  ];

  if (pathname === "/login") {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-[#fcfbf9] border-b border-[#e5e5e2] shadow-xs text-[#1f1f1f]">
      {/* Official Top Announcement Bar - Centered */}
      <div className="bg-[#121212] text-[#fcfbf9] px-4 sm:px-8 py-2 flex items-center justify-center text-[11px] font-sans tracking-widest uppercase">
        <div className="flex items-center space-x-3 text-center">
          <span className="font-bold text-amber-300">1887</span>
          <span className="text-zinc-500">&bull;</span>
          <span className="font-semibold text-zinc-200 hidden sm:inline">The Trusted Tradition Since 1887</span>
          <span className="text-zinc-500 hidden sm:inline">&bull;</span>
          <span className="text-zinc-300">Commercial Foodservice Sizing Engine</span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between gap-4">
        {/* Official John Boos SVG Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img
                src="/john_boos_logo.svg"
                alt="John Boos & Co."
                className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </div>
            <div className="hidden sm:flex flex-col border-l border-[#d7d4c8] pl-3 py-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#6f2e18]">
                Commercial Division
              </span>
              <span className="text-[11px] font-serif font-bold text-[#1f1f1f] tracking-tight">
                Intelligent Specifier
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Navigation - Center-Spaced Pill Button Dock */}
        <nav className="hidden lg:flex items-center justify-center p-1.5 bg-[#eeece5] rounded-full border border-[#dbd6c7] shadow-inner space-x-1 sm:space-x-1.5">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center space-x-1.5 border ${
                  isActive
                    ? "bg-[#6f2e18] text-[#fcfbf9] border-[#5a2412] shadow-sm hover:bg-[#5a2412]"
                    : "bg-transparent text-[#474235] border-transparent hover:bg-white hover:text-[#1f1f1f] hover:border-[#d7d4c8] hover:shadow-xs"
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 transition-colors ${
                    isActive ? "text-amber-300" : "text-[#756e5a] group-hover:text-[#1f1f1f]"
                  }`}
                />
                <span className="leading-none">{link.label}</span>
                {link.badge !== null && link.badge !== undefined && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ml-0.5 transition-colors ${
                      isActive
                        ? "bg-white text-[#6f2e18]"
                        : "bg-[#6f2e18] text-[#fcfbf9]"
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Mobile Menu Toggle Button */}
        <div className="flex-shrink-0 flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="lg:hidden p-2.5 text-[#1f1f1f] border border-[#d7d4c8] bg-white hover:bg-[#f5f4ef] rounded-full shadow-2xs transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#e5e5e2] bg-[#fcfbf9] px-4 py-4 space-y-2 shadow-xl">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${
                  isActive
                    ? "bg-[#6f2e18] text-[#fcfbf9] border-[#5a2412] shadow-sm"
                    : "bg-white text-[#474235] border-[#d7d4c8] hover:bg-[#f5f4ef] hover:text-[#1f1f1f] shadow-2xs"
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-amber-300" : "text-[#6f2e18]"
                    }`}
                  />
                  <span>{link.label}</span>
                </div>
                {link.badge !== null && link.badge !== undefined && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive
                        ? "bg-white text-[#6f2e18]"
                        : "bg-[#6f2e18] text-white"
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
