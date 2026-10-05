"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMyDashboardRoute } from "@/lib/kisan/route";
import { getMyKisanProfile, type KisanProfile } from "@/lib/kisan/profile";
import { getFarmerStats, type FarmerStats } from "@/lib/kisan/farmer";

const actions = [
  ["➕", "Add Crop", "Create a new crop listing"],
  ["📊", "Market", "Explore current mandi prices"],
  ["💬", "Enquiries", "See buyer enquiries"],
  ["👨‍🌾", "Experts", "Get agricultural guidance"],
];

export default function FarmerDashboard() {
  const router = useRouter();


  const [profile, setProfile] = useState<KisanProfile | null>(null);

  const [farmerStats, setFarmerStats] = useState<FarmerStats>({
    fields: 0,
    activeSeasons: 0,
    cropRecords: 0,
    crops: [],
  });

  useEffect(() => {
    getMyDashboardRoute().then((route) => {
      if (route !== "/dashboard/farmer") router.replace(route);
    });
  }, [router]);

  useEffect(() => {
    getMyKisanProfile().then(setProfile);
    getFarmerStats().then(setFarmerStats);
  }, []);

  const cards = [
    [
      "🌾",
      "My Fields",
      "Your registered farm fields",
      farmerStats.fields.toString(),
    ],
    [
      "🌱",
      "Active Crops",
      "Current crop seasons",
      farmerStats.activeSeasons.toString(),
    ],
    [
      "📋",
      "Crop Records",
      "Your recorded crop entries",
      farmerStats.cropRecords.toString(),
    ],
    [
      "🌾",
      "Crop Types",
      "Different crops recorded",
      farmerStats.crops.length.toString(),
    ],
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
              Farmer Dashboard •{" "}
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
            Namaste, {profile?.full_name || "Farmer"} 👋
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">
            Your farm,
            <br />
            <span className="text-[#a9d95b]">
              your digital control room.
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-white/70">
            Manage crops, discover market opportunities, connect with buyers
            and access agricultural experts from one place.
          </p>

          <Link
            href="/marketplace"
            className="mt-6 inline-block rounded-2xl bg-[#a9d95b] px-5 py-3 text-sm font-black text-[#173d20]"
          >
            🌾 View Marketplace
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(([icon, title, text, value]) => (
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
            Your Farm Data
          </p>

          <h2 className="mt-2 text-xl font-black">
            {farmerStats.crops.length
              ? farmerStats.crops.join(" • ")
              : "No crop records yet"}
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
            KisanOS shows crop information that is actually recorded in your
            farm data.
          </p>
        </div>
      </section>
    </main>
  );
}
