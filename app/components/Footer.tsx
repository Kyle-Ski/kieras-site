import Link from "next/link";
import "../footerPage.css";
import { FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <p className="footer-copyright">© Kiera Stewart {new Date().getFullYear()}</p>
        <div className="footer-quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/press">Press</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-connect">
        <h3 id="follow-me">Follow Me</h3>
        <div className="footer-socials">
          <Link
            href="https://instagram.com/kierastew"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </Link>
          <Link
            href="mailto:kiera@kierastewart.com"
            aria-label="Email"
          >
            <span className="social-with-text">
              <MdEmail />
              <span className="social-text">kiera@kierastewart.com</span>
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}