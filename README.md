# Pixel Night Sky Site — Stars Only

This is the latest state of your landing page with a pixel-art starfield background (no nebulae/galaxies), built as a minimal **Vite + React + TailwindCSS** app.

## Run locally

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

## Build for production

```bash
npm run build
npm run preview
```

## Notes

- Tailwind is used for styling (the `.text-slate-*` classes, etc.).
- The starfield is drawn on a `<canvas>` with crisp, pixelated stars and subtle twinkle.
- Smooth scrolling respects `prefers-reduced-motion`.
