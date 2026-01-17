import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { clashYamls } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { convertClashYaml, getAvailableServices } from '@/lib/clash-converter';
import { isAuthenticated } from '@/lib/auth';

export async function GET(req: Request) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const file = await db.select().from(clashYamls).where(eq(clashYamls.id, parseInt(id)));

    if (file.length === 0) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const content = file[0].content;
    const services = getAvailableServices().map(s => s.key);
    
    // Convert the content
    const converted = convertClashYaml(content, services);

    return new NextResponse(converted, {
      headers: {
        'Content-Type': 'text/yaml; charset=utf-8',
        'Content-Disposition': `attachment; filename="converted-${file[0].filename}"`,
      },
    });

  } catch (error) {
    console.error('Conversion error:', error);
    return NextResponse.json({ error: 'Failed to convert file' }, { status: 500 });
  }
}
