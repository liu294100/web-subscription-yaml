import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { stOverrides, proxySources } from '@/lib/schema';
import { eq, and } from 'drizzle-orm';
import { isAuthenticated } from '@/lib/auth';

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const params = await props.params;
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
        return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const result = await db.select().from(stOverrides).where(eq(stOverrides.id, id));
    
    if (result.length === 0) {
      return NextResponse.json({ error: 'Override not found' }, { status: 404 });
    }

    const override = result[0];
    
    // Process name to match conventions
    // 1. Remove emojis
    let cleanName = override.name.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/gu, '');
    // 2. Remove "Override" or "Rule" suffixes (case insensitive)
    cleanName = cleanName.replace(/\s+Override$/i, '').replace(/\s+Rule$/i, '');
    // 3. Trim and clean up spaces
    cleanName = cleanName.trim().replace(/\s+/g, ' ');
    
    // Safe name for keys (remove special chars, keep alphanumeric and Chinese)
    const safeName = cleanName.replace(/[^\w\u4e00-\u9fa5]/g, '');
    
    const yamlName = `${cleanName} Override`;
    const groupName = `🎬 ${safeName}Rule`;
    
    // Format proxies
    let proxiesList = '';
    
    // Check if override has specific proxies
    const hasSpecificProxies = Array.isArray(override.proxies) && override.proxies.length > 0;
    
    if (hasSpecificProxies) {
      // Deduplicate specific proxies
      const uniqueProxies = Array.from(new Set(override.proxies as string[]));
      proxiesList = uniqueProxies.map(p => `  - "${p}"`).join('\n');
    } else {
      // Fallback to enabled global proxy sources
      const sources = await db.select()
        .from(proxySources)
        .where(eq(proxySources.isEnabled, true))
        .orderBy(proxySources.priority, proxySources.createdAt);
        
      const allProxies = new Set<string>();
      
      for (const source of sources) {
        const proxies = source.proxies as unknown as string[]; // Cast to string[]
        if (Array.isArray(proxies)) {
            proxies.forEach(p => {
                if (p && typeof p === 'string') {
                    allProxies.add(p.trim());
                }
            });
        }
      }

      if (allProxies.size > 0) {
        proxiesList = Array.from(allProxies).map(p => `  - "${p}"`).join('\n');
      } else {
        // Fallback if no globals exist? Just leave empty or add a placeholder
        proxiesList = '  - "DIRECT"'; // Safe fallback
      }
    }

    const yamlContent = `name: ${yamlName}
desc: ${override.description || yamlName}
rule-providers:
  ${safeName}:
    type: http
    behavior: classical
    url: ${override.ruleUrl}
    interval: 86400

proxy-groups:
- name: ${groupName}
  type: select
  proxies:
${proxiesList}
  include-all-proxies: true
  # 匹配所有节点，确保像参考配置那样包含各国节点
  filter: .*

rules:
- RULE-SET,${safeName},${groupName}
`;

    // Encode filename for Content-Disposition header
    const encodedFilename = encodeURIComponent(`${safeName}.stoverride`);

    return new NextResponse(yamlContent, {
      headers: {
        'Content-Type': 'text/yaml; charset=utf-8',
        'Content-Disposition': `attachment; filename="${encodedFilename}"; filename*=UTF-8''${encodedFilename}`,
      },
    });

  } catch (error) {
    console.error('Error generating override:', error);
    return NextResponse.json({ error: 'Failed to generate override' }, { status: 500 });
  }
}
