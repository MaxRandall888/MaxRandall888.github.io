import React, { useEffect, useRef } from "react";

// Night-sky pixel canvas background — STARS ONLY (no nebulae/galaxies)
function Starfield() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d", { alpha: true });
    let rafId;

    const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const stars = [];
    const layers = [
      { count: 90, size: 2, speed: 0.2 },
      { count: 140, size: 1, speed: 0.35 },
      { count: 220, size: 1, speed: 0.5 },
    ];

    function initStars(W, H) {
      stars.length = 0;
      layers.forEach((L) => {
        for (let i = 0; i < L.count; i++) {
          stars.push({
            x: Math.floor(Math.random() * W),
            y: Math.floor(Math.random() * H),
            b: Math.random() * 0.6 + 0.4, // base brightness
            t: Math.random() * Math.PI * 2, // twinkle phase
            s: L.size * DPR, // pixel size
            v: L.speed, // layer speed (phase advance only)
          });
        }
      });
    }

    function resize() {
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = Math.floor(w * DPR);
      canvas.height = Math.floor(h * DPR);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.imageSmoothingEnabled = false; // keep it pixel‑sharp
      initStars(canvas.width, canvas.height);
    }

    function draw() {
      const W = canvas.width, H = canvas.height;
      // subtle vertical gradient night sky
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, "#0b1020");
      g.addColorStop(1, "#05070f");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      // twinkling pixel stars
      for (const st of stars) {
        st.t += 0.03 + st.v * 0.002;
        const tw = (Math.sin(st.t) * 0.5 + 0.5) * 0.8 + 0.2; // 0.2..1.0
        const alpha = Math.min(1, Math.max(0.2, st.b * tw));
        ctx.globalAlpha = alpha;
        ctx.fillStyle = "#cfe7ff"; // cold star color
        const s = st.s;
        const x = st.x | 0, y = st.y | 0;
        ctx.fillRect(x, y, s, s);
        if (s >= 2) {
          ctx.fillRect(x - s, y, s, s);
          ctx.fillRect(x + s, y, s, s);
          ctx.fillRect(x, y - s, s, s);
          ctx.fillRect(x, y + s, s, s);
        }
      }
      ctx.globalAlpha = 1;

      rafId = requestAnimationFrame(draw);
    }

    function onVisibility() {
      if (document.hidden) cancelAnimationFrame(rafId);
      else rafId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="fixed inset-0 -z-10 block [image-rendering:pixelated]"
    />
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-24 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-100 drop-shadow mb-6">
          {title}
        </h2>
        <div className="text-slate-200/90 leading-relaxed">{children}</div>
      </div>
    </section>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-black/40 border-b border-white/10">
      <nav className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <a href="#home" className="font-bold text-slate-100 tracking-tight">Max Randall</a>
        <ul className="flex items-center gap-3 md:gap-6 text-sm">
          {[
            ["Bio", "bio"],
            ["Astro Photos", "astro"],
            ["Projects", "projects"],
            ["Résumé", "resume"],
          ].map(([label, id]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="text-slate-200/90 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 rounded px-1"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="pt-20 md:pt-28 pb-16">
      <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-[1.1fr,0.9fr] gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-sm">
            Hello world!
          </h1>
          <p className="mt-4 text-slate-200/90 text-lg max-w-prose">
            I’m Max — a CS/Physics student building interactive simulations and capturing the cosmos. Explore my astrophotography, technical projects, and résumé below.
          </p>
          {/* Buttons intentionally removed earlier; leaving unchanged */}
        </div>
        <div className="justify-self-center md:justify-self-end">
          {/* Pixelated avatar placeholder */}
          <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-3xl overflow-hidden shadow-[0_0_0_2px_rgba(255,255,255,0.12)]">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-400/20 via-transparent to-fuchsia-500/20" />
            <div className="absolute inset-2 grid grid-cols-8 grid-rows-8 gap-[2px] [image-rendering:pixelated]">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="bg-white/10" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AstroGrid() {
  const items = [
    { title: "Andromeda (M31)", sub: "Wide‑field mosaic", href: "#" },
    { title: "Crescent Nebula", sub: "Ha‑OIII bi‑color", href: "#" },
    { title: "Pinwheel (M101)", sub: "RGB + drizzle", href: "#" },
    { title: "Bode’s Pair", sub: "M81/M82", href: "#" },
    { title: "Triangulum (M33)", sub: "RGB", href: "#" },
    { title: "Veil Complex", sub: "Narrowband", href: "#" },
  ];
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((it, i) => (
        <a
          key={i}
          href={it.href}
          className="group rounded-2xl border border-white/10 overflow-hidden bg-white/5 hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
          aria-label={`${it.title} — ${it.sub}`}
        >
          <div className="aspect-[4/3] w-full bg-gradient-to-tr from-slate-800 via-slate-900 to-black grid place-items-center">
            <span className="text-xs text-slate-300">image placeholder</span>
          </div>
          <div className="p-3">
            <h3 className="text-sm font-semibold text-white">{it.title}</h3>
            <p className="text-xs text-slate-300">{it.sub}</p>
          </div>
        </a>
      ))}
    </div>
  );
}

function ProjectsGrid() {
  const projects = [
    {
      name: "GPU‑Accelerated N‑Body (Barnes–Hut)",
      desc: "Array quadtree + Morton codes with interactive viz.",
      href: "#",
      tags: ["CUDA/NumPy", "Physics"],
    },
    {
      name: "Fiber‑Optic Polarimetric Sensor",
      desc: "Calibration tooling and sensitivity visualization.",
      href: "#",
      tags: ["Photonics", "Python"],
    },
    {
      name: "Lattice Boltzmann Vortex Shedding",
      desc: "2D LBM with tunable BCs and live plots.",
      href: "#",
      tags: ["Fluids", "Python"],
    },
    {
      name: "Quantum Mechanics Plot Pack",
      desc: "Interactive eigenstates & potential wells.",
      href: "#",
      tags: ["Numerics", "Plotting"],
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {projects.map((p, i) => (
        <a
          key={i}
          href={p.href}
          className="group rounded-2xl border border-white/10 overflow-hidden bg-white/5 hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
          aria-label={`${p.name} — ${p.desc}`}
        >
          <div className="p-4">
            <h3 className="text-base font-semibold text-white">{p.name}</h3>
            <p className="mt-1 text-sm text-slate-300">{p.desc}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="text-[10px] uppercase tracking-wide bg-white/10 text-slate-200 rounded px-2 py-1">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

export default function LandingPage() {
  useEffect(() => {
    // Respect reduced motion
    const root = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    root.style.setProperty('--animSpeed', reduce ? '0s' : '400ms');
  }, []);

  return (
    <div className="min-h-screen text-slate-200 selection:bg-sky-300/40 selection:text-slate-900">
      <Starfield />
      <Nav />
      <main>
        <Hero />

        <Section id="bio" title="Bio">
          <p>
            I’m <strong>Max Randall</strong>, a Computer Science & Physics student at Chapman University. I build scientific simulations, tinker with GPUs, and spend clear nights capturing deep‑sky objects. I love turning complex ideas into interactive visuals that are fun to explore.
          </p>
          <ul className="mt-4 grid md:grid-cols-3 gap-3 text-sm">
            <li className="rounded-xl bg-white/5 border border-white/10 p-3">CS + Physics • Chapman University</li>
            <li className="rounded-xl bg-white/5 border border-white/10 p-3">Interests: photonics, fluids, cosmology</li>
            <li className="rounded-xl bg-white/5 border border-white/10 p-3">Tools: Python, C/CUDA, JS/TS, ROOT</li>
          </ul>
        </Section>

        <Section id="astro" title="Astro Photos">
          <AstroGrid />
          <p className="mt-4 text-sm text-slate-300">
            Want full‑res images, acquisition details, and processing notes? Click any card.
          </p>
        </Section>

        <Section id="projects" title="Projects">
          <ProjectsGrid />
        </Section>

        <Section id="resume" title="Résumé">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6">
            <p className="text-sm">
              Download a concise, one‑page résumé (PDF) or view it online.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href="#" className="inline-flex items-center rounded-2xl px-4 py-2 bg-white/90 text-slate-900 font-medium hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                Download PDF
              </a>
              <a href="#" className="inline-flex items-center rounded-2xl px-4 py-2 bg-sky-300/90 text-slate-950 font-medium hover:bg-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300">
                View Online
              </a>
            </div>
          </div>
        </Section>
      </main>

      <footer className="py-10 border-t border-white/10 bg-black/40 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} Max Randall. All rights reserved.</p>
          <div className="flex gap-4 text-sm">
            <a href="#" className="hover:text-white">GitHub</a>
            <a href="#" className="hover:text-white">LinkedIn</a>
            <a href="#" className="hover:text-white">Email</a>
          </div>
        </div>
      </footer>

      {/* Global a11y & UX helpers */}
      <style>{`
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
      `}</style>
    </div>
  );
}
