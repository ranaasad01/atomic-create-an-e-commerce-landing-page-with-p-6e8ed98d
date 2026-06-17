"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Star, ShoppingCart, Heart, ArrowRight, Truck, Shield, RefreshCw, Headphones, Sparkles, ChevronRight, Check, TrendingUp, Award, Users } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, CATEGORIES } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline mock data ────────────────────────────────────────────────────────

interface ProductItem {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: "sale" | "new" | "featured" | "bestseller";
  description: string;
}

const products: ProductItem[] = [
  {
    id: 1,
    name: "Aether Wireless Headphones",
    category: "Electronics",
    price: 189,
    originalPrice: 249,
    rating: 4.8,
    reviewCount: 1240,
    image: "http://kiwiears.com/cdn/shop/files/Aether.jpg?v=1750832155",
    badge: "sale",
    description: "Studio-grade sound with 40-hour battery life and active noise cancellation.",
  },
  {
    id: 2,
    name: "Merino Wool Crewneck",
    category: "Fashion",
    price: 128,
    rating: 4.7,
    reviewCount: 834,
    image: "https://brooksbrothers.bynder.com/match/WebName/XS00054_BLACK/",
    badge: "bestseller",
    description: "Ethically sourced merino wool. Breathable, soft, and built to last.",
  },
  {
    id: 3,
    name: "Ceramic Pour-Over Set",
    category: "Home & Living",
    price: 74,
    originalPrice: 95,
    rating: 4.9,
    reviewCount: 562,
    image: "https://m.media-amazon.com/images/I/7159+ELcEOL._AC_UF894,1000_QL80_.jpg",
    badge: "sale",
    description: "Handcrafted ceramic dripper and carafe for the perfect morning ritual.",
  },
  {
    id: 4,
    name: "Vitamin C Radiance Serum",
    category: "Beauty",
    price: 58,
    rating: 4.6,
    reviewCount: 2103,
    image: "https://honest.com/cdn/shop/files/Vitamin_C_Radiance_Serum.jpg?v=1780012536&width=1920",
    badge: "new",
    description: "20% stabilised Vitamin C with hyaluronic acid for luminous skin.",
  },
  {
    id: 5,
    name: "Obsidian Mechanical Watch",
    category: "Fashion",
    price: 345,
    rating: 4.9,
    reviewCount: 389,
    image: "https://cdn.shopify.com/s/files/1/0774/8032/9521/files/10-a.jpg?v=1747067067",
    badge: "featured",
    description: "Swiss movement, sapphire crystal glass, and a hand-stitched leather strap.",
  },
  {
    id: 6,
    name: "Bamboo Yoga Mat Pro",
    category: "Sports",
    price: 92,
    originalPrice: 115,
    rating: 4.7,
    reviewCount: 718,
    image: "https://yogaaum.com/cdn/shop/files/111011462-Mats-PRO71-BambooCF-04_800x.jpg?v=1753419876",
    badge: "sale",
    description: "Natural bamboo surface with alignment guides and non-slip base.",
  },
  {
    id: 7,
    name: "Smart Desk Lamp",
    category: "Electronics",
    price: 119,
    rating: 4.5,
    reviewCount: 445,
    image: "https://m.media-amazon.com/images/I/715olWL+xXL.jpg",
    badge: "new",
    description: "Tunable white light with wireless charging pad and touch controls.",
  },
  {
    id: 8,
    name: "Linen Duvet Cover",
    category: "Home & Living",
    price: 145,
    rating: 4.8,
    reviewCount: 927,
    image: "http://3hlinen.com/cdn/shop/files/3HLinen_Offwhite_Linen_Duvet_Cover_Set.png?v=1747894963",
    description: "Stone-washed French linen that gets softer with every wash.",
  },
];

const featuredProduct: ProductItem = {
  id: 9,
  name: "Lumière Signature Fragrance",
  category: "Beauty",
  price: 210,
  rating: 4.9,
  reviewCount: 1876,
  image: "https://leonardparis.com/8091-thickbox_default/signature-lumiere-eau-de-toilette.jpg",
  badge: "featured",
  description:
    "Our most celebrated creation. Notes of bergamot, white cedar, and warm amber — a scent that lingers long after you leave the room. Crafted in Grasse, France, in a hand-blown glass flacon.",
};

const reviews = [
  {
    id: 1,
    name: "Sophia R.",
    avatar: "https://images.squarespace-cdn.com/content/v1/55ecad93e4b097dd68b71341/1552508220117-2ENOH1V1WPO9B15U9QOK/18922208_10211298040064581_7261989867091406680_n.jpg",
    rating: 5,
    text: "The quality is genuinely exceptional. My Merino crewneck arrived beautifully packaged and feels incredible — I've already ordered two more colours.",
    product: "Merino Wool Crewneck",
    verified: true,
  },
  {
    id: 2,
    name: "James T.",
    avatar: "https://s3.amazonaws.com/arc-authors/cmg/8adde958-cd42-477c-9467-0ee150778a71.png",
    rating: 5,
    text: "Lumière has completely changed how I shop online. Every product is exactly as described, and the curation is second to none.",
    product: "Obsidian Mechanical Watch",
    verified: true,
  },
  {
    id: 3,
    name: "Mia L.",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Mia_L_%C3%A9lectrique_FR_2013.jpg/250px-Mia_L_%C3%A9lectrique_FR_2013.jpg",
    rating: 5,
    text: "The Vitamin C serum is the best I've ever used. My skin looks visibly brighter after just two weeks. Will never go back.",
    product: "Vitamin C Radiance Serum",
    verified: true,
  },
];

const valueProps = [
  {
    icon: Truck,
    title: "Free Worldwide Shipping",
    description: "Complimentary shipping on all orders over $75. Express options available at checkout.",
  },
  {
    icon: Shield,
    title: "2-Year Guarantee",
    description: "Every product is backed by our quality promise. If it's not perfect, we'll make it right.",
  },
  {
    icon: RefreshCw,
    title: "60-Day Returns",
    description: "Changed your mind? No problem. Free returns within 60 days, no questions asked.",
  },
  {
    icon: Headphones,
    title: "Concierge Support",
    description: "Our dedicated team is available 7 days a week to help you find exactly what you need.",
  },
];

const stats = [
  { icon: Users, value: "240K+", label: "Happy Customers" },
  { icon: Award, value: "1,800+", label: "Curated Products" },
  { icon: TrendingUp, value: "98%", label: "Satisfaction Rate" },
  { icon: Star, value: "4.9", label: "Average Rating" },
];

const badgeConfig: Record<string, { label: string; className: string }> = {
  sale: { label: "Sale", className: "bg-rose-500 text-white" },
  new: { label: "New", className: "bg-emerald-500 text-white" },
  featured: { label: "Featured", className: "bg-indigo-600 text-white" },
  bestseller: { label: "Best Seller", className: "bg-amber-500 text-white" },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-slate-200 text-slate-200"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-slate-500">
        {rating.toFixed(1)} ({count.toLocaleString()})
      </span>
    </div>
  );
}

function ProductCard({ product, reduced }: { product: ProductItem; reduced: boolean }) {
  const [wishlisted, setWishlisted] = useState(false);
  const badge = product.badge ? badgeConfig[product.badge] : null;

  return (
    <motion.div
      variants={reduced ? undefined : scaleIn}
      whileHover={reduced ? undefined : { y: -6, transition: { duration: 0.25 } }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {badge && (
          <span
            className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${badge.className}`}
          >
            {badge.label}
          </span>
        )}
        <motion.button
          onClick={() => setWishlisted((w) => !w)}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm"
          aria-label="Add to wishlist"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              wishlisted ? "fill-rose-500 text-rose-500" : "text-slate-400"
            }`}
          />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs font-medium text-indigo-600 uppercase tracking-wide mb-1">
          {product.category}
        </p>
        <h3 className="font-semibold text-slate-900 text-sm leading-snug mb-1.5 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">
          {product.description}
        </p>
        <StarRating rating={product.rating} count={product.reviewCount} />

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-slate-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-slate-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors duration-200"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const reduced = useReducedMotion() ?? false;
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <main className="overflow-x-hidden">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left copy */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={reduced ? undefined : staggerContainer}
          >
            <motion.div
              variants={reduced ? undefined : fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              New Season Collection — Now Live
            </motion.div>

            <motion.h1
              variants={reduced ? undefined : fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6"
            >
              Curated for the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                discerning
              </span>{" "}
              eye.
            </motion.h1>

            <motion.p
              variants={reduced ? undefined : fadeInUp}
              className="text-lg text-slate-300 leading-relaxed mb-8 max-w-lg"
            >
              {APP_NAME} brings together the world's finest products — from
              precision electronics to artisan homeware — selected by experts
              who care as much as you do.
            </motion.p>

            <motion.div
              variants={reduced ? undefined : fadeInUp}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="#products"
                whileHover={reduced ? undefined : { scale: 1.04 }}
                whileTap={reduced ? undefined : { scale: 0.96 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-900/40 transition-colors duration-200"
              >
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#featured"
                whileHover={reduced ? undefined : { scale: 1.04 }}
                whileTap={reduced ? undefined : { scale: 0.96 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl border border-white/20 backdrop-blur-sm transition-colors duration-200"
              >
                View Featured
              </motion.a>
            </motion.div>

            {/* Mini stats */}
            <motion.div
              variants={reduced ? undefined : fadeInUp}
              className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10"
            >
              {[
                { value: "240K+", label: "Customers" },
                { value: "4.9★", label: "Avg Rating" },
                { value: "Free", label: "Shipping $75+" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-sm text-slate-400">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right hero image */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={reduced ? undefined : slideInRight}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl shadow-indigo-950/60">
              <img
                src="https://images.squarespace-cdn.com/content/v1/527877e1e4b0d495e4b9f61d/1416344479470-7L8LWQZTNQ37QROU5U4R/image-asset.jpeg"
                alt="Lumière curated collection"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/40 to-transparent" />
            </div>
            {/* Floating card */}
            <motion.div
              animate={reduced ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-8 bg-white rounded-2xl p-4 shadow-xl flex items-center gap-3 max-w-[220px]"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900">Top Rated</p>
                <p className="text-xs text-slate-500">1,800+ curated picks</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Value Props ───────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={reduced ? undefined : staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {valueProps.map((vp) => {
              const Icon = vp.icon;
              return (
                <motion.div
                  key={vp.title}
                  variants={reduced ? undefined : fadeInUp}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-2xl hover:bg-slate-50 transition-colors duration-200"
                >
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm leading-snug">
                      {vp.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      {vp.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Featured Product ──────────────────────────────────────────────── */}
      <section id="featured" className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={reduced ? undefined : fadeInUp}
            className="text-center mb-14"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-3">
              Editor's Pick
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
              Featured This Season
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={reduced ? undefined : slideInLeft}
              className="relative rounded-3xl overflow-hidden aspect-square shadow-2xl"
            >
              <img
                src={featuredProduct.image}
                alt={featuredProduct.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/30 to-transparent" />
              <span className="absolute top-5 left-5 bg-indigo-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                Featured
              </span>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={reduced ? undefined : staggerContainer}
            >
              <motion.p
                variants={reduced ? undefined : fadeInUp}
                className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3"
              >
                {featuredProduct.category}
              </motion.p>
              <motion.h3
                variants={reduced ? undefined : fadeInUp}
                className="text-4xl font-bold text-slate-900 mb-4 leading-tight"
              >
                {featuredProduct.name}
              </motion.h3>
              <motion.div variants={reduced ? undefined : fadeInUp} className="mb-5">
                <StarRating
                  rating={featuredProduct.rating}
                  count={featuredProduct.reviewCount}
                />
              </motion.div>
              <motion.p
                variants={reduced ? undefined : fadeInUp}
                className="text-slate-600 leading-relaxed mb-8 text-base"
              >
                {featuredProduct.description}
              </motion.p>

              <motion.ul
                variants={reduced ? undefined : staggerContainer}
                className="space-y-3 mb-8"
              >
                {[
                  "Hand-blown glass flacon, made in Grasse, France",
                  "50ml & 100ml sizes available",
                  "Vegan & cruelty-free formulation",
                  "Complimentary gift wrapping included",
                ].map((point) => (
                  <motion.li
                    key={point}
                    variants={reduced ? undefined : fadeInUp}
                    className="flex items-center gap-3 text-sm text-slate-700"
                  >
                    <span className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-indigo-600" />
                    </span>
                    {point}
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                variants={reduced ? undefined : fadeInUp}
                className="flex items-center gap-6"
              >
                <div>
                  <span className="text-4xl font-bold text-slate-900">
                    ${featuredProduct.price}
                  </span>
                </div>
                <motion.button
                  whileHover={reduced ? undefined : { scale: 1.04 }}
                  whileTap={reduced ? undefined : { scale: 0.96 }}
                  className="flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 transition-colors duration-200"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Products Grid ─────────────────────────────────────────────────── */}
      <section id="products" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={reduced ? undefined : fadeInUp}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
          >
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-2">
                Our Collection
              </span>
              <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
                Shop All Products
              </h2>
            </div>
            <a
              href="#products"
              className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              View all <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Category filter */}
          <motion.div
            id="categories"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={reduced ? undefined : fadeIn}
            className="flex flex-wrap gap-2 mb-10"
          >
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={reduced ? undefined : { scale: 1.04 }}
                whileTap={reduced ? undefined : { scale: 0.96 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {/* Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={reduced ? undefined : staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {(filteredProducts ?? []).map((product) => (
              <ProductCard key={product.id} product={product} reduced={reduced ?? false} />
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              <p className="text-lg font-medium">No products in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section className="bg-indigo-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={reduced ? undefined : staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={reduced ? undefined : scaleIn}
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-4xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-indigo-200 text-sm font-medium">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Reviews ───────────────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={reduced ? undefined : fadeInUp}
            className="text-center mb-14"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-3">
              Social Proof
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-4">
              Loved by thousands
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Don't take our word for it. Here's what our community has to say
              about their {APP_NAME} experience.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={reduced ? undefined : staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                variants={reduced ? undefined : fadeInUp}
                whileHover={reduced ? undefined : { y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${
                        s <= review.rating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-slate-200 text-slate-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-5">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-9 h-9 rounded-full object-cover bg-slate-100"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'%3E%3Crect width='36' height='36' fill='%23e2e8f0' rx='18'/%3E%3C/svg%3E";
                    }}
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{review.name}</p>
                    <p className="text-xs text-slate-400">{review.product}</p>
                  </div>
                  {review.verified && (
                    <span className="ml-auto text-xs text-emerald-600 font-medium flex items-center gap-1">
                      <Check className="w-3 h-3" /> Verified
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-violet-600/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={reduced ? undefined : staggerContainer}
          >
            <motion.div
              variants={reduced ? undefined : scaleIn}
              className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-6"
            >
              <Sparkles className="w-8 h-8 text-indigo-400" />
            </motion.div>
            <motion.h2
              variants={reduced ? undefined : fadeInUp}
              className="text-4xl sm:text-5xl font-bold text-white mb-5 tracking-tight"
            >
              Discover your next favourite thing.
            </motion.h2>
            <motion.p
              variants={reduced ? undefined : fadeInUp}
              className="text-slate-300 text-lg mb-8 leading-relaxed"
            >
              Join over 240,000 customers who trust {APP_NAME} for premium,
              thoughtfully curated products delivered to their door.
            </motion.p>
            <motion.div
              variants={reduced ? undefined : fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a
                href="#products"
                whileHover={reduced ? undefined : { scale: 1.04 }}
                whileTap={reduced ? undefined : { scale: 0.96 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-900/50 transition-colors duration-200"
              >
                Shop the Collection
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#featured"
                whileHover={reduced ? undefined : { scale: 1.04 }}
                whileTap={reduced ? undefined : { scale: 0.96 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl border border-white/20 backdrop-blur-sm transition-colors duration-200"
              >
                See What's Featured
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}