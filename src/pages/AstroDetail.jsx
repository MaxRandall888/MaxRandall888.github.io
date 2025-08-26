import { useParams, Link } from "react-router-dom";

// build URLs that work locally and on GitHub Pages
const img = (filename) =>
    `${import.meta.env.BASE_URL}images/${encodeURIComponent(filename)}`;

// SINGLE source of truth for your photos
export const ASTRO = {
    "andromeda":         { title: "Andromeda (M31)",          sub: "Broadband",   img: img("Andromeda.jpg") },
    "bodes-nebulae":     { title: "Bode’s Pair (M81/M82)",    sub: "Broadband",   img: img("bodes nebulae.jpg") },
    "cigar":             { title: "Cigar Galaxy (M82)",       sub: "Broadband",   img: img("cigar.jpg") },
    "coma-cluster":      { title: "Coma Cluster",             sub: "Galaxies",    img: img("Coma Cluster.jpg") },
    "crab-bad":          { title: "Crab Nebula (M1)",         sub: "Broadband",   img: img("crab_bad.jpg") },
    "creascentw":        { title: "Crescent Nebula",          sub: "Ha–OIII",     img: img("CreascentW.jpg") },
    "eagle-nebula-2":    { title: "Eagle Nebula (M16)",       sub: "Wide field",  img: img("Eagle_Nebula(2).jpg") },
    "eagle-wide":        { title: "Eagle Nebula (Wide)",      sub: "Wide field",  img: img("Eagle_Wide.jpg") },
    "half-moon":         { title: "Half Moon",                sub: "Lunar",       img: img("HalfMoon.jpg") },
    "jupiter-10ms":      { title: "Jupiter (10 ms)",          sub: "Planetary",   img: img("Jupiter_10ms.jpg") },
    "lagoon-and-trifid": { title: "Lagoon & Trifid",          sub: "RGB",         img: img("Lagoon and Trifid.jpg") },
    "m13-2":             { title: "Hercules Cluster (M13)",   sub: "RGB",         img: img("M13_2.jpg") },
    "m101-2":            { title: "Pinwheel Galaxy (M101)",   sub: "RGB",         img: img("M101_2.jpg") },
    "markarians-chain":  { title: "Markarian’s Chain",        sub: "Galaxies",    img: img("markarian's chain.jpg") },
    "moon-0-5ms":        { title: "Moon (0.5 ms)",            sub: "Lunar",       img: img("Moon0.5ms.jpg") },
    "northamerica-lp":   { title: "North America Nebula",     sub: "Wide field",  img: img("NorthAmerica_LP.jpg") },
    "orion-lp":          { title: "Orion (M42)",              sub: "HDR/LP",      img: img("Orion_LP.jpg") },
    "ring-nebula":       { title: "Ring Nebula (M57)",        sub: "RGB",         img: img("RingNebula.jpg") },
    "rosette":           { title: "Rosette Nebula",           sub: "Narrowband",  img: img("rosette.jpg") },
    "rosette-cluster":   { title: "Rosette Cluster",          sub: "RGB",         img: img("RosetteCluster.jpg") },
    "trapezium":         { title: "Trapezium (Orion core)",   sub: "HDR",         img: img("trapezium.jpg") },
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
                    <div className="flex flex-wrap gap-2 justify-end">
                        <Link to="/astro" className="rounded-2xl px-3 py-2 bg-white/90 text-slate-900 font-medium hover:bg-white">
                            ← All photos
                        </Link>
                        <Link to="/" className="rounded-2xl px-3 py-2 bg-white/10 text-slate-100 hover:bg-white/20">
                            Home
                        </Link>
                    </div>
                    <h1 className="mt-3 text-2xl md:text-3xl font-bold text-white">{it.title}</h1>
                </div>

                <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                    <div className="bg-slate-900">
                        <img src={it.img} alt={it.title} className="w-full h-auto" loading="eager" />
                    </div>
                    <div className="p-4">
                        <p className="text-sm text-slate-300">{it.sub}</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
