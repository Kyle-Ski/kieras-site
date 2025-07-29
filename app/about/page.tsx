import { client } from "@/sanity/lib/client";
import { PortableText } from "next-sanity";
import "../aboutPage.css";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

interface AboutContent {
  title: string;
  body: any[]; // Adjust type based on your Sanity schema
  imageUrl?: string;
}

// Fetch data from Sanity with tag-based caching
async function fetchAboutContent(): Promise<AboutContent> {
  const query = `*[_type == "about"][0] {
    title,
    body,
    "imageUrl": image.asset->url
  }`;
  const data = await client.fetch(query, {}, { next: { tags: ["about"] } }); // Add 'about' tag for caching
  return data;
}

export default async function AboutPage() {
  const aboutContent = await fetchAboutContent();

  return (
    <section className="about-page">
      {aboutContent.imageUrl && (
        <div className="about-image-container">
          <img
            src={aboutContent.imageUrl}
            alt="About Image"
            className="about-image"
          />
        </div>
      )}
      <div className="about-content">
        <h1 className="about-title">{aboutContent.title}</h1>
        <div className="about-body text-[#2c3e50] dark:text-[#e2e8f0]">
          <PortableText value={aboutContent.body} />

        </div>
        <div className="about-connect">
          <h2 id="follow-me-about">Get in Contact:</h2>
          <div className="about-socials">
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
              <span className="about-social-with-text">
                <MdEmail />
                <span className="about-social-text">kiera@kierastewart.com</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
