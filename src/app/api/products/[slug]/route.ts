import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const db = getDb();
    const p = db.prepare('SELECT * FROM products WHERE slug = ? AND available = 1').get(slug) as Record<string, unknown> | undefined;

    if (!p) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({
      data: {
        id: p.id,
        name: p.name,
        slug: p.slug,
        emoji: p.emoji,
        color: p.color,
        price: p.price_paise,
        comparePrice: p.compare_price_paise,
        stock: p.stock as number,
        categoryTag: p.category_tag,
        stat: p.stat,
        benefit: p.benefit,
        badge: p.badge,
        tagline: p.tagline,
        description: p.description,
        imageUrl: p.image_url,
        available: p.available === 1,
        createdAt: p.created_at,
      },
    });
  } catch (err) {
    console.error('GET /api/products/[slug] error:', err);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}
