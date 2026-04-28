import { useState, FormEvent } from "react";
import { useSite } from "@/hooks/useSite";

export default function Blog() {
  const site = useSite();
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.currentTarget.reset();
    setSubscribed(true);
  }

  return (
    <>
      <section className="section newsletter-section">
        <div className="container narrow text-center">
          <h1>{site.blog.title}</h1>
          <p>{site.blog.text}</p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input type="email" name="email" placeholder="your@email.com" required />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
          {subscribed && (
            <div className="form-status success" style={{ maxWidth: 480, margin: "1rem auto 0" }}>
              Thank you for subscribing! We'll be in touch.
            </div>
          )}
        </div>
      </section>

      {site.social.linkedin && (
        <section className="section section-alt">
          <div className="container">
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="linkedin-banner"
            >
              <i className="fa-brands fa-linkedin" />
              <span>Follow us on LinkedIn for the latest updates</span>
              <i className="fa-solid fa-arrow-right" />
            </a>
          </div>
        </section>
      )}

      {site.blog.posts.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="section-title">Latest Posts</h2>
            <div className="cards-grid">
              {site.blog.posts.map((p, i) => (
                <article key={i} className="card blog-card">
                  <img className="blog-thumb" src={p.image} alt={p.title} loading="lazy" />
                  <div className="blog-body">
                    <span className="blog-date">{p.date}</span>
                    <h4>{p.title}</h4>
                    <p>{p.text}</p>
                    <a href="#" className="btn btn-outline btn-sm">Read More</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
