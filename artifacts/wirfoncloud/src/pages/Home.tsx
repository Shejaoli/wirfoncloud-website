import { Link } from "wouter";
import HeroSlider from "@/components/HeroSlider";
import VideoCarousel from "@/components/VideoCarousel";
import TwoColImage from "@/components/TwoColImage";
import { useSite } from "@/hooks/useSite";

export default function Home() {
  const site = useSite();
  return (
    <>
      <HeroSlider />

      {site.homeIntro.map((intro, i) => {
        const sectionClass = "section" + (i % 2 === 1 ? " section-alt" : "");
        return (
          <section key={i} className={sectionClass}>
            <div className={"container two-col" + (intro.reverse ? " reverse" : "")}>
              {intro.reverse ? (
                <>
                  <div className="col-image">
                    <TwoColImage src={intro.image} alt={intro.title} fallbackLabel={intro.fallbackLabel} />
                  </div>
                  <div className="col-text">
                    <h2>{intro.title}</h2>
                    <p>{intro.text}</p>
                    <Link href={intro.ctaHref} className="btn btn-primary">{intro.ctaLabel}</Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-text">
                    <h2>{intro.title}</h2>
                    <p>{intro.text}</p>
                    <Link href={intro.ctaHref} className="btn btn-primary">{intro.ctaLabel}</Link>
                  </div>
                  <div className="col-image">
                    <TwoColImage src={intro.image} alt={intro.title} fallbackLabel={intro.fallbackLabel} />
                  </div>
                </>
              )}
            </div>
          </section>
        );
      })}

      {site.homeTestimonials.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="section-title">What Our Clients Say</h2>
            <VideoCarousel slides={site.homeTestimonials} />
          </div>
        </section>
      )}

      {site.partners.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <h2 className="section-title">Our Partners</h2>
            {/* LINKS MANAGED VIA ADMIN PANEL */}
            <div className="partners-row">
              {site.partners.map((p, i) => (
                <a
                  key={i}
                  href={p.href || "#"}
                  className="partner"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {p.logo ? (
                    <img src={p.logo} alt={p.name} className="partner-logo-image" />
                  ) : (
                    <div className="partner-logo">{p.name}</div>
                  )}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section cta-section">
        <div className="container text-center">
          <h2>{site.homeCta.title}</h2>
          <p>{site.homeCta.text}</p>
          <div className="cta-buttons">
            <a href={site.homeCta.primaryHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              {site.homeCta.primaryLabel}
            </a>
            <a href={site.homeCta.secondaryHref} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              {site.homeCta.secondaryLabel}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
