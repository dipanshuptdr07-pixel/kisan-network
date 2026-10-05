"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createCropEnquiry } from "@/lib/kisan/enquiries";
import { useParams } from "next/navigation";
import {
  getMarketplaceCrops,
  type MarketplaceCrop,
} from "@/lib/kisan/marketplace";

export default function CropDetailPage() {
  const params = useParams();
  const [crop, setCrop] = useState<MarketplaceCrop | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    getMarketplaceCrops()
      .then((items) => {
        setCrop(items.find((item) => item.id === params.id) || null);
      })
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f6f8f2]">
        <p className="text-sm font-bold text-gray-500">
          Loading crop...
        </p>
      </main>
    );
  }

  if (!crop) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f6f8f2] p-6">
        <div className="text-center">
          <div className="text-5xl">🌾</div>
          <h1 className="mt-4 text-2xl font-black">
            Crop not found
          </h1>
          <Link
            href="/marketplace"
            className="mt-5 inline-block rounded-2xl bg-[#173d20] px-5 py-3 text-sm font-black text-white"
          >
            Back to Marketplace
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f8f2] text-[#172015]">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4">
          <div className="text-2xl font-black text-[#173d20]">
            Kisan<span className="text-[#76a82d]">OS</span>
          </div>

          <Link
            href="/marketplace"
            className="rounded-full border border-black/10 px-4 py-2 text-xs font-bold"
          >
            ← Marketplace
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-5 py-8">
        <div className="rounded-[2rem] bg-[#173d20] p-7 text-white sm:p-10">
          <span className="text-5xl">🌾</span>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-black sm:text-5xl">
              {crop.cropName}
            </h1>

            <span className="rounded-full bg-[#a9d95b] px-3 py-1 text-[10px] font-black text-[#173d20]">
              AVAILABLE
            </span>
          </div>

          {crop.variety && (
            <p className="mt-3 text-sm text-white/70">
              Variety: {crop.variety}
            </p>
          )}
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Farmer
            </p>
            <h2 className="mt-2 text-xl font-black">
              {crop.farmerName}
            </h2>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Location
            </p>
            <h2 className="mt-2 text-xl font-black">
              {[crop.district, crop.state]
                .filter(Boolean)
                .join(", ") || "India"}
            </h2>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Farm Area
            </p>
            <h2 className="mt-2 text-xl font-black">
              {crop.area
                ? `${crop.area} ${crop.areaUnit || ""}`
                : "Not specified"}
            </h2>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Sowing Date
            </p>
            <h2 className="mt-2 text-xl font-black">
              {crop.sowingDate || "Not specified"}
            </h2>
          </div>
        </div>

        <div className="mt-5 rounded-3xl border border-[#dce9c9] bg-[#edf6df] p-6">
          <p className="text-xs font-black uppercase tracking-wider text-[#5b8b27]">
            Next Step
          </p>

          <h2 className="mt-2 text-xl font-black">
            Interested in this crop?
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            Enquiry and farmer communication will be connected here in the
            next marketplace phase.
          </p>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your enquiry..."
            className="mt-5 min-h-28 w-full rounded-2xl border border-black/10 bg-white p-4 text-sm outline-none focus:border-[#76a82d]"
          />

          <button
            disabled={sending || !message.trim()}
            onClick={async () => {
              if (!crop) return;

              setSending(true);

              const result = await createCropEnquiry(
                crop.id,
                message.trim()
              );

              setSending(false);

              if (result.success) {
                setMessage("");
                alert("Enquiry sent successfully.");
              } else {
                alert(result.error || "Unable to send enquiry.");
              }
            }}
            className="mt-3 rounded-2xl bg-[#173d20] px-5 py-3 text-sm font-black text-white disabled:opacity-40"
          >
            {sending ? "Sending..." : "Send Enquiry"}
          </button>
        </div>
      </section>
    </main>
  );
}
