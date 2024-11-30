import { NextRequest, NextResponse } from 'next/server';

const secret = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Validate Authorization header
  const authHeader = req.headers.get('Authorization');
  if (!authHeader || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { type, slug, action, deleted } = body;

    if (deleted) {
      // Handle document deletion
      console.log(`Document of type "${type}" with slug "${slug}" was deleted.`);
      return NextResponse.json({ message: `Handled delete for slug: ${slug}` });
    }

    switch (action) {
      case 'create':
        console.log(`New document of type "${type}" created with slug "${slug}".`);
        break;

      case 'update':
        console.log(`Document of type "${type}" updated with slug "${slug}".`);
        break;

      default:
        return NextResponse.json({ message: 'Unknown action' });
    }

    // Revalidate specific paths based on the document type
    switch (type) {
      case 'aboutType':
        await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate?path=/about`, { method: 'POST' });
        break;

      case 'blogPostType':
        if (slug) {
          await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate?path=/blog/${slug}`, { method: 'POST' });
        }
        break;

      default:
        return NextResponse.json({ message: `No revalidation configured for type: ${type}` });
    }

    return NextResponse.json({ message: `Revalidated: ${type} with slug: ${slug}` });
  } catch (error) {
    console.error('Error in webhook handler:', error);
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
}
