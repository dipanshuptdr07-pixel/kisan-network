"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMyDashboardRoute } from "@/lib/kisan/route";
import { getMyKisanProfile, type KisanProfile } from "@/lib/kisan/profile";
import { getCompanyStats, type CompanyStats } from "@/lib/kisan/company";

const actions = [
  ["🌾", "Find Farmers", "Discover potential suppliers"],
  ["📦", "Procurement", "Manage crop sourcing"],
  ["🤝", "Suppliers", "Manage business partners"],
  ["📊", "Market Intelligence", "Track market trends"],
];

export default function CompanyDashboard() {
  const router = useRouter();


  const [profile, setProfile] = useState<KisanProfile | null>(null);
  const [companyStats, setCompanyStats] = useState<CompanyStats | null>(null);

  useEffect(() => {
    getMyDashboardRoute().then((route) => {
      if (route !== "/dashboard/company") router.replace(route);
    });
  }, [router]);

  useEffect(() => {
    getMyKisanProfile().then(setProfile);
    getCompanyStats().then(setCompanyStats);
  }, []);

  const stats = [
    ["🌾", "Farmer Network", "Connected suppliers", "—"],
    ["📦", "Procurement", "Active sourcing", "—"],
    ["🤝", "Suppliers", "Verified partners", "—"],
    ["⭐", "Rating", "Company rating", companyStats?.rating.toFixed(1) || "—"],
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
              Agri Company •{" "}
              {companyStats?.location ||
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
            {companyStats?.companyName ||
              profile?.full_name ||
              "Business Partner"}{" "}
            👋
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">
            Build stronger supply.
            <br />
            <span className="text-[#a9d95b]">Grow with farmers.</span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-white/70">
            Manage procurement, discover farmer networks and make smarter
            agricultural sourcing decisions from one platform.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold">
              {companyStats?.verificationStatus || "Verification pending"}
            </span>
          </div>

          <Link
            href="/marketplace"
            className="mt-6 inline-block rounded-2xl bg-[#a9d95b] px-5 py-3 text-sm font-black text-[#173d20]"
          >
            🌾 Explore crops
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
              <p className="mt-1 text-xs leading-5 text-gray-500">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-black">Business Operations</h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {actions.map(([icon, title, text]) => (
              <button
                key={title}
                className="rounded-3xl border border-black/5 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="text-2xl">{icon}</span>
                <h3 className="mt-4 font-black">{title}</h3>
                <p className="mt-1 text-xs leading-5 text-gray-500">{text}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-[#dce9c9] bg-[#edf6df] p-6">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#5b8b27]">
            Company Profile
          </p>

          <h2 className="mt-2 text-xl font-black">
            {companyStats?.companyName || "Agri Company"}
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            {companyStats?.ratingCount
              ? `${companyStats.rating.toFixed(1)} rating from ${companyStats.ratingCount} reviews`
              : "No ratings recorded yet."}
          </p>
        </div>
      </section>
    </main>
  );
}
