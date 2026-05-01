import { useState, FormEvent } from "react";
import { useSite } from "@/hooks/useSite";
import type { BlogPost } from "@/lib/site";

function BlogCard({ p }: { p: BlogPost }) {
  const [expanded, setExpanded] = useState(false);

  const hasBody = !!p.body?.trim();
  const hasLink = !!p.link?.trim();

  return (
    <article className="card blog-card">
      <div className="blog-thumb-wrap">
        {p.image ? (
          <img
            className="blog-thumb"
            src={p.image}
            alt={p.title}
            loading="lazy"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
        ) : (
          <div className="blog-thumb-placeholder">
            <i className="fa-solid fa-newspaper" />
          </div>
        )}
      </div>
      <div className="blog-body">
        {p.date && <span className="blog-date">{p.date}</span>}
        <h4>{p.title}</h4>
        <p>{p.text}</p>

        {expanded && hasBody && (
          <div
            className="blog-full-body"
            dangerouslySetInnerHTML={{ __html: p.body! }}
          />
        )}

        <div className="blog-actions">
          {hasLink && (
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm"
            >
              Read more <i className="fa-solid fa-arrow-up-right-from-square" />
            </a>
          )}
          {!hasLink && hasBody && (
            <button
              className="btn btn-outline btn-sm"
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? (
                <><i className="fa-solid fa-chevron-up" /> Close</>
              ) : (
                <><i className="fa-solid fa-book-open" /> Read more</>
              )}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

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
                <BlogCard key={i} p={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
