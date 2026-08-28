import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ExternalLink,
  MapPin,
  Phone,
  Mail,
  Award,
  Layers,
  FileCode,
} from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#6f2e18] text-[#fcfbf9] text-xs">
      {/* Top Value Banner */}
      <div className="border-b border-[#8a3c22] py-8 px-4 sm:px-6 lg:px-8 bg-[#5d2613]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#6f2e18] border border-[#8a3c22] flex items-center justify-center text-amber-200">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white uppercase tracking-wider text-xs block font-sans">
                Since 1887
              </span>
              <span className="text-[11px] text-amber-100/80">
                135+ Years of American Craftsmanship
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#6f2e18] border border-[#8a3c22] flex items-center justify-center text-emerald-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white uppercase tracking-wider text-xs block font-sans">
                NSF &amp; CSA Certified
              </span>
              <span className="text-[11px] text-amber-100/80">
                Commercial Sanitation &amp; Health Standards
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#6f2e18] border border-[#8a3c22] flex items-center justify-center text-rose-200">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white uppercase tracking-wider text-xs block font-sans">
                Boos Steel™ Commercial Line
              </span>
              <span className="text-[11px] text-amber-100/80">
                Type 300 &amp; 430 Stainless Kitchen Engineering
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Company Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Brand & Address (2 cols) */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center space-x-3">
            <img
              src="/john_boos_logo.svg"
              alt="John Boos & Co."
              className="h-12 w-auto object-contain brightness-0 invert"
            />
          </div>

          <p className="text-amber-100/90 text-xs leading-relaxed max-w-sm">
            World-renowned commercial stainless steel foodservice equipment, heavy-duty B-Series compartment sinks, chef work tables, and heirloom butcher blocks.
          </p>

          <div className="space-y-1.5 text-[#fcfbf9] text-xs pt-1">
            <p className="flex items-center">
              <MapPin className="w-3.5 h-3.5 mr-2 text-amber-300 flex-shrink-0" />
              3601 &amp; 3701 S Banker St, Effingham, IL 62401
            </p>
            <p className="flex items-center">
              <Phone className="w-3.5 h-3.5 mr-2 text-amber-300 flex-shrink-0" />
              (888) 431-2667 &bull; Commercial Sales
            </p>
            <p className="flex items-center">
              <Mail className="w-3.5 h-3.5 mr-2 text-amber-300 flex-shrink-0" />
              sales@johnboos.com
            </p>
          </div>
        </div>

        {/* Commercial Navigation */}
        <div>
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3 font-sans">
            Commercial Lines
          </h4>
          <ul className="space-y-2 text-amber-100/80">
            <li>
              <Link href="/configure" className="hover:text-white transition-colors">
                B-Series Sink Wizard
              </Link>
            </li>
            <li>
              <Link href="/catalog?category=compartment_sink" className="hover:text-white transition-colors">
                Compartment Sinks
              </Link>
            </li>
            <li>
              <Link href="/catalog?category=work_table" className="hover:text-white transition-colors">
                Stainless Work Tables
              </Link>
            </li>
            <li>
              <Link href="/catalog?category=filler_table" className="hover:text-white transition-colors">
                Filler Tables &amp; Stands
              </Link>
            </li>
            <li>
              <Link href="/catalog" className="hover:text-white transition-colors">
                Full 23-Model Truth-Set
              </Link>
            </li>
          </ul>
        </div>

        {/* Specifier Tools */}
        <div>
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3 font-sans">
            Specifier Tools
          </h4>
          <ul className="space-y-2 text-amber-100/80">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Natural Language Sizing
              </Link>
            </li>
            <li>
              <Link href="/compare" className="hover:text-white transition-colors">
                Side-by-Side Comparison
              </Link>
            </li>
            <li>
              <Link href="/project" className="hover:text-white transition-colors">
                Equipment Schedule &amp; Print
              </Link>
            </li>
            <li>
              <Link href="/about-demo" className="hover:text-white transition-colors">
                Concept Architecture
              </Link>
            </li>
          </ul>
        </div>

        {/* Technical & KCL Resources */}
        <div>
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3 font-sans">
            CAD &amp; BIM Libraries
          </h4>
          <ul className="space-y-2 text-amber-100/80">
            <li>
              <a
                href="https://johnboos.kclcad.com/app/I108920834#models"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white inline-flex items-center space-x-1"
              >
                <span>John Boos on KCL CAD</span>
                <ExternalLink className="w-3 h-3 text-amber-200" />
              </a>
            </li>
            <li>
              <a
                href="https://www.johnboos.com/literature"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white inline-flex items-center space-x-1"
              >
                <span>Public Literature &amp; Specs</span>
                <ExternalLink className="w-3 h-3 text-amber-200" />
              </a>
            </li>
            <li>
              <span className="text-amber-200/80 flex items-center space-x-1">
                <FileCode className="w-3 h-3 text-amber-200" />
                <span>Deterministic Rules Engine</span>
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Concept Disclaimer Bar */}
      <div className="border-t border-[#8a3c22] bg-[#4f1e0d] py-6 px-4 sm:px-6 lg:px-8 text-amber-100/60 text-[11px]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p>
            &copy; 2026 Metamend. Private concept demonstration prepared for John Boos &amp; Co. stakeholders.
          </p>
          <p className="italic">
            Not affiliated with or endorsed by John Boos &amp; Co. &bull; Effingham, IL 62401 &bull; 1887 The Trusted Tradition
          </p>
        </div>
      </div>
    </footer>
  );
};
