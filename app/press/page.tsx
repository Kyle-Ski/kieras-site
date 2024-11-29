import { client } from "@/sanity/lib/client";
import Image from "next/image";
import "../pressPage.css";

interface PressItem {
  title: string;
  publication: string;
  link: string;
  date: string;
  summary: string;
  imageUrl?: string;
}

async function fetchPressItems(): Promise<PressItem[]> {
  const query = `*[_type == "press"] | order(date desc) {
    title,
    publication,
    link,
    date,
    summary,
    "imageUrl": image.asset->url
  }`;

  const data = await client.fetch(query);
  return data;
}

export const revalidate = 3600; // Revalidate the page every hour (3600 seconds)

export default async function PressPage() {
  const pressItems = await fetchPressItems();

  return (
    <section className="press-page">
      <h1 className="press-title">In the Press</h1>
      <div className="press-grid">
        {pressItems.map((item: PressItem, index: number) => (
          <div key={index} className="press-card">
            {item.imageUrl && (
              <div className="press-image-container">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={150} // Smaller image width
                  height={150} // Smaller image height
                  className="press-image"
                />
              </div>
            )}
            <div className="press-content">
              <h2 className="press-item-title">{item.title}</h2>
              <p className="press-publication">— {item.publication}</p>
              <p className="press-date">
                {new Date(item.date).toLocaleDateString()}
              </p>
              <p className="press-summary">{item.summary}</p>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="press-link"
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
