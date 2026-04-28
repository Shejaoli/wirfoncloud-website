import { Link } from "wouter";
import { useSite } from "@/hooks/useSite";

export default function Footer() {
  const site = useSite();
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          {site.branding?.logoUrl ? (
            <img src={site.branding.logoUrl} alt="WirfonCloud" className="brand-logo footer-logo" />
          ) : (
            <>
              <span className="brand-name">WirfonCloud</span>
              <span className="brand-tagline-light">Let's rule the clouds</span>
            </>
          )}
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/academy">Academy</Link></li>
            <li><Link href="/consultancy">Consultancy</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/about#contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-social">
          <h4>Follow Us</h4>
          <ul className="social-icons">
            {site.social.linkedin && (
              <li>
                <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <i className="fa-brands fa-linkedin-in" />
                </a>
              </li>
            )}
            {site.social.twitter && (
              <li>
                <a href={site.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <i className="fa-brands fa-x-twitter" />
                </a>
              </li>
            )}
            {site.social.facebook && (
              <li>
                <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <i className="fa-brands fa-facebook-f" />
                </a>
              </li>
            )}
            {site.social.youtube && (
              <li>
                <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <i className="fa-brands fa-youtube" />
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-row">
          <span>&copy; {site.footer.copyrightYear} WirfonCloud. All rights reserved.</span>
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
        </div>
      </div>
    </footer>
  );
}
