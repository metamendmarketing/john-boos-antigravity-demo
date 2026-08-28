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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
        {/* Official John Boos SVG Logo */}
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

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all flex items-center space-x-1.5 ${
                  isActive
                    ? "text-[#6f2e18] font-bold"
                    : "text-[#474235] hover:text-[#1f1f1f] hover:bg-[#f5f4ef] rounded-full"
                }`}
              >
                <span>{link.label}</span>
                {link.badge !== null && link.badge !== undefined && (
                  <span className="px-2 py-0.5 rounded-full bg-[#6f2e18] text-[#fcfbf9] text-[10px] font-bold ml-1">
                    {link.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#6f2e18] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Header CTAs & Demo Lock */}
        <div className="flex items-center space-x-3">
          <Link
            href="/project"
            className="relative p-2.5 text-[#1f1f1f] hover:text-[#6f2e18] hover:bg-[#f5f4ef] rounded-full transition-colors"
            title="Equipment Schedule"
          >
            <FolderKanban className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#6f2e18] text-[#fcfbf9] text-[10px] font-bold flex items-center justify-center shadow">
                {itemCount}
              </span>
            )}
          </Link>

          <Link
            href="/compare"
            className="relative p-2.5 text-[#1f1f1f] hover:text-[#6f2e18] hover:bg-[#f5f4ef] rounded-full transition-colors"
            title="Compare Tray"
          >
            <Columns2 className="w-5 h-5" />
            {compareCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#1f1f1f] text-[#fcfbf9] text-[10px] font-bold flex items-center justify-center shadow">
                {compareCount}
              </span>
            )}
          </Link>

          <button
            onClick={handleLogout}
            title="Exit Demo"
            className="hidden sm:flex items-center space-x-1.5 px-4 py-2 rounded-full border border-[#d7d4c8] bg-white hover:bg-[#f5f4ef] text-[#5c5645] hover:text-[#1f1f1f] text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <LogOut className="w-3.5 h-3.5 text-[#756e5a]" />
            <span>Lock</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#1f1f1f] hover:bg-[#f5f4ef] rounded-full"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
                className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider ${
                  isActive ? "bg-[#6f2e18] text-[#fcfbf9]" : "text-[#474235] hover:bg-[#f5f4ef]"
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </div>
                {link.badge !== null && link.badge !== undefined && (
                  <span className="px-2 py-0.5 rounded-full bg-[#6f2e18] text-white text-[10px]">
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
