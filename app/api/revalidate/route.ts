import { NextRequest, NextResponse } from 'next/server';

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

    console.log(`Processing ${action} for type: ${type}, slug: ${slug}`);

    // Helper function to revalidate paths
    async function revalidatePath(path: string) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate?path=${path}`, { method: 'POST' });
        if (!res.ok) {
          throw new Error(`Failed to revalidate path: ${path}, status: ${res.status}`);
        }
        console.log(`Successfully revalidated path: ${path}`);
      } catch (err) {
        console.error(`Error during revalidation for path ${path}:`, err);
      }
    }

    // Revalidation logic
    switch (type) {
      case 'about':
        await revalidatePath('/about');
        break;

      case 'blog':
        if (slug) {
          await revalidatePath(`/blog/${slug}`);
        }
        break;

      case 'press':
        await revalidatePath('/press');
        break;

      case 'category':
        await revalidatePath('/categories');
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
