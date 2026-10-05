"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { updateEnquiryStatus } from "@/lib/kisan/enquiry-status";
import {
  getFarmerEnquiries,
  type FarmerEnquiry,
} from "@/lib/kisan/farmer-enquiries";

export default function FarmerEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<FarmerEnquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFarmerEnquiries()
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
            href="/dashboard/farmer"
            className="rounded-full border border-black/10 px-4 py-2 text-xs font-bold"
          >
            ← Dashboard
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-5 py-8">
        <h1 className="text-3xl font-black">Buyer Enquiries</h1>

        <p className="mt-1 text-sm text-gray-500">
          Buyers interested in your crops.
        </p>

        {loading ? (
          <div className="mt-6 rounded-3xl bg-white p-8 text-center text-sm text-gray-500">
            Loading enquiries...
          </div>
        ) : enquiries.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-[#dce9c9] bg-[#edf6df] p-8 text-center">
            <div className="text-4xl">🌾</div>
            <h2 className="mt-3 font-black">No buyer enquiries yet</h2>
            <p className="mt-2 text-sm text-gray-600">
              Buyer enquiries for your crops will appear here.
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

                {enquiry.status === "pending" && (
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={async () => {
                        const result = await updateEnquiryStatus(
                          enquiry.id,
                          "accepted"
                        );

                        if (result.success) {
                          setEnquiries((items) =>
                            items.map((item) =>
                              item.id === enquiry.id
                                ? { ...item, status: "accepted" }
                                : item
                            )
                          );
                        }
                      }}
                      className="rounded-xl bg-[#173d20] px-4 py-2 text-xs font-black text-white"
                    >
                      Accept
                    </button>

                    <button
                      onClick={async () => {
                        const result = await updateEnquiryStatus(
                          enquiry.id,
                          "rejected"
                        );

                        if (result.success) {
                          setEnquiries((items) =>
                            items.map((item) =>
                              item.id === enquiry.id
                                ? { ...item, status: "rejected" }
                                : item
                            )
                          );
                        }
                      }}
                      className="rounded-xl border border-red-200 px-4 py-2 text-xs font-black text-red-600"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
