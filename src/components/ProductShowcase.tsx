'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { getActiveFlavors, BRAND } from '@/config/flavors';
import type { Flavor } from '@/config/flavors';

const Product3D = dynamic(() => import('./Product3D'), { ssr: false });

export default function ProductShowcase() {
  const flavors = getActiveFlavors();
  const [selectedProduct, setSelectedProduct] = useState<Flavor>(flavors[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <section id="product" className="relative section-shell underwater-bg wave-divider">
      <div className="section-inner">
          {/* Header */}
          <motion.div className="section-header"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span className="font-label inline-block mb-5 px-4 py-2 rounded-full"
              style={{ color: '#0077FF', background: 'rgba(0,119,255,0.08)', border: '1px solid rgba(0,119,255,0.2)' }}>
              Pick Your Flavor
            </span>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-blue-900 mb-4 md:mb-6 leading-tight">
              {flavors.length} Flavors.<br className="hidden md:block" />
              <span className="gradient-neon">Zero Sugar.</span>
            </h2>
            <p className="font-body text-base md:text-lg text-blue-700/75 max-w-2xl mx-auto px-4">
              Every flavor delivers the same electrolyte science. Choose your taste, not your compromise.
            </p>
          </motion.div>

          {/* Product grid - auto-generates from flavors config */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-20 md:mb-28">
            {flavors.map((product, i) => (
              <motion.button key={product.id}
                onClick={() => setSelectedProduct(product)}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="relative rounded-2xl p-4 md:p-5 transition-all duration-300 group"
                style={{
                  background: selectedProduct.id === product.id
                    ? `linear-gradient(135deg, ${product.color}18, rgba(255,255,255,0.96))`
                    : 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(0,119,255,0.04))',
                  border: selectedProduct.id === product.id
                    ? `1.5px solid ${product.color}`
                    : '1px solid rgba(0,119,255,0.12)',
                  boxShadow: selectedProduct.id === product.id ? `0 6px 20px ${product.color}18` : 'none',
                }}
                whileHover={{ scale: 1.05, boxShadow: `0 6px 20px ${product.color}18` }}>
                
                <div className="flex flex-col items-center gap-2 md:gap-3">
                  <span className="text-3xl md:text-4xl">{product.emoji}</span>
                  <div className="text-center">
                    <h4 className="font-headline text-xs md:text-sm text-blue-900 leading-tight">{product.name}</h4>
                    <span className="font-label text-[10px] px-2 py-0.5 rounded-full mt-1.5 inline-block"
                      style={{ background: `${product.color}12`, color: product.color }}>
                      {product.badge}
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="h-4" />

          {/* Main product detail section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 lg:gap-14">
            
            {/* Left: Product info */}
            <div className="flex flex-col justify-between gap-8 p-8 md:p-10 rounded-2xl md:rounded-3xl"
              style={{
                background: 'linear-gradient(152deg, rgba(255,255,255,0.92) 0%, rgba(0,119,255,0.04) 100%)',
                border: '1.5px solid rgba(0,119,255,0.15)',
              }}>
              <div>
                <motion.div
                  key={selectedProduct.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-8">
                  <h3 className="text-4xl md:text-5xl mb-2">{selectedProduct.emoji}</h3>
                  <h2 className="font-display text-2xl md:text-4xl text-blue-900 mb-2">{selectedProduct.name}</h2>
                  <p className="font-body text-sm text-blue-600 italic mb-4">{selectedProduct.tagline}</p>
                  <div className="flex items-baseline gap-3 mb-6">
                    <div className="font-display text-3xl md:text-4xl" style={{ color: selectedProduct.color }}>
                      ${selectedProduct.price}
                    </div>
                    <div className="font-body text-blue-700/70 text-sm">per 20 pack</div>
                  </div>
                  <p className="font-body text-blue-700/80 text-sm md:text-base mb-4">{selectedProduct.description}</p>
                  <p className="font-headline text-blue-600 text-xs">{selectedProduct.benefit}</p>
                </motion.div>

                {/* Image placeholder */}
                <div className="w-full h-48 md:h-56 rounded-xl md:rounded-2xl mb-6 flex items-center justify-center border border-dashed"
                  style={{ borderColor: `${selectedProduct.color}30`, background: `${selectedProduct.color}06` }}>
                  <div className="text-center">
                    <div className="text-5xl mb-2">{selectedProduct.emoji}</div>
                    <div className="font-label text-blue-600/50">Product Image</div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
                  <div className="p-4 md:p-5 rounded-xl" style={{ background: `${selectedProduct.color}08`, border: `1px solid ${selectedProduct.color}20` }}>
                    <div className="font-display text-2xl md:text-3xl" style={{ color: selectedProduct.color }}>{selectedProduct.stat}</div>
                    <div className="font-label text-blue-700/70 mt-1">Electrolytes</div>
                  </div>
                  <div className="p-4 md:p-5 rounded-xl" style={{ background: 'rgba(0,119,255,0.06)', border: '1px solid rgba(0,119,255,0.15)' }}>
                    <div className="font-display text-2xl md:text-3xl text-blue-900">0g</div>
                    <div className="font-label text-blue-700/70 mt-1">Sugar</div>
                  </div>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-3 rounded-xl p-2"
                  style={{ background: 'rgba(0,119,255,0.04)', border: '1px solid rgba(0,119,255,0.12)' }}>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 rounded font-headline text-blue-700 hover:text-blue-900 transition">&minus;</button>
                  <div className="flex-1 text-center font-headline text-blue-900">{quantity}x</div>
                  <button onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 rounded font-headline text-blue-700 hover:text-blue-900 transition">+</button>
                </div>

                <motion.button
                  className="w-full px-6 md:px-8 py-3 md:py-4 rounded-2xl text-white font-headline text-center transition-all text-sm md:text-base"
                  style={{
                    background: `linear-gradient(135deg, ${selectedProduct.color}, ${selectedProduct.color}dd)`,
                    boxShadow: `0 6px 24px ${selectedProduct.color}30`,
                  }}
                  whileHover={{ scale: 1.03, boxShadow: `0 10px 32px ${selectedProduct.color}45` }}
                  whileTap={{ scale: 0.98 }}>
                  Add to Cart
                </motion.button>

                <motion.a href="#"
                  className="w-full px-6 md:px-8 py-2.5 md:py-3 rounded-2xl font-headline text-blue-700 text-center transition-all text-sm md:text-base block"
                  style={{
                    background: 'rgba(0,119,255,0.05)',
                    border: '1px solid rgba(0,119,255,0.2)',
                  }}
                  whileHover={{ background: 'rgba(0,119,255,0.1)' }}
                  whileTap={{ scale: 0.98 }}>
                  View Nutrition Facts
                </motion.a>
              </div>
            </div>

            {/* Center: 3D visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="hidden md:block relative h-full min-h-[500px] rounded-2xl md:rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(152deg, rgba(255,255,255,0.9) 0%, rgba(0,119,255,0.05) 100%)',
                border: '1.5px solid rgba(0,119,255,0.15)',
                backdropFilter: 'blur(10px)',
              }}>
              <div className="w-full h-full flex items-center justify-center">
                <Product3D />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center text-blue-600/30">
                  <div className="font-display text-6xl mb-3">3D</div>
                  <div className="font-label">Product</div>
                </div>
              </div>
            </motion.div>

            {/* Right: Key features - from brand framework */}
            <div className="space-y-4 md:space-y-5">
              {[
                { icon: '\u26a1', title: 'Fast Acting', text: 'Electrolytes absorb in 15 min', color: '#0077FF' },
                { icon: '\ud83d\udca7', title: '3x Hydration', text: 'Superior to water alone', color: '#FF8C00' },
                { icon: '\ud83d\udeab', title: 'Zero Sugar', text: "Sugar isn't energy. It's drama.", color: '#22C55E' },
                { icon: '\ud83d\udd2c', title: 'Na + K + Mg', text: 'Clinical electrolyte ratios', color: '#8B5CF6' },
              ].map((feat, i) => (
                <motion.div key={feat.title}
                  initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex gap-3 md:gap-4 p-4 md:p-5 rounded-2xl"
                  style={{
                    background: `linear-gradient(150deg, ${feat.color}10 0%, rgba(255,255,255,0.96) 100%)`,
                    border: `1.5px solid ${feat.color}22`,
                  }}>
                  <div className="text-2xl md:text-3xl flex-shrink-0">{feat.icon}</div>
                  <div className="min-w-0">
                    <h4 className="font-headline text-sm md:text-base text-blue-900">{feat.title}</h4>
                    <p className="font-body text-xs md:text-sm text-blue-700/70 mt-0.5">{feat.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
      </div>
    </section>
  );
}