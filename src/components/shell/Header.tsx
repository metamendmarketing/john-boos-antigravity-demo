"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FolderKanban,
  Columns2,
  SlidersHorizontal,
  LogOut,
  Layers,
  Sparkles,
  ShieldCheck,
  Menu,
  X,
  BookOpen,
} from "lucide-react";
import { useProjectSchedule } from "@/lib/project-store";
import { useCompareList } from "@/lib/compare-store";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { itemCount } = useProjectSchedule();
  const { compareCount } = useCompareList();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth", { method: "DELETE" });
      router.push("/login");
      router.refresh();
    } catch {
      // ignore
    }
  };

  const navLinks = [
    { href: "/", label: "Specifier", icon: Sparkles },
    { href: "/configure", label: "Sink Configurator", icon: SlidersHorizontal },
    { href: "/catalog", label: "Commercial Catalog", icon: Layers },
    {
      href: "/compare",
      label: "Compare Matrix",
      icon: Columns2,
      badge: compareCount > 0 ? compareCount : null,
    },
    {
      href: "/project",
      label: "Equipment Schedule",
      icon: FolderKanban,
      badge: itemCount > 0 ? itemCount : null,
    },
    { href: "/about-demo", label: "Heritage & Proof", icon: BookOpen },
  ];

  if (pathname === "/login") {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-[#fcfbf9] border-b border-[#e5e5e2] shadow-xs text-[#1f1f1f]">
      {/* Official Top Announcement Bar */}
      <div className="bg-[#121212] text-[#fcfbf9] px-4 sm:px-8 py-2 flex items-center justify-between text-[11px] font-sans tracking-widest uppercase">
        <div className="flex items-center space-x-3">
          <span className="font-bold text-amber-300">1887</span>
          <span className="text-zinc-500">&bull;</span>
          <span className="font-semibold text-zinc-200 hidden sm:inline">The Trusted Tradition Since 1887</span>
          <span className="text-zinc-500 hidden sm:inline">&bull;</span>
          <span className="text-zinc-300">Commercial Foodservice Sizing Engine</span>
        </div>
        <div className="flex items-center space-x-4 text-zinc-300">
          <span className="flex items-center text-emerald-400 font-medium normal-case tracking-normal">
            <ShieldCheck className="w-3.5 h-3.5 mr-1" />
            Verified Catalog Truth-Set
          </span>
          <span className="text-zinc-700 hidden md:inline">|</span>
          <span className="hidden md:inline normal-case tracking-normal text-zinc-400">Effingham, Illinois</span>
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

        {/* Center: Desktop Navigation - Center-Spaced Icon Button Dock */}
        <nav className="hidden md:flex items-center justify-center p-1.5 bg-[#eeece5] rounded-full border border-[#dbd6c7] shadow-inner space-x-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-label={link.label}
                className={`group relative w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 border ${
                  isActive
                    ? "bg-[#6f2e18] text-[#fcfbf9] border-[#5a2412] shadow-md hover:bg-[#5a2412]"
                    : "bg-white/80 text-[#474235] border-transparent hover:bg-white hover:text-[#1f1f1f] hover:border-[#d7d4c8] hover:shadow-xs"
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? "text-amber-300" : "text-[#595343] group-hover:text-[#1f1f1f]"
                  }`}
                />
                {link.badge !== null && link.badge !== undefined && (
                  <span
                    className={`absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center shadow transition-colors ${
                      isActive
                        ? "bg-amber-300 text-[#6f2e18]"
                        : "bg-[#6f2e18] text-white"
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
                {/* Floating Hover Tooltip */}
                <span className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-150 whitespace-nowrap px-2.5 py-1 rounded-md bg-[#1f1f1f] text-[#fcfbf9] text-[11px] font-bold tracking-wide shadow-lg z-50">
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Right: Header Action Controls & Demo Lock */}
        <div className="flex-shrink-0 flex items-center space-x-2.5">
          <button
            onClick={handleLogout}
            title="Exit Demo"
            className="hidden sm:flex items-center space-x-1.5 px-4 py-2 rounded-full border border-[#d7d4c8] bg-white hover:bg-[#f5f4ef] text-[#5c5645] hover:text-[#1f1f1f] text-xs font-bold uppercase tracking-wider shadow-2xs hover:shadow-xs transition-all"
          >
            <LogOut className="w-4 h-4 text-[#756e5a]" />
            <span>Lock</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="md:hidden p-2.5 text-[#1f1f1f] border border-[#d7d4c8] bg-white hover:bg-[#f5f4ef] rounded-full shadow-2xs transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#e5e5e2] bg-[#fcfbf9] px-4 py-4 space-y-2 shadow-xl">
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
