import { client } from "@/sanity/lib/client";
import { PortableText, PortableTextReactComponents } from "@portabletext/react";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import "../../blogPost.css"

interface BlogPost {
  title: string;
  mainImage?: {
    url: string;
    alt: string;
  };
  publishedAt: string;
  categories?: string[];
  author?: string;
  body: any;
}

async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    "mainImage": {
      "url": mainImage.asset->url,
      "alt": mainImage.alt
    },
    publishedAt,
    "categories": categories[]->title,
    "author": author->name,
    body
  }`;

  const data = await client.fetch(query, { slug });
  return data || null;
}

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source).url();
}

const portableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }: { value: any }) => (
      <div className="blog-image">
        <Image
          src={urlFor(value)}
          alt={value.alt || "Blog post image"}
          width={800}
          height={500}
          className="blog-main-image"
          loading="lazy"
        />
      </div>
    ),
  },
  block: {
    blockquote: ({ children }) => <blockquote className="blog-blockquote">{children}</blockquote>,
    normal: ({ children }) => <p className="blog-paragraph">{children}</p>,
    custom: ({ children, value }) => {
      switch (value.style) {
        case "h1":
          return <h1 className="blog-heading blog-heading-1">{children}</h1>;
        case "h2":
          return <h2 className="blog-heading blog-heading-2">{children}</h2>;
        case "h3":
          return <h3 className="blog-heading blog-heading-3">{children}</h3>;
        case "h4":
          return <h4 className="blog-heading blog-heading-4">{children}</h4>;
        default:
          return <p className="blog-paragraph">{children}</p>;
      }
    },
  },
  list: {
    bullet: ({ children }) => <ul className="blog-list blog-list-bullet">{children}</ul>,
    number: ({ children }) => <ol className="blog-list blog-list-number">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="blog-list-item">{children}</li>,
    number: ({ children }) => <li className="blog-list-item">{children}</li>,
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const blogPost = await fetchBlogPost(slug);

  if (!blogPost) {
    return <div>Post not found</div>;
  }

  const { title, mainImage, publishedAt, categories, author, body } = blogPost;

  return (
    <article className="blog-post">
      {/* Blog Title */}
      <header className="blog-post-header">
        <h1 className="blog-post-title">{title}</h1>
        <div className="blog-post-meta">
          <p className="blog-author">By {author || "Unknown Author"}</p>
          <p className="blog-date">{new Date(publishedAt).toLocaleDateString()}</p>
          {categories && <p className="blog-categories">Categories: {categories.join(", ")}</p>}
        </div>
      </header>

      {/* Blog Main Image */}
      {mainImage?.url && (
        <div className="blog-image-container">
          <Image
            src={mainImage.url}
            alt={mainImage.alt || "Blog Image"}
            width={800}
            height={450}
            className="blog-main-image"
          />
        </div>
      )}

      {/* Blog Content */}
      <section className="blog-body">
        <PortableText value={body} components={portableTextComponents} />
      </section>
    </article>
  );
}
