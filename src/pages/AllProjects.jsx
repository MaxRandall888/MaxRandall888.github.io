import React from "react";
import { Link } from "react-router-dom";

const PROJECTS = [
  { id: "nbody",        name: "GPU-Accelerated N-Body (Barnes–Hut)", desc: "Array quadtree + Morton codes with interactive viz.", tags: ["CUDA/NumPy","Physics"] },
  { id: "polarimetric", name: "Fiber-Optic Polarimetric Sensor",      desc: "Calibration tooling and sensitivity visualization.", tags: ["Photonics","Python"] },
  { id: "lbm",          name: "Lattice Boltzmann Vortex Shedding",    desc: "2D LBM with tunable BCs and live plots.",           tags: ["Fluids","Python"] },
  { id: "qmplot",       name: "Quantum Mechanics Plot Pack",          desc: "Interactive eigenstates & potential wells.",        tags: ["Numerics","Plotting"] },
];

export default function AllProjects() {
  return (
    <main className="py-12 min-h-screen bg-black text-slate-200">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Projects</h1>
          <Link
            to="/"
            className="rounded-2xl px-3 py-2 bg-white/90 text-slate-900 font-medium hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            ← Back to home
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {PROJECTS.map((p) => (
            <Link
              key={p.id}
              to={`/projects/${p.id}`}
              className="rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors p-4"
            >
              <h3 className="text-base font-semibold text-white">{p.name}</h3>
              <p className="mt-1 text-sm text-slate-300">{p.desc}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="text-[10px] uppercase tracking-wide bg-white/10 text-slate-200 rounded px-2 py-1">
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
