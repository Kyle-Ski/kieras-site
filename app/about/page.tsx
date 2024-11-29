import { client } from "@/sanity/lib/client";
import { PortableText } from "next-sanity";
import "../aboutPage.css";

interface AboutContent {
  title: string;
  body: any[]; // Adjust type based on your Sanity schema
  imageUrl?: string;
}

// Fetch data from Sanity
async function fetchAboutContent(): Promise<AboutContent> {
  const query = `*[_type == "about"][0] {
    title,
    body,
    "imageUrl": image.asset->url
  }`;
  const data = await client.fetch(query);
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
        <div className="about-body">
          <PortableText value={aboutContent.body} />
        </div>
      </div>
    </section>
  );
}
