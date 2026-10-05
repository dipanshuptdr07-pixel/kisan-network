"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMyDashboardRoute } from "@/lib/kisan/route";
import { getMyKisanProfile, type KisanProfile } from "@/lib/kisan/profile";
import { getBuyerStats, type BuyerStats } from "@/lib/kisan/buyer";

const actions = [
  ["🔍", "Find Crops", "Discover available produce"],
  ["📊", "Market Prices", "Compare current market rates"],
  ["🤝", "Farmers", "Connect with farmers"],
  ["📋", "My Orders", "Manage your purchases"],
];

export default function BuyerDashboard() {
  const router = useRouter();


  const [profile, setProfile] = useState<KisanProfile | null>(null);
  const [buyerStats, setBuyerStats] = useState<BuyerStats | null>(null);

  useEffect(() => {
    getMyDashboardRoute().then((route) => {
      if (route !== "/dashboard/buyer") router.replace(route);
    });
  }, [router]);

  useEffect(() => {
    getMyKisanProfile().then(setProfile);
    getBuyerStats().then(setBuyerStats);
  }, []);

  const stats = [
    ["🔎", "Crop Listings", "Browse available produce", "—"],
    ["📈", "Market Prices", "Track current rates", "Live"],
    ["🛒", "My Enquiries", "Manage farmer enquiries", "—"],
    ["⭐", "Rating", "Your buyer rating", buyerStats?.rating.toFixed(1) || "—"],
  ];

  return (
    <main className="min-h-screen bg-[#f6f8f2] text-[#172015]">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <div>
            <div className="text-2xl font-black text-[#173d20]">
              Kisan<span className="text-[#76a82d]">OS</span>
            </div>

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
              Buyer / Trader •{" "}
              {buyerStats?.location ||
                profile?.district ||
                profile?.state ||
                "India"}
            </p>
          </div>

          <Link
            href="/"
            className="rounded-full border border-black/10 px-4 py-2 text-xs font-bold"
          >
            Home
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-7 sm:px-8">
        <div className="rounded-[2rem] bg-[#173d20] p-6 text-white shadow-lg sm:p-9">
          <p className="text-sm font-semibold text-[#b8db82]">
            Welcome,{" "}
            {buyerStats?.businessName ||
              profile?.full_name ||
              "Buyer / Trader"}{" "}
            👋
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">
            Source smarter.
            <br />
            <span className="text-[#a9d95b]">Trade with confidence.</span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-white/70">
            Discover crop listings, compare market prices and connect directly
            with farmers through one simple platform.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold">
              {buyerStats?.businessType || "Agricultural Buyer"}
            </span>

            <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold">
              {buyerStats?.verificationStatus || "Verification pending"}
            </span>
          </div>

          <Link
            href="/marketplace"
            className="mt-6 inline-block rounded-2xl bg-[#a9d95b] px-5 py-3 text-sm font-black text-[#173d20]"
          >
            🔎 Explore crops
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([icon, title, text, value]) => (
            <div
              key={title}
              className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{icon}</span>

                <span className="text-xl font-black text-[#173d20]">
                  {value}
                </span>
              </div>

              <h2 className="mt-5 font-black">{title}</h2>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                {text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-black">Quick Actions</h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {actions.map(([icon, title, text]) => (
              <button
                key={title}
                className="rounded-3xl border border-black/5 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="text-2xl">{icon}</span>

                <h3 className="mt-4 font-black">{title}</h3>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {text}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-[#dce9c9] bg-[#edf6df] p-6">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#5b8b27]">
            Buyer Profile
          </p>

          <h2 className="mt-2 text-xl font-black">
            {buyerStats?.businessName || "Buyer / Trader"}
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            {buyerStats?.ratingCount
              ? `${buyerStats.rating.toFixed(1)} rating from ${buyerStats.ratingCount} reviews`
              : "No ratings recorded yet."}
          </p>
        </div>
      </section>
    </main>
  );
}
