"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMyDashboardRoute } from "@/lib/kisan/route";
import { getMyKisanProfile, type KisanProfile } from "@/lib/kisan/profile";
import { getExpertStats, type ExpertStats } from "@/lib/kisan/expert";

const actions = [
  ["💬", "Consultations", "Help farmers with their questions"],
  ["🌱", "Crop Diagnosis", "Review crop-related problems"],
  ["📚", "Knowledge", "Share useful agricultural guidance"],
  ["👨‍🌾", "Farmer Network", "Connect with farmers"],
];

export default function ExpertDashboard() {
  const router = useRouter();


  const [profile, setProfile] = useState<KisanProfile | null>(null);
  const [expertStats, setExpertStats] = useState<ExpertStats | null>(null);

  useEffect(() => {
    getMyDashboardRoute().then((route) => {
      if (route !== "/dashboard/expert") router.replace(route);
    });
  }, [router]);

  useEffect(() => {
    getMyKisanProfile().then(setProfile);
    getExpertStats().then(setExpertStats);
  }, []);

  const stats = [
    ["👨‍🌾", "Farmers Helped", "Farmers supported", "—"],
    ["💬", "Consultations", "Active consultations", "—"],
    ["🌱", "Crop Cases", "Cases being reviewed", "—"],
    ["⭐", "Expert Rating", "Community feedback", expertStats?.rating.toFixed(1) || "—"],
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
              Agriculture Expert •{" "}
              {profile?.district || profile?.state || "India"}
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
            Welcome, {profile?.full_name || "Agriculture Expert"} 👋
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">
            Your knowledge.
            <br />
            <span className="text-[#a9d95b]">Their better harvest.</span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-white/70">
            Support farmers with practical agricultural guidance, crop
            insights and expert consultations.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold">
              {expertStats?.verificationStatus || "Verification pending"}
            </span>
          </div>

          <button className="mt-6 rounded-2xl bg-[#a9d95b] px-5 py-3 text-sm font-black text-[#173d20]">
            💬 View consultations
          </button>
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
          <h2 className="text-2xl font-black">Expert Tools</h2>

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
            Expert Profile
          </p>

          <h2 className="mt-2 text-xl font-black">
            {expertStats?.bio || "Agriculture Expert"}
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            {expertStats?.ratingCount
              ? `${expertStats.rating.toFixed(1)} rating from ${expertStats.ratingCount} reviews`
              : "No ratings recorded yet."}
          </p>
        </div>
      </section>
    </main>
  );
}
