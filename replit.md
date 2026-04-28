# WirfonCloud Website

Multi-page marketing site for WirfonCloud — a cloud training and consulting company. Tagline: "Let's rule the clouds." Brand color: `#0199ef`.

## Architecture

This is a pnpm monorepo with two relevant artifacts:

1. **`artifacts/wirfoncloud`** (kind: `web`, preview path: `/`) — the public WirfonCloud website. React + Vite SPA with `wouter` for client-side routing. This is the artifact that gets published.
2. **`artifacts/api-server`** (kind: `api`, preview path: `/api`) — an Express server that exposes:
   - `POST /api/contact` and `POST /api/subscribe` for form handling
   - `GET /api/content` to fetch all editable site content (public)
   - `POST /api/admin/login`, `/admin/logout`, `GET /admin/me` for admin auth (token-based, 24h TTL)
   - `PUT /api/admin/content` and `POST /api/admin/content/reset` for content management (auth-protected)
   - `POST /api/admin/uploads` (auth-protected) for image uploads — accepts raw image bytes via `Content-Type` header, stores file in `data/uploads/`, returns `{ url: "/api/uploads/<filename>" }`. Allowed types: PNG, JPG, WEBP, GIF, SVG; 10 MB max.
   - `GET /api/uploads/:filename` to serve uploaded images
   - Site content is persisted as JSON at `artifacts/api-server/data/site.json` with defaults from `data/site.default.json`. Tokens are stored in-memory (lost on restart).

A third artifact (`artifacts/mockup-sandbox`) is the workspace's design preview server and is not part of the product.

## Pages

- `/` — Home (hero auto-slider, two-col intro sections, testimonial video carousel, partner logos, CTA)
- `/about` — About Us with anchor sections: `#who-we-are`, `#our-mission`, `#our-vision`, `#contact`
- `/academy` — Academy with anchor sections: `#courses`, `#learning-paths`, `#more`
- `/consultancy` — Consultancy services and testimonials
- `/blog` — Newsletter signup + LinkedIn banner + latest posts
- `/gallery` — Photo gallery (Brussels Summit + community events) with click-to-zoom lightbox. Images are imported from `attached_assets/` via the `@assets` Vite alias.
- `/faq` — FAQ accordion
- `/admin/login` — Admin sign-in
- `/admin` — Admin dashboard (auth-protected) for editing all site content

Every page shares the sticky navbar (with hover dropdowns for Academy and About Us), dark navy footer, and a floating WhatsApp call-to-action button.

## Styling

Plain CSS in `artifacts/wirfoncloud/src/index.css`. Custom design system using CSS variables (no Tailwind tokens needed for this site). Inter web font + Font Awesome 6 icons loaded from CDN in `index.html`.

## Brand images

The site references four photos served from `artifacts/wirfoncloud/public/images/`:

- `IMG_20230625_133031_342.jpg` (Academy banner)
- `shutterstock_1405194650.jpg` (Home + Consultancy hero)
- `phoneshutterstock_133514576.jpg` (Home: phone with cloud)
- `002_blk_girl_shutterstock_2030694452.jpg` (About banner)

The user uploads these manually. If a file is missing, the two-column image components fall back to a branded gradient placeholder so the layout never breaks.

## Placeholders to replace

- WhatsApp number — `https://wa.me/` in `WhatsAppFloat.tsx`
- Discord invite — `Academy.tsx` "Join WirfonCloud Community on Discord" link
- Partner logos — `Home.tsx` "Our Partners" row
- YouTube testimonial videos — currently use a placeholder video; swap with real videos from `https://www.youtube.com/@wirfoncloud`
- Blog "Read More" links

## Forms

`/about#contact` and `/blog` POST to `/api/contact` and `/api/subscribe` respectively. The `api-server` artifact serves these endpoints. Both forms render a success or error banner on the page; on failure the user is invited to email `contact@wirfoncloud.com` directly.

## Deployment

Publish the `wirfoncloud` artifact through the publish flow. The static SPA is built by Vite to `artifacts/wirfoncloud/dist/public/`.

## Admin

The site is fully content-managed via `/admin`. Sign in with:

- Email: `admin@wirfon.com`
- Password: `Wirfon-1!2@`

These credentials are hardcoded in `artifacts/api-server/src/lib/auth.ts`. The dashboard has tabs for Hero Slides, Home Page (intro sections, video testimonials, partners, CTA), About, Academy (Fundamentals + Intermediate courses, Learning Paths, "More" CTAs), Consultancy (services + quotes), Blog, FAQ, and Settings (social links, contact info, footer). All content is loaded into the public site via the `SiteProvider` context (`artifacts/wirfoncloud/src/hooks/useSite.tsx`); pages fall back to `DEFAULT_SITE` (in `src/lib/site.ts`) if the API is unreachable.

A "Reset to defaults" button in Settings restores the original content. Inline `**bold**` and `*italic*` markdown is supported in textual fields and rendered via `src/lib/format.tsx`.

All image fields use the `<ImageUpload>` widget (`artifacts/wirfoncloud/src/components/admin/ImageUpload.tsx`) which provides click-to-upload + drag-and-drop. Uploads go to the API server, files live on disk under `artifacts/api-server/data/uploads/`, and the saved URL is `/api/uploads/<random>.<ext>`.

## Workflows

- `artifacts/api-server: WirfonCloud API` — runs the Express API on port 8080.
- `artifacts/wirfoncloud: web` — runs the Vite dev server. This is the workflow that powers the preview pane.
