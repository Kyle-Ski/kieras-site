import "../contactPage.css"
import Image from "next/image";

export default function ContactPage() {
  return (
    <section className="contact-page">
      <div className="contact-header">
        <h1>Stay in Touch</h1>
        <p>
          Whether you're interested in having me visit your school or library, need freelance assistance, or just want to say hi, I’d love to hear from you!
        </p>
      </div>
      <div className="contact-content">
        <div className="contact-image">
          <Image
            src="https://images.gr-assets.com/authors/1687898669p8/4429344.jpg" // Replace with the actual image in the public folder
            alt="Kiera Stewart"
            width={250}
            height={250}
            className="contact-photo"
          />
        </div>
        <div className="contact-details">
          <h2>Contact Me</h2>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:kiera@kierastewart.com">kiera@kierastewart.com</a>
          </p>
          <p>
            <strong>Follow Me:</strong>
          </p>
          <ul className="social-links">
            <li>
              <a
                href="https://x.com/kiera_stewart"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter"></i> Twitter
              </a>
            </li>
            <li>
              <a
                href="http://www.facebook.com/kierastewartbooks/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook"></i> Facebook
              </a>
            </li>
          </ul>
          <p>Thank you for visiting!</p>
        </div>
      </div>
    </section>
  );
}