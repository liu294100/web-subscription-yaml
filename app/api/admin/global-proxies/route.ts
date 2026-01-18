import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { proxySources } from '@/lib/schema';
import { isAuthenticated } from '@/lib/auth';
import { eq } from 'drizzle-orm';

export async function GET(req: Request) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const sources = await db.select().from(proxySources).orderBy(proxySources.priority, proxySources.createdAt);
    return NextResponse.json(sources);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch proxy sources' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { name, proxies, priority } = await req.json();

    if (!name || !proxies) {
      return NextResponse.json({ error: 'Name and proxies are required' }, { status: 400 });
    }

    const result = await db.insert(proxySources).values({
      name: name.trim(),
      proxies: proxies, // Expecting string[]
      priority: priority !== undefined ? parseInt(priority) : 0,
      isEnabled: true
    }).returning();
    
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to add proxy source' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, name, proxies, priority, isEnabled } = await req.json();

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name.trim();
    if (proxies !== undefined) updateData.proxies = proxies; // Expecting string[]
    if (priority !== undefined) updateData.priority = parseInt(priority);
    if (isEnabled !== undefined) updateData.isEnabled = isEnabled;

    const result = await db.update(proxySources)
      .set(updateData)
      .where(eq(proxySources.id, parseInt(id)))
      .returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update proxy source' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
        await db.delete(proxySources).where(eq(proxySources.id, parseInt(id)));
    } else {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete proxy source' }, { status: 500 });
  }
}
