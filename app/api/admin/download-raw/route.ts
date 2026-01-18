import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { clashYamls } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { isAuthenticated } from '@/lib/auth';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const pwd = searchParams.get('pwd');

  // Manual auth check for download link (query param)
  if (!isAuthenticated(req) && pwd !== process.env.PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    const result = await db.select().from(clashYamls).where(eq(clashYamls.id, parseInt(id)));
    
    if (result.length === 0) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const file = result[0];
    
    return new NextResponse(file.content, {
      headers: {
        'Content-Type': 'text/yaml; charset=utf-8',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(file.filename)}"`,
      },
    });

  } catch (error) {
    console.error('Download raw error:', error);
    return NextResponse.json({ error: 'Failed to download file' }, { status: 500 });
  }
}
