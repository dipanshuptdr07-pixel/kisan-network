"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getBuyerEnquiries,
  type BuyerEnquiry,
} from "@/lib/kisan/buyer-enquiries";

export default function BuyerEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<BuyerEnquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBuyerEnquiries()
      .then(setEnquiries)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-[#f6f8f2] text-[#172015]">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <div className="text-2xl font-black text-[#173d20]">
            Kisan<span className="text-[#76a82d]">OS</span>
          </div>

          <Link
            href="/dashboard/buyer"
            className="rounded-full border border-black/10 px-4 py-2 text-xs font-bold"
          >
            ← Dashboard
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-5 py-8">
        <h1 className="text-3xl font-black">My Enquiries</h1>

        <p className="mt-1 text-sm text-gray-500">
          Track your crop enquiries.
        </p>

        {loading ? (
          <div className="mt-6 rounded-3xl bg-white p-8 text-center text-sm text-gray-500">
            Loading enquiries...
          </div>
        ) : enquiries.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-[#dce9c9] bg-[#edf6df] p-8 text-center">
            <div className="text-4xl">💬</div>
            <h2 className="mt-3 font-black">No enquiries yet</h2>
            <p className="mt-2 text-sm text-gray-600">
              Your crop enquiries will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {enquiries.map((enquiry) => (
              <article
                key={enquiry.id}
                className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-lg font-black">
                    🌾 {enquiry.cropName}
                  </h2>

                  <span className="rounded-full bg-[#edf6df] px-3 py-1 text-[10px] font-black uppercase text-[#5b8b27]">
                    {enquiry.status}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {enquiry.message}
                </p>

                <p className="mt-3 text-[11px] text-gray-400">
                  {new Date(enquiry.createdAt).toLocaleString("en-IN")}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
