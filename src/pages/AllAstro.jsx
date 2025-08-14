import React from "react";
import { Link } from "react-router-dom";

const ITEMS = [
  { id: "andromeda",  title: "Andromeda (M31)",  sub: "Wide-field mosaic", seed: "andromeda" },
  { id: "crescent",   title: "Crescent Nebula",  sub: "Ha-OIII bi-color",  seed: "crescent" },
  { id: "pinwheel",   title: "Pinwheel (M101)",  sub: "RGB + drizzle",     seed: "pinwheel" },
  { id: "bodes",      title: "Bode’s Pair",      sub: "M81/M82",           seed: "bodes" },
  { id: "triangulum", title: "Triangulum (M33)", sub: "RGB",               seed: "triangulum" },
  { id: "veil",       title: "Veil Complex",     sub: "Narrowband",        seed: "veil" },
  // add more as you have them…
];

export default function AllAstro() {
  return (
    <main className="py-12 min-h-screen bg-black text-slate-200">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Astrophotography</h1>
          <Link
            to="/"
            className="rounded-2xl px-3 py-2 bg-white/90 text-slate-900 font-medium hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            ← Back to home
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ITEMS.map((it) => (
            <Link
              key={it.id}
              to={`/astro/${it.id}`}
              className="rounded-2xl border border-white/10 overflow-hidden bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="aspect-[16/9] w-full bg-slate-900">
                <img
                  src={`https://picsum.photos/seed/${encodeURIComponent(it.seed)}/1280/720`}
                  alt={it.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold text-white">{it.title}</h3>
                <p className="text-xs text-slate-300">{it.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
