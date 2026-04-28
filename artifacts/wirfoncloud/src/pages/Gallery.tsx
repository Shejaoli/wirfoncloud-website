import { useEffect, useState } from "react";

import img1 from "@assets/IMG_20230625_132855_776_1777412731016.jpg";
import img2 from "@assets/IMG_20230625_133031_342_1777412731017.jpg";
import img3 from "@assets/letsrule2021-09-01_14-54-16_1777412731017.jpg";
import img4 from "@assets/Members29_00-08-33_1777412731018.jpg";
import img5 from "@assets/Photo_from_Mfoome_Bahti_-Ban(1)_1777412731018.jpg";
import img6 from "@assets/Photo_from_Mfoome_Bahti_-Ban(2)_1777412731019.jpg";
import img7 from "@assets/Photo_from_Mfoome_Bahti_-Ban(3)_1777412731019.jpg";
import img8 from "@assets/Photo_from_Mfoome_Bahti_-Ban(4)_1777412731020.jpg";
import img9 from "@assets/Photo_from_Mfoome_Bahti_-Ban(5)_1777412731021.jpg";
import img10 from "@assets/Photo_from_Mfoome_Bahti_-Ban(6)_1777412731021.jpg";
import img11 from "@assets/Photo_from_Mfoome_Bahti_-Ban(7)_1777412731022.jpg";
import img12 from "@assets/Photo_from_Mfoome_Bahti_-Ban(8)_1777412731022.jpg";
import img13 from "@assets/Photo_from_Mfoome_Bahti_-Ban(9)_1777412731023.jpg";
import img14 from "@assets/Photo_from_Mfoome_Bahti_-Ban(10)_1777412731023.jpg";
import img15 from "@assets/Photo_from_Mfoome_Bahti_-Ban_1777412731024.jpg";

type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
};

const photos: GalleryItem[] = [
  { src: img3, alt: "WirfonCloud — Let's rule the clouds banner", caption: "Let's rule the clouds" },
  { src: img2, alt: "WirfonCloud branded session", caption: "Hands-on with the cloud" },
  { src: img7, alt: "Speaker pointing at WirfonCloud banner", caption: "The future is bright" },
  { src: img1, alt: "Group photo of WirfonCloud Summit attendees", caption: "Brussels Summit — Group Photo" },
  { src: img4, alt: "WirfonCloud Summit attendees", caption: "Community in person" },
  { src: img5, alt: "Speaker addressing attendees", caption: "Keynote moments" },
  { src: img6, alt: "Attendees in a working session", caption: "Hands-on workshop" },
  { src: img8, alt: "Summit room before sessions", caption: "Ready for the Summit" },
  { src: img9, alt: "Interactive session with whiteboard", caption: "Interactive learning" },
  { src: img10, alt: "Classroom view of the Summit", caption: "Full house in Brussels" },
  { src: img11, alt: "Attendee at Wirfon Cloud Summit Brussels 2021", caption: "Wirfon Cloud Summit — Brussels 2021" },
  { src: img12, alt: "Attendee taking notes", caption: "Sharing knowledge" },
  { src: img13, alt: "Working session at the Summit", caption: "Collaborating in person" },
  { src: img14, alt: "Attendees networking", caption: "Networking & community" },
  { src: img15, alt: "Conversations between sessions", caption: "Building lasting connections" },
];

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i === null ? null : (i + 1) % photos.length));
      if (e.key === "ArrowLeft") setActive((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  const current = active !== null ? photos[active] : null;

  return (
    <>
      <section
        className="page-banner"
        style={{ background: "linear-gradient(135deg, #0199ef 0%, #005fa3 100%)" }}
      >
        <div className="container">
          <h1>WirfonCloud in pictures</h1>
          <p>
            Highlights from our first in-person Summit in Brussels (August 2021), our community
            events and the moments that bring our cloud journey to life.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="gallery-grid">
            {photos.map((p, i) => (
              <button
                key={p.src}
                type="button"
                className="gallery-tile"
                onClick={() => setActive(i)}
                aria-label={`Open image: ${p.caption}`}
              >
                <img src={p.src} alt={p.alt} loading="lazy" />
                <span className="gallery-caption">{p.caption}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {current && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="lightbox-close"
            aria-label="Close"
            onClick={(e) => {
              e.stopPropagation();
              setActive(null);
            }}
          >
            <i className="fa-solid fa-xmark" />
          </button>
          <button
            type="button"
            className="lightbox-nav lightbox-prev"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              setActive((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
            }}
          >
            <i className="fa-solid fa-chevron-left" />
          </button>
          <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
            <img src={current.src} alt={current.alt} />
            <figcaption>{current.caption}</figcaption>
          </figure>
          <button
            type="button"
            className="lightbox-nav lightbox-next"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              setActive((i) => (i === null ? null : (i + 1) % photos.length));
            }}
          >
            <i className="fa-solid fa-chevron-right" />
          </button>
        </div>
      )}
    </>
  );
}
