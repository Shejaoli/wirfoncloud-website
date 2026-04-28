import { Link } from "wouter";
import VideoCarousel from "@/components/VideoCarousel";
import TwoColImage from "@/components/TwoColImage";
import { useSite } from "@/hooks/useSite";

export default function Consultancy() {
  const site = useSite();
  const c = site.consultancy;
  return (
    <>
      <section className="section">
        <div className="container two-col">
          <div className="col-image">
            <TwoColImage src={c.image} alt={c.title} fallbackLabel={c.fallbackLabel} />
          </div>
          <div className="col-text">
            <h1>{c.title}</h1>
            <p>{c.text}</p>
            <Link href={c.ctaHref} className="btn btn-primary">{c.ctaLabel}</Link>
          </div>
        </div>
      </section>

      {c.services.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <h2 className="section-title">Our Services</h2>
            <div className="cards-grid services-grid">
              {c.services.map((s, i) => (
                <div key={i} className="card service-card">
                  <div className="service-icon"><i className={`fa-solid ${s.icon}`} /></div>
                  <h4>{s.title}</h4>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {c.testimonials.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="section-title">What Our Clients Say</h2>
            <VideoCarousel slides={c.testimonials} />
          </div>
        </section>
      )}
    </>
  );
}
