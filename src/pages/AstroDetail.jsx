import { useParams, Link } from "react-router-dom";

const ASTRO = {
  andromeda:  { title: "Andromeda (M31)",  sub: "Wide-field mosaic", img: "/images/andromeda_full.jpg" },
  crescent:   { title: "Crescent Nebula",  sub: "Ha-OIII bi-color",  img: "/images/crescent_full.jpg"  },
  pinwheel:   { title: "Pinwheel (M101)",  sub: "RGB + drizzle",     img: "/images/pinwheel_full.jpg"  },
  bodes:      { title: "Bode’s Pair",      sub: "M81/M82",           img: "/images/bodes_full.jpg"     },
  triangulum: { title: "Triangulum (M33)", sub: "RGB",               img: "/images/triangulum_full.jpg"},
  veil:       { title: "Veil Complex",     sub: "Narrowband",        img: "/images/veil_full.jpg"      },
};

export default function AstroDetail() {
  const { id } = useParams();
  const it = ASTRO[id];

  if (!it) {
    return (
      <main className="min-h-screen bg-black text-slate-200 p-6 grid place-items-center">
        <div className="text-center">
          <p className="mb-4">Photo not found.</p>
        </div>
        <Link to="/" className="underline text-sky-300">← Back to home</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-slate-200 py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6">
          {/* Row 1: actions aligned top-right */}
          <div className="flex flex-wrap gap-2 justify-end">
            <Link to="/astro" className="rounded-2xl px-3 py-2 bg-white/90 text-slate-900 font-medium hover:bg-white">
              ← All photos
            </Link>
            <Link to="/" className="rounded-2xl px-3 py-2 bg-white/10 text-slate-100 hover:bg-white/20">
              Home
            </Link>
          </div>
          {/* Row 2: title (full width) */}
          <h1 className="mt-3 text-2xl md:text-3xl font-bold text-white">
            {it.title}
          </h1>
        </div>

        <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
          <div className="bg-slate-900">
            <img src={it.img} alt={it.title} className="w-full h-auto" loading="eager" />
          </div>
          <div className="p-4">
            <p className="text-sm text-slate-300">{it.sub}</p>
            {/* Add acquisition notes, integration time, filters, processing steps here */}
          </div>
        </div>
      </div>
    </main>
  );
}
