import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { clashYamls } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { isAuthenticated } from '@/lib/auth';

export async function POST(req: Request) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { filename, content } = await req.json();

    if (!filename || !content) {
      return NextResponse.json({ error: 'Filename and content are required' }, { status: 400 });
    }

    // Insert into DB
    const result = await db.insert(clashYamls).values({
      filename,
      content,
    }).returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error uploading clash yaml:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const files = await db.select().from(clashYamls).orderBy(clashYamls.createdAt);
    return NextResponse.json(files);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch files' }, { status: 500 });
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

      await db.delete(clashYamls).where(eq(clashYamls.id, parseInt(id)));
      return NextResponse.json({ success: true });
  } catch (error) {
      return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
  }
}
