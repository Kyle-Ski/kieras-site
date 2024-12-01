import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

const secret = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  let body: any;

  // Parse the request body
  try {
    body = await req.json();
    console.log("Webhook Body:", body);
  } catch (err) {
    console.error("Error parsing request body:", err);
    return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 });
  }

  // Validate Authorization header
  const authHeader = req.headers.get('Authorization');
  if (!authHeader || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { type, slug, action } = body;

    console.log(`Processing revalidation for type: ${type}, slug: ${slug}, action: ${action}`);

    switch (type) {
      case 'about':
        revalidateTag('about');
        console.log('Revalidated about tag');
        break;

      case 'press':
        revalidateTag('press');
        console.log('Revalidated press tag');
        break;

      case 'category':
        revalidateTag('categories');
        console.log('Revalidated categories tag');
        break;

      case 'post':
        // Always revalidate the main blog page
        revalidateTag('blog');
        console.log('Revalidated main blog tag');

        // Handle specific actions for posts
        if (action === 'delete') {
          console.log(`Deleted post: ${slug}. Only main blog page revalidated.`);
        } else if (action === 'create' || action === 'update') {
          if (slug) {
            revalidateTag(`blog:${slug}`);
            console.log(`Revalidated blog post: ${slug}`);
          } else {
            console.warn('No slug provided for blog post revalidation.');
          }
        } else {
          console.warn(`Unhandled action: ${action}`);
        }
        break;

      default:
        console.warn(`Unhandled type: ${type}`);
        return NextResponse.json({ message: `No revalidation configured for type: ${type}` });
    }

    return NextResponse.json({ message: `Revalidated: ${type} with slug: ${slug || 'N/A'}` });
  } catch (error) {
    console.error('Error in webhook handler:', error);
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
}
