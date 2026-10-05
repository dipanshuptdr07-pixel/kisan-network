"use client";

import Link from "next/link";

const roles = [
  {
    icon: "🌾",
    title: "Farmer",
    text: "Sell crops, track mandi prices and manage your farm.",
    href: "/onboarding",
  },
  {
    icon: "🛒",
    title: "Buyer / Trader",
    text: "Discover verified crop listings and connect directly.",
    href: "/onboarding",
  },
  {
    icon: "🏢",
    title: "Agri Company",
    text: "Source produce and build reliable farmer networks.",
    href: "/onboarding",
  },
  {
    icon: "👨‍🌾",
    title: "Agriculture Expert",
    text: "Help farmers with practical agricultural guidance.",
    href: "/onboarding",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f8f4] text-[#172015]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <div>
          <div className="text-2xl font-black tracking-tight text-[#173d20]">
            Kisan<span className="text-[#76a82d]">OS</span>
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-500">
            Smart Agriculture
          </div>
        </div>

        <Link
          href="/login"
          className="rounded-full bg-[#173d20] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#245a30]"
        >
          Login
        </Link>
      </nav>

      <section className="mx-auto max-w-6xl px-5 pb-12 pt-8 sm:px-8 sm:pt-14">
        <div className="overflow-hidden rounded-[2rem] bg-[#173d20] px-6 py-10 text-white shadow-xl sm:px-10 sm:py-14">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-bold tracking-wide text-[#d9edbd]">
              🇮🇳 INDIA-FIRST AGRITECH ECOSYSTEM
            </div>

            <h1 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl">
              Smart Agriculture.
              <br />
              <span className="text-[#a9d95b]">One Powerful Platform.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
              KisanOS connects farmers, buyers, agri companies and agriculture
              experts in one simple digital ecosystem.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/login"
                className="rounded-2xl bg-[#a9d95b] px-6 py-3.5 text-center text-sm font-black text-[#173d20] shadow-lg"
              >
                Get Started →
              </Link>

              <Link
                href="/onboarding"
                className="rounded-2xl border border-white/20 bg-white/10 px-6 py-3.5 text-center text-sm font-bold text-white"
              >
                Explore Roles
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
        <div className="mb-7">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#76a82d]">
            Built for every side of agriculture
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
            Choose your KisanOS experience
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map((role) => (
            <Link
              key={role.title}
              href={role.href}
              className="group rounded-3xl border border-black/5 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#edf6df] text-3xl">
                {role.icon}
              </div>

              <h3 className="mt-5 text-xl font-black">{role.title}</h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                {role.text}
              </p>

              <div className="mt-5 text-sm font-black text-[#4f8122]">
                Continue →
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-black/5 bg-white px-5 py-8 text-center">
        <div className="text-lg font-black text-[#173d20]">KisanOS</div>
        <p className="mt-1 text-xs text-gray-500">
          Smart Agriculture. One Powerful Platform.
        </p>
      </footer>
    </main>
  );
}
