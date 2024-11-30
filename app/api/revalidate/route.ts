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
    const { type, slug } = body;

    console.log(`Processing revalidation for type: ${type}, slug: ${slug}`);

    // Tag-based revalidation
    switch (type) {
      case 'about':
        revalidateTag('about');
        console.log('Revalidated about tag');
        break;

      case 'blog':
        if (slug) {
          revalidateTag(`blog:${slug}`);
          console.log(`Revalidated blog tag: ${slug}`);
        } else {
          console.warn('No slug provided for blog revalidation.');
        }
        break;

      case 'press':
        revalidateTag('press');
        console.log('Revalidated press tag');
        break;

      case 'category':
        revalidateTag('categories');
        console.log('Revalidated categories tag');
        break;

      default:
        console.log(`No revalidation configured for type: ${type}`);
        return NextResponse.json({ message: `No revalidation configured for type: ${type}` });
    }

    return NextResponse.json({ message: `Revalidated: ${type} with slug: ${slug}` });
  } catch (error) {
    console.error('Error in webhook handler:', error);
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
}
