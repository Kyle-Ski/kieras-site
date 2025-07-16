import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import "../blogPage.css";

interface BlogPost {
  title: string;
  slug: string;
  author?: string;
  mainImage?: {
    url: string;
    alt: string;
  };
  categories?: string[];
  publishedAt: string;
  body: any; // Content for the detailed page, if needed
}

async function fetchBlogPosts(): Promise<BlogPost[]> {
  const query = `*[_type == "post" && !(_id in path('drafts.**')) && !(_deleted == true)] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    "author": author->name,
    "mainImage": {
      "url": mainImage.asset->url,
      "alt": mainImage.alt
    },
    "categories": categories[]->title,
    publishedAt,
    body
  }`;

  const data = await client.fetch(query, {}, { next: { tags: ["blog"] } });
  return data;
}

export default async function BlogPage() {
  const blogPosts = await fetchBlogPosts();

  return (
    <>
      <section className="blog-page">
        <h1 className="blog-title">Blog</h1>
        <p className="blog-subtitle">Latest musings and updates</p>
        <div className="blog-grid">
          {blogPosts.map((post, index) => (
            <div key={index} className="blog-card">
              {post.mainImage?.url && (
                <Image
                  src={post.mainImage.url}
                  alt={post.mainImage.alt || "Blog Image"}
                  width={400}
                  height={300}
                  className="blog-image"
                />
              )}
              <div className="blog-content">
                <h2 className="blog-post-title">{post.title}</h2>
                
                {/* Meta information group */}
                <div className="blog-meta">
                  {post.author && <p className="blog-author">By {post.author}</p>}
                  <p className="blog-date">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Categories on their own line */}
                {post.categories && (
                  <div className="blog-categories">
                    <span>Categories: {post.categories.join(", ")}</span>
                  </div>
                )}

                {/* Button in its own container */}
                <div className="blog-action">
                  <Link href={`/blog/${post.slug}`} className="blog-read-more">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}