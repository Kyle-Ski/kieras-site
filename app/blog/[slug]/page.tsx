import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import {
  PortableText,
  PortableTextComponentProps,
  PortableTextReactComponents,
} from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import "../../blogPost.css";

// --- Types ---
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
  slug: string;
}

interface PageProps {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

// --- Fetch Helpers ---
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
    body,
    slug
  }`;

  const data = await client.fetch(query, { slug });
  return data || null;
}

async function fetchBlogNavigation(currentSlug: string, publishedAt: string) {
  const previousQuery = `*[_type == "post" && publishedAt < $publishedAt] | order(publishedAt desc)[0] {
    title,
    "slug": slug.current
  }`;

  const nextQuery = `*[_type == "post" && publishedAt > $publishedAt] | order(publishedAt asc)[0] {
    title,
    "slug": slug.current
  }`;

  const [previousPost, nextPost] = await Promise.all([
    client.fetch(previousQuery, { publishedAt }),
    client.fetch(nextQuery, { publishedAt }),
  ]);

  return { previousPost, nextPost };
}

// --- Image Builder ---
const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source).url();
}

// --- PortableText Components ---
const portableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }: { value: any }) => (
      <div className="blog-image">
        <Image
          src={urlFor(value)}
          alt={value.alt || "Blog post image"}
          width={800}
          height={500}
          className="blog-image-element"
          loading="lazy"
        />
      </div>
    ),
  },
  block: {
    blockquote: ({ children }: PortableTextComponentProps<any>) => (
      <blockquote className="blog-blockquote">{children}</blockquote>
    ),
    normal: ({ children }: PortableTextComponentProps<any>) => (
      <p className="blog-paragraph">{children}</p>
    ),
  },
};

// --- generateMetadata ---
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const blogPost = await fetchBlogPost(params.slug);

  if (!blogPost) {
    return {
      title: "Post Not Found | Kiera Stewart",
      description: "This blog post does not exist or has been removed.",
    };
  }

  // Create a short excerpt for SEO
  const plainBodyText = JSON.stringify(blogPost.body) || "";
  const excerpt = plainBodyText.slice(0, 150).replace(/['"]/g, "");

  return {
    title: `${blogPost.title} | Kiera Stewart`,
    description: excerpt,
    openGraph: {
      title: blogPost.title,
      description: excerpt,
      images: blogPost.mainImage?.url
        ? [blogPost.mainImage.url]
        : ["/og-image.jpeg"], // fallback
      url: `https://www.kierastewart.com/blog/${blogPost.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: blogPost.title,
      description: excerpt,
      images: blogPost.mainImage?.url
        ? [blogPost.mainImage.url]
        : ["/og-image.jpeg"],
    },
  };
}

// --- Page Component ---
export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  // Extract the slug
  const { slug } = params;

  // Fetch this post
  const blogPost = await fetchBlogPost(slug);
  if (!blogPost) {
    return <div>Post not found</div>;
  }

  // Fetch neighboring posts
  const { previousPost, nextPost } = await fetchBlogNavigation(
    blogPost.slug,
    blogPost.publishedAt
  );

  // Render the post
  const { title, mainImage, publishedAt, categories, author, body } = blogPost;

  return (
    <article className="blog-post">
      <header className="blog-post-header">
        <h1 className="blog-post-title">{title}</h1>
        <div className="blog-post-meta">
          <p className="blog-author">By {author || "Unknown Author"}</p>
          <p className="blog-date">
            {new Date(publishedAt).toLocaleDateString()}
          </p>
          {categories && (
            <p className="blog-categories">
              Categories: {categories.join(", ")}
            </p>
          )}
        </div>
      </header>

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

      <section className="blog-body">
        <PortableText value={body} components={portableTextComponents} />
      </section>

      {/* Blog Navigation */}
      <div className="blog-navigation">
        <h3 className="blog-navigation-title">Blog Navigation</h3>
        <div className="blog-navigation-links">
          {nextPost ? (
            <Link href={`/blog/${nextPost.slug}`} title={`Previous Post: ${nextPost.title}`}>
              ← {nextPost.title}
            </Link>
          ) : (
            <Link href="/blog">← Back to Blog</Link>
          )}
          {previousPost ? (
            <Link href={`/blog/${previousPost.slug}`} title={`Next Post: ${previousPost.title}`}>
              {previousPost.title} →
            </Link>
          ) : (
            <Link href="/blog">Back to Blog →</Link>
          )}
        </div>
      </div>
    </article>
  );
}
