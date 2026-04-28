import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import {
  adminMe,
  adminLogout,
  adminSaveContent,
  adminResetContent,
  fetchContent,
} from "@/lib/api";
import { DEFAULT_SITE, type SiteContent } from "@/lib/site";
import { useSiteCtx } from "@/hooks/useSite";
import {
  BrandingEditor,
  HeroEditor,
  HomeIntroEditor,
  HomeTestimonialsEditor,
  PartnersEditor,
  HomeCtaEditor,
  AboutEditor,
  AcademyEditor,
  ConsultancyEditor,
  BlogEditor,
  FaqsEditor,
  SocialEditor,
  ContactEditor,
} from "./editors";

type Tab =
  | "branding"
  | "hero"
  | "home"
  | "about"
  | "academy"
  | "consultancy"
  | "blog"
  | "faq"
  | "settings";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "branding", label: "Branding", icon: "fa-palette" },
  { id: "hero", label: "Hero Slides", icon: "fa-images" },
  { id: "home", label: "Home Page", icon: "fa-house" },
  { id: "about", label: "About", icon: "fa-circle-info" },
  { id: "academy", label: "Academy", icon: "fa-graduation-cap" },
  { id: "consultancy", label: "Consultancy", icon: "fa-handshake" },
  { id: "blog", label: "Blog", icon: "fa-newspaper" },
  { id: "faq", label: "FAQ", icon: "fa-circle-question" },
  { id: "settings", label: "Settings", icon: "fa-gear" },
];

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const { reload } = useSiteCtx();
  const [authChecked, setAuthChecked] = useState(false);
  const [data, setData] = useState<SiteContent | null>(null);
  const [tab, setTab] = useState<Tab>("branding");
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ kind: "success" | "error"; message: string } | null>(null);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    void (async () => {
      const ok = await adminMe();
      if (!ok) {
        navigate("/admin/login");
        return;
      }
      const content = await fetchContent();
      setData(content || DEFAULT_SITE);
      setAuthChecked(true);
    })();
  }, [navigate]);

  function update(next: SiteContent) {
    setData(next);
    setDirty(true);
    setStatus(null);
  }

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    setStatus(null);
    const res = await adminSaveContent(data);
    setSaving(false);
    if (res.success) {
      setDirty(false);
      setStatus({ kind: "success", message: "Changes saved." });
      void reload();
    } else {
      setStatus({ kind: "error", message: res.error || "Save failed" });
    }
  }

  async function handleReset() {
    if (!confirm("Reset all content to defaults? This cannot be undone.")) return;
    setSaving(true);
    setStatus(null);
    const res = await adminResetContent();
    setSaving(false);
    if (res.success && res.data) {
      setData(res.data);
      setDirty(false);
      setStatus({ kind: "success", message: "Content reset to defaults." });
      void reload();
    } else {
      setStatus({ kind: "error", message: res.error || "Reset failed" });
    }
  }

  async function handleLogout() {
    await adminLogout();
    navigate("/admin/login");
  }

  if (!authChecked || !data) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner" />
        <p>Loading admin…</p>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <button
          className="admin-nav-toggle"
          aria-label="Toggle menu"
          onClick={() => setNavOpen((o) => !o)}
        >
          <i className="fa-solid fa-bars" />
        </button>
        <div className="admin-brand">
          <span className="brand-name">WirfonCloud</span>
          <span className="brand-tagline">Admin</span>
        </div>
        <div className="admin-topbar-actions">
          {status && (
            <span className={"admin-toast " + status.kind}>{status.message}</span>
          )}
          {dirty && <span className="admin-dirty">Unsaved changes</span>}
          <a href="/" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
            <i className="fa-solid fa-arrow-up-right-from-square" /> View site
          </a>
          <button onClick={handleSave} className="btn btn-primary btn-sm" disabled={!dirty || saving}>
            {saving ? "Saving…" : "Save changes"}
          </button>
          <button onClick={handleLogout} className="btn btn-outline btn-sm" title="Sign out">
            <i className="fa-solid fa-right-from-bracket" />
          </button>
        </div>
      </header>

      <div className="admin-body">
        <aside className={"admin-sidebar" + (navOpen ? " open" : "")}>
          <nav>
            <ul>
              {TABS.map((t) => (
                <li key={t.id}>
                  <button
                    className={t.id === tab ? "active" : ""}
                    onClick={() => {
                      setTab(t.id);
                      setNavOpen(false);
                    }}
                  >
                    <i className={`fa-solid ${t.icon}`} />
                    <span>{t.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="admin-main">
          {tab === "branding" && (
            <BrandingEditor
              branding={data.branding}
              onChange={(branding) => update({ ...data, branding })}
            />
          )}
          {tab === "hero" && (
            <HeroEditor
              hero={data.hero}
              onChange={(hero) => update({ ...data, hero })}
            />
          )}
          {tab === "home" && (
            <>
              <HomeIntroEditor
                items={data.homeIntro}
                onChange={(homeIntro) => update({ ...data, homeIntro })}
              />
              <HomeTestimonialsEditor
                items={data.homeTestimonials}
                onChange={(homeTestimonials) => update({ ...data, homeTestimonials })}
              />
              <PartnersEditor
                items={data.partners}
                onChange={(partners) => update({ ...data, partners })}
              />
              <HomeCtaEditor
                cta={data.homeCta}
                onChange={(homeCta) => update({ ...data, homeCta })}
              />
            </>
          )}
          {tab === "about" && (
            <AboutEditor
              about={data.about}
              onChange={(about) => update({ ...data, about })}
            />
          )}
          {tab === "academy" && (
            <AcademyEditor
              academy={data.academy}
              onChange={(academy) => update({ ...data, academy })}
            />
          )}
          {tab === "consultancy" && (
            <ConsultancyEditor
              consultancy={data.consultancy}
              onChange={(consultancy) => update({ ...data, consultancy })}
            />
          )}
          {tab === "blog" && (
            <BlogEditor
              blog={data.blog}
              onChange={(blog) => update({ ...data, blog })}
            />
          )}
          {tab === "faq" && (
            <FaqsEditor
              items={data.faqs}
              onChange={(faqs) => update({ ...data, faqs })}
            />
          )}
          {tab === "settings" && (
            <>
              <SocialEditor
                social={data.social}
                onChange={(social) => update({ ...data, social })}
              />
              <ContactEditor
                contact={data.contact}
                footer={data.footer}
                onChange={(contact, footer) => update({ ...data, contact, footer })}
              />
              <section className="admin-card admin-danger">
                <h3>Reset content</h3>
                <p>Restore every section to the original defaults. Use with caution.</p>
                <button onClick={handleReset} className="btn btn-outline btn-sm" disabled={saving}>
                  Reset to defaults
                </button>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
