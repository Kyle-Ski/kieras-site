import { client } from "@/sanity/lib/client";
import Image from "next/image";
import "../pressPage.css";

interface Quote {
  quote: string;
  publication: string;
  link?: string;
  date?: string;
}

interface PressItem {
  title: string;
  summary: string;
  imageUrl?: string;
  quotes: Quote[];
}

async function fetchPressItems(): Promise<PressItem[]> {
    const query = `*[_type == "press"] | order(quotes[0].date desc) {
      title,
      summary,
      "imageUrl": image.asset->url,
      quotes[] {
        quote,
        publication,
        link,
        date
      }
    }`;
  
    const data = await client.fetch(query, {}, { next: { tags: ["press"] } }); // Add tag-based caching
    return data;
  }
  

export default async function PressPage() {
  const pressItems = await fetchPressItems();

  return (
    <section className="press-page">
      <h1 className="press-title">In the Press</h1>
      <div className="press-grid">
        {pressItems.map((item, index) => (
          <div key={index} className="press-card">
            {item.imageUrl && (
                
              <div className="press-image-container">
                <h2 className="press-item-title">{item.title}</h2>
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={150}
                  height={150}
                  className="press-image"
                />
              </div>
            )}
            <div className="press-content">
              
              <p className="press-summary">{item.summary}</p>

              <div className="press-quotes">
                <h3>Quotes</h3>
                <ul>
                  {item.quotes.map((quote, quoteIndex) => (
                    <li key={quoteIndex} className="press-quote-item">
                      <p className="press-quote">"{quote.quote}"</p>
                      <p className="press-publication">— {quote.publication}</p>
                      {quote.date && (
                        <p className="press-date">
                          {new Date(quote.date).toLocaleDateString()}
                        </p>
                      )}
                      {quote.link && (
                        <a
                          href={quote.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="press-link"
                        >
                          Read more
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
