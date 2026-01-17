import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { stOverrides } from '@/lib/schema';
import { isAuthenticated } from '@/lib/auth';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, description, ruleUrl, proxies } = body;

    if (!name || !ruleUrl || !proxies) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await db.insert(stOverrides).values({
      name,
      description,
      ruleUrl,
      proxies,
    }).returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error creating override:', error);
    return NextResponse.json({ error: 'Failed to create override' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, name, description, ruleUrl, proxies } = body;

    if (!id || !name || !ruleUrl || !proxies) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await db.update(stOverrides).set({
      name,
      description,
      ruleUrl,
      proxies,
    }).where(eq(stOverrides.id, parseInt(id))).returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error updating override:', error);
    return NextResponse.json({ error: 'Failed to update override' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const overrides = await db.select().from(stOverrides).orderBy(stOverrides.createdAt);
    return NextResponse.json(overrides);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch overrides' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');

      if (!id) {
          return NextResponse.json({ error: 'ID is required' }, { status: 400 });
      }

      await db.delete(stOverrides).where(eq(stOverrides.id, parseInt(id)));
      return NextResponse.json({ success: true });
  } catch (error) {
      return NextResponse.json({ error: 'Failed to delete override' }, { status: 500 });
  }
}
