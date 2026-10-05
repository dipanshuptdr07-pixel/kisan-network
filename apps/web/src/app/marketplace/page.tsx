"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMyKisanProfile } from "@/lib/kisan/profile";
import {
  getMarketplaceCrops,
  type MarketplaceCrop,
} from "@/lib/kisan/marketplace";

export default function MarketplacePage() {
  const router = useRouter();
  const [crops, setCrops] = useState<MarketplaceCrop[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    getMyKisanProfile().then((profile) => {
      if (
        profile &&
        profile.role !== "farmer" &&
        profile.role !== "buyer" &&
        profile.role !== "company"
      ) {
        router.replace("/");
      }
    });

    getMarketplaceCrops()
      .then(setCrops)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-[#f6f8f2] text-[#172015]">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <div>
            <div className="text-2xl font-black text-[#173d20]">
              Kisan<span className="text-[#76a82d]">OS</span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
              Crop Marketplace
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

      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <div className="rounded-[2rem] bg-[#173d20] p-6 text-white sm:p-9">
          <p className="text-sm font-bold text-[#b8db82]">
            KisanOS Marketplace
          </p>

          <h1 className="mt-2 text-3xl font-black sm:text-5xl">
            Fresh crops.
            <br />
            <span className="text-[#a9d95b]">Direct from farmers.</span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-white/70">
            Discover crop listings shared by farmers across the KisanOS
            network.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_220px]">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search crop..."
            className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#76a82d]"
          />

          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="District / State"
            className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#76a82d]"
          />
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black">Available Crops</h2>
            <p className="mt-1 text-xs text-gray-500">
              {loading ? "Loading listings..." : `${crops.length} listings found`}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="mt-5 rounded-3xl bg-white p-8 text-center text-sm text-gray-500">
            Loading crop marketplace...
          </div>
        ) : crops.length === 0 ? (
          <div className="mt-5 rounded-3xl border border-[#dce9c9] bg-[#edf6df] p-8 text-center">
            <div className="text-4xl">🌾</div>
            <h3 className="mt-3 font-black">No crop listings yet</h3>
            <p className="mt-2 text-sm text-gray-600">
              Farmer crop records will appear here when available.
            </p>
          </div>
        ) : (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {crops
              .filter((crop) => {
                const q = search.trim().toLowerCase();
                const l = location.trim().toLowerCase();

                const cropMatch =
                  !q ||
                  crop.cropName?.toLowerCase().includes(q) ||
                  crop.variety?.toLowerCase().includes(q);

                const locationText = [
                  crop.district,
                  crop.state,
                ]
                  .filter(Boolean)
                  .join(" ")
                  .toLowerCase();

                const locationMatch = !l || locationText.includes(l);

                return cropMatch && locationMatch;
              })
              .map((crop) => (
              <article
                key={crop.id}
                className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-3xl">🌾</span>
                    <h3 className="mt-3 text-xl font-black">
                      {crop.cropName}
                    </h3>
                  </div>

                  <span className="rounded-full bg-[#edf6df] px-3 py-1 text-[10px] font-black text-[#5b8b27]">
                    AVAILABLE
                  </span>
                </div>

                {crop.variety && (
                  <p className="mt-2 text-sm text-gray-500">
                    Variety: {crop.variety}
                  </p>
                )}

                <div className="mt-5 space-y-2 rounded-2xl bg-[#f6f8f2] p-4 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Farmer</span>
                    <span className="font-bold">{crop.farmerName}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Area</span>
                    <span className="font-bold">
                      {crop.area
                        ? `${crop.area} ${crop.areaUnit || ""}`
                        : "—"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Location</span>
                    <span className="font-bold">
                      {[crop.district, crop.state]
                        .filter(Boolean)
                        .join(", ") || "India"}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/marketplace/${crop.id}`}
                  className="mt-4 block w-full rounded-2xl bg-[#173d20] px-4 py-3 text-center text-xs font-black text-white"
                >
                  View Crop
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
