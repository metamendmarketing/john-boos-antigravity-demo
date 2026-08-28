"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ShieldCheck, ArrowRight, AlertCircle, Lock } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";

  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Invalid password");
        setLoading(false);
        return;
      }

      router.push(from);
      router.refresh();
    } catch {
      setError("Connection error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-[#e5e5e2] rounded-3xl p-8 sm:p-12 shadow-xl max-w-md w-full mx-auto text-center">
      {/* Official John Boos SVG Logo */}
      <div className="flex justify-center mb-6">
        <img
          src="/john_boos_logo.svg"
          alt="John Boos & Co."
          className="h-16 w-auto object-contain"
        />
      </div>

      <div className="space-y-1 mb-6">
        <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#a91b1b]">
          1887 &bull; Private Stakeholder Portal
        </span>
        <h1 className="text-2xl font-serif font-black text-[#1f1f1f] tracking-tight">
          Commercial Specifier Demo
        </h1>
        <p className="text-xs text-[#756e5a] leading-relaxed max-w-xs mx-auto">
          Enter the demonstration access code to launch the John Boos commercial equipment sizing engine.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs flex items-start space-x-2 text-left">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-600" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div>
          <label htmlFor="password" className="block text-[11px] font-bold uppercase tracking-wider text-[#1f1f1f] mb-1.5 font-sans">
            Demonstration Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password..."
            className="w-full px-4 py-3.5 rounded-xl bg-[#fbfaf8] border border-[#d7d4c8] text-[#1f1f1f] placeholder-[#948d77] focus:outline-none focus:ring-2 focus:ring-[#a91b1b] text-sm font-medium transition-all"
            autoFocus
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-4 rounded-xl bg-[#a91b1b] hover:bg-[#8b1515] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors disabled:opacity-50 shadow-md shadow-[#a91b1b]/20"
        >
          <span>{loading ? "Verifying Access..." : "Enter Showroom Demo"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-[#e5e5e2] text-center">
        <p className="text-xs text-[#756e5a]">
          Default Demo Access Code: <code className="px-2.5 py-1 rounded bg-[#f4f3ef] text-[#1f1f1f] border border-[#d7d4c8] font-mono text-xs font-bold">boos2026</code>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#fbfaf8] text-[#1f1f1f] flex flex-col justify-between selection:bg-[#a91b1b] selection:text-white">
      {/* Top Banner */}
      <div className="border-b border-[#e5e5e2] bg-white px-6 py-4 flex items-center justify-between shadow-2xs">
        <div className="flex items-center space-x-3">
          <img
            src="/john_boos_logo.svg"
            alt="John Boos & Co."
            className="h-9 w-auto object-contain"
          />
        </div>
        <div className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300">
          <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
          Stakeholder Access
        </div>
      </div>

      {/* Main Form Box */}
      <div className="px-6 py-12 flex-1 flex items-center justify-center">
        <Suspense fallback={<div className="text-center text-[#756e5a]">Loading showroom demo...</div>}>
          <LoginForm />
        </Suspense>
      </div>

      {/* Footer */}
      <div className="border-t border-[#e5e5e2] px-6 py-4 text-center text-xs text-[#756e5a]">
        Private concept demonstration by Metamend. Not affiliated with or endorsed by John Boos &amp; Co. &bull; 1887 The Trusted Tradition
      </div>
    </div>
  );
}
