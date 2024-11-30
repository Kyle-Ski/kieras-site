import { NextRequest, NextResponse } from 'next/server';

const secret = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("Webhook Body:", body);

  // Validate Authorization header
  const authHeader = req.headers.get('Authorization');
  if (!authHeader || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { type, slug, action } = body;

    console.log(`Processing ${action} for type: ${type}, slug: ${slug}`);

    switch (type) {
      case 'about':
        await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate?path=/about`, { method: 'POST' });
        break;

      case 'blog':
        if (slug) {
          await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate?path=/blog/${slug}`, { method: 'POST' });
        }
        break;

      case 'press':
        await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate?path=/press`, { method: 'POST' });
        break;

      case 'category':
        await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate?path=/categories`, { method: 'POST' });
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
