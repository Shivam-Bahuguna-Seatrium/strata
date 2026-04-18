import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const db = getDb();
    const products = db
      .prepare('SELECT * FROM products WHERE available = 1 ORDER BY created_at DESC')
      .all() as Record<string, unknown>[];

    const mapped = products.map((p) => ({
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
    }));

    return NextResponse.json({ data: mapped });
  } catch (err) {
    console.error('GET /api/products error:', err);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
