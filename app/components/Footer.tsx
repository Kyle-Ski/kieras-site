import Link from "next/link";
import "../footerPage.css";
import { FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <p className="footer-copyright font-name">© Kiera Stewart {new Date().getFullYear()}</p>
        <div className="footer-quick-links">
          <h3 className="font-header">Quick Links</h3>
          <ul>
            <li>

              <Link href="/about" className="font-body">About</Link>
            </li>
            <li>
              <Link href="/press" className="font-body">Press</Link>
            </li>
            <li>
              <Link href="/blog" className="font-body">Blog</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-connect">
        <h3 id="follow-me" className="font-header">Follow Me</h3>
        <div className="footer-socials">
          <Link
            href="https://instagram.com/kierastew"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="font-body"
          >
            <FaInstagram />
          </Link>
          <Link
            href="mailto:kiera@kierastewart.com"
            aria-label="Email"
            className="font-body"
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