import { useParams, Link } from "react-router-dom";

const PROJECTS = {
  nbody: {
    name: "GPU-Accelerated N-Body (Barnes–Hut)",
    desc: "Array quadtree + Morton codes with interactive visualization. Discuss numerical accuracy, θ parameter, perf vs O(N²), and memory profile.",
    tags: ["CUDA/NumPy", "Physics"],
  },
  polarimetric: {
    name: "Fiber-Optic Polarimetric Sensor",
    desc: "Calibration tooling and sensitivity visualization. Include calibration curve, repeatability, and sources of error.",
    tags: ["Photonics", "Python"],
  },
  lbm: {
    name: "Lattice Boltzmann Vortex Shedding",
    desc: "2D LBM with tunable BCs and live plots. Compare Strouhal vs Reynolds to canonical benchmarks.",
    tags: ["Fluids", "Python"],
  },
  qmplot: {
    name: "Quantum Mechanics Plot Pack",
    desc: "Interactive eigenstates & potential wells. Show how to extend, limitations, and ablations.",
    tags: ["Numerics", "Plotting"],
  },
};

export default function ProjectDetail() {
  const { id } = useParams();
  const p = PROJECTS[id];

  if (!p) {
    return (
      <main className="min-h-screen bg-black text-slate-200 p-6 grid place-items-center">
        <div className="text-center">
          <p className="mb-4">Project not found.</p>
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
            <Link to="/projects" className="rounded-2xl px-3 py-2 bg-white/90 text-slate-900 font-medium hover:bg-white">
              ← All projects
            </Link>
            <Link to="/" className="rounded-2xl px-3 py-2 bg-white/10 text-slate-100 hover:bg-white/20">
              Home
            </Link>
          </div>
          {/* Row 2: title (full width) */}
          <h1 className="mt-3 text-2xl md:text-3xl font-bold text-white">
            {p.name}
          </h1>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6">
          <p className="text-sm text-slate-300">{p.desc}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span key={t} className="text-[10px] uppercase tracking-wide bg-white/10 text-slate-200 rounded px-2 py-1">
                {t}
              </span>
            ))}
          </div>
          {/* Add repo/demo links, benchmarks, figures as needed */}
        </div>
      </div>
    </main>
  );
}
