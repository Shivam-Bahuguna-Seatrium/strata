'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '@/lib/types';
import { formatINR } from '@/lib/utils';
import { useCartStore } from '@/store/cart';
import Link from 'next/link';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    fetch(`/api/products/${slug}`)
      .then((r) => r.json())
      .then((res) => {
        if (res.error) router.push('/products');
        else setProduct(res.data);
      })
      .catch(() => router.push('/products'))
      .finally(() => setLoading(false));
  }, [slug, router]);

  const handleAdd = () => {
    if (!product) return;
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      emoji: product.emoji,
      color: product.color,
      price: product.price,
      imageUrl: product.imageUrl,
    }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (loading) {
    return (
      <section className="min-h-screen px-4 pt-10 pb-24 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="h-[400px] rounded-3xl bg-white/40 animate-pulse" />
            <div className="space-y-4">
              <div className="h-8 w-40 rounded-xl bg-white/40 animate-pulse" />
              <div className="h-12 w-64 rounded-xl bg-white/40 animate-pulse" />
              <div className="h-20 w-full rounded-xl bg-white/40 animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!product) return null;

  const savings = product.comparePrice - product.price;

  return (
    <section className="min-h-screen px-4 pt-8 pb-24 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-6xl mb-6">
        <nav className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-blue-500 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-blue-500 transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-slate-600 font-medium">{product.name}</span>
        </nav>
      </div>

      <div className="mx-auto max-w-6xl grid gap-8 lg:gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
        {/* Left — Product image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative flex items-center justify-center rounded-3xl border border-white/50 bg-white/40 backdrop-blur-sm p-8 min-h-[380px] lg:min-h-[480px]"
        >
          <div className="absolute inset-0 rounded-3xl" style={{ background: `radial-gradient(circle at center, ${product.color}12 0%, transparent 70%)` }} />

          <motion.img
            src={product.imageUrl}
            alt={product.name}
            className="relative z-10 h-[280px] lg:h-[360px] w-auto object-contain"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {product.badge && (
            <span className="absolute top-5 left-5 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white"
              style={{ background: product.color }}>
              {product.badge}
            </span>
          )}
        </motion.div>

        {/* Right — Product info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-5"
        >
          {/* Name */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{product.emoji}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                style={{ color: product.color, background: `${product.color}15` }}>
                {product.categoryTag}
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-black text-slate-800">{product.name}</h1>
            <p className="mt-1 text-sm text-slate-500 italic">{product.tagline}</p>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-black text-slate-800">{formatINR(product.price)}</span>
            {product.comparePrice > product.price && (
              <>
                <span className="text-lg text-slate-400 line-through">{formatINR(product.comparePrice)}</span>
                <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-green-50 text-green-600 border border-green-200">
                  Save {formatINR(savings)}
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-slate-600 leading-relaxed">{product.description}</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Electrolytes', value: product.stat },
              { label: 'Sugar', value: '0g' },
              { label: 'Benefit', value: product.benefit },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-white/60 bg-white/50 p-3 text-center">
                <p className="text-xs font-black text-slate-800">{s.value}</p>
                <p className="text-[9px] uppercase tracking-wider text-slate-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Quantity + Add to cart */}
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center rounded-full border border-slate-200 bg-white/60">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center text-slate-600 hover:text-blue-600 transition-colors text-lg font-bold"
              >−</button>
              <span className="w-10 text-center font-bold text-slate-800">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(10, q + 1))}
                className="w-10 h-10 flex items-center justify-center text-slate-600 hover:text-blue-600 transition-colors text-lg font-bold"
              >+</button>
            </div>

            <motion.button
              onClick={handleAdd}
              disabled={product.stock === 0}
              className="flex-1 flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all disabled:opacity-50"
              style={{ background: product.stock > 0 ? `linear-gradient(135deg, ${product.color}, ${product.color}cc)` : '#94a3b8' }}
              whileHover={product.stock > 0 ? { scale: 1.02 } : undefined}
              whileTap={product.stock > 0 ? { scale: 0.98 } : undefined}
            >
              <AnimatePresence mode="wait">
                {added ? (
                  <motion.span key="added" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    ✓ Added to Cart
                  </motion.span>
                ) : product.stock > 0 ? (
                  <motion.span key="add" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    🛒 Add to Cart — {formatINR(product.price * qty)}
                  </motion.span>
                ) : (
                  <span>Out of Stock</span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Stock */}
          {product.stock > 0 && product.stock <= 20 && (
            <p className="text-xs font-bold text-orange-500 uppercase tracking-wider">
              ⚡ Only {product.stock} left — order soon!
            </p>
          )}

          {/* Shipping */}
          <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-3 text-xs text-blue-700 space-y-1">
            <p className="font-medium">🚚 Flat ₹49 shipping · Free above ₹499</p>
            <p className="text-blue-500">📦 Estimated delivery: 3–5 business days</p>
          </div>

          {/* Trust */}
          <div className="flex flex-wrap gap-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold">
            <span>✓ Zero Sugar</span>
            <span>✓ Vegan</span>
            <span>✓ Secure Payment</span>
            <span>✓ Easy Returns</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
