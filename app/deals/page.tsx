"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Clock, Tag, Zap, ArrowRight, Flame, Percent, Gift, Truck, Heart, Sparkles } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { APP_NAME } from "@/lib/data";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Deal {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge: string;
  description: string;
  endsIn: { hours: number; minutes: number; seconds: number };
  stock: number;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const deals: Deal[] = [
  {
    id: 1,
    name: "Aether Wireless Headphones",
    category: "Electronics",
    price: 189,
    originalPrice: 249,
    rating: 4.8,
    reviewCount: 1240,
    image: "http://kiwiears.com/cdn/shop/files/Aether.jpg?v=1750832155",
    badge: "Flash Sale",
    description: "Studio-grade sound with 40-hour battery life.",
    endsIn: { hours: 5, minutes: 23, seconds: 41 },
    stock: 8,
  },
  {
    id: 2,
    name: "Ceramic Pour-Over Set",
    category: "Home & Living",
    price: 74,
    originalPrice: 95,
    rating: 4.9,
    reviewCount: 562,
    image: "https://m.media-amazon.com/images/I/7159+ELcEOL._AC_UF894,1000_QL80_.jpg",
    badge: "Limited Time",
    description: "Handcrafted ceramic dripper and carafe.",
    endsIn: { hours: 11, minutes: 45, seconds: 12 },
    stock: 15,
  },
  {
    id: 3,
    name: "Bamboo Yoga Mat Pro",
    category: "Sports",
    price: 92,
    originalPrice: 115,
    rating: 4.7,
    reviewCount: 718,
    image: "https://yogaaum.com/cdn/shop/files/111011462-Mats-PRO71-BambooCF-04_800x.jpg?v=1753419876",
    badge: "Weekend Deal",
    description: "Eco-friendly bamboo surface with alignment lines.",
    endsIn: { hours: 23, minutes: 59, seconds: 59 },
    stock: 22,
  },
  {
    id: 4,
    name: "Obsidian Mechanical Watch",
    category: "Fashion",
    price: 299,
    originalPrice: 420,
    rating: 4.9,
    reviewCount: 389,
    image: "https://cdn.shopify.com/s/files/1/0774/8032/9521/files/10-a.jpg?v=1747067067",
    badge: "Flash Sale",
    description: "Swiss movement, sapphire crystal glass.",
    endsIn: { hours: 3, minutes: 12, seconds: 8 },
    stock: 4,
  },
  {
    id: 5,
    name: "Vitamin C Radiance Serum",
    category: "Beauty",
    price: 42,
    originalPrice: 58,
    rating: 4.6,
    reviewCount: 2103,
    image: "https://honest.com/cdn/shop/files/Vitamin_C_Radiance_Serum.jpg?v=1780012536&width=1920",
    badge: "Limited Time",
    description: "20% stabilised Vitamin C with hyaluronic acid.",
    endsIn: { hours: 8, minutes: 30, seconds: 0 },
    stock: 31,
  },
  {
    id: 6,
    name: "Merino Wool Crewneck",
    category: "Fashion",
    price: 89,
    originalPrice: 128,
    rating: 4.7,
    reviewCount: 834,
    image: "https://brooksbrothers.bynder.com/match/WebName/XS00054_BLACK/",
    badge: "Weekend Deal",
    description: "Ethically sourced merino wool, breathable and soft.",
    endsIn: { hours: 23, minutes: 59, seconds: 59 },
    stock: 18,
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function discountPct(orig: number, sale: number): number {
  return Math.round((1 - sale / orig) * 100);
}

function formatTime(n: number): string {
  return String(n).padStart(2, "0");
}

type FilterType = "All" | "Flash Sale" | "Limited Time" | "Weekend Deal";
const FILTERS: FilterType[] = ["All", "Flash Sale", "Limited Time", "Weekend Deal"];

// ─── Page Component ───────────────────────────────────────────────────────────

export default function DealsPage() {
  const [timers, setTimers] = useState<
    Record<number, { hours: number; minutes: number; seconds: number }>
  >(() => {
    const init: Record<number, { hours: number; minutes: number; seconds: number }> = {};
    deals.forEach((d) => {
      init[d.id] = { ...d.endsIn };
    });
    return init;
  });

  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [wishlist, setWishlist] = useState<number[]>([]);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => {
        const next = { ...prev };
        deals.forEach((d) => {
          const t = { ...next[d.id] };
          t.seconds -= 1;
          if (t.seconds < 0) {
            t.seconds = 59;
            t.minutes -= 1;
          }
          if (t.minutes < 0) {
            t.minutes = 59;
            t.hours -= 1;
          }
          if (t.hours < 0) {
            t.hours = 0;
            t.minutes = 0;
            t.seconds = 0;
          }
          next[d.id] = t;
        });
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredDeals =
    activeFilter === "All" ? deals : deals.filter((d) => d.badge === activeFilter);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const badgeCount = (badge: FilterType) =>
    badge === "All" ? deals.length : deals.filter((d) => d.badge === badge).length;

  return (
    <div className="pt-24">
      {/* ─── SECTION 1: Hero Banner ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 py-20">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-amber-400/10 blur-3xl" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative max-w-4xl mx-auto px-4 text-center"
        >
          {/* Top badge */}
          <motion.div variants={fadeInUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/20 px-4 py-2 text-sm font-semibold text-amber-400">
            <Flame className="h-4 w-4" />
            Limited Time Deals — Up to 40% Off
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeInUp}
            className="mb-6 text-5xl font-black tracking-tight text-white md:text-6xl lg:text-7xl"
          >
            Today&apos;s{" "}
            <span className="text-amber-400">Hot Deals</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeInUp}
            className="mx-auto mb-10 max-w-2xl text-lg text-indigo-200 md:text-xl"
          >
            Handpicked discounts on premium products. Every deal is time-limited — don&apos;t miss out.
          </motion.p>

          {/* Stats row */}
          <motion.div
            variants={fadeInUp}
            className="mb-8 inline-flex flex-wrap justify-center gap-8 md:gap-16"
          >
            {[
              { value: "6", label: "Active Deals" },
              { value: "40%", label: "Max Discount" },
              { value: "24h", label: "New Deals Daily" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-black text-amber-400">{stat.value}</div>
                <div className="text-sm text-indigo-300">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeInUp}>
            <a
              href="#deals-grid"
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-amber-400 px-8 py-4 font-bold text-slate-900 transition-colors hover:bg-amber-300"
            >
              Shop All Deals
              <ArrowRight className="h-5 w-5" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── SECTION 2: Filter Tabs + Deal Cards Grid ───────────────────── */}
      <section id="deals-grid" className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Filter tabs */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeInUp}
          className="mb-10 flex flex-wrap gap-2"
        >
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                activeFilter === filter
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:text-indigo-600"
              }`}
            >
              {filter}
              <span
                className={`rounded-full px-1.5 text-xs ${
                  activeFilter === filter
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {badgeCount(filter)}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Section heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-slate-900">
            {filteredDeals.length} Deals Found
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Prices updated in real-time. Add to cart before the timer runs out.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredDeals.map((deal) => {
            const timer = timers[deal.id] ?? deal.endsIn;
            const isWishlisted = wishlist.includes(deal.id);
            const savings = deal.originalPrice - deal.price;
            const pct = discountPct(deal.originalPrice, deal.price);
            const stockPct = Math.min((deal.stock / 40) * 100, 100);

            return (
              <motion.div
                key={deal.id}
                variants={scaleIn}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
              >
                {/* Image area */}
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://placehold.co/600x400/e2e8f0/94a3b8?text=Product";
                    }}
                  />

                  {/* Badge top-left */}
                  <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-amber-400 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-slate-900">
                    <Zap className="h-3 w-3" />
                    {deal.badge}
                  </div>

                  {/* Discount badge top-right */}
                  <div className="absolute right-3 top-3 rounded-full bg-red-500 px-2.5 py-1.5 text-sm font-black text-white">
                    -{pct}%
                  </div>

                  {/* Wishlist button */}
                  <button
                    onClick={() => toggleWishlist(deal.id)}
                    className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition-transform hover:scale-110"
                    aria-label="Toggle wishlist"
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        isWishlisted
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-400"
                      }`}
                    />
                  </button>

                  {/* Stock bar */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent px-4 pb-3 pt-6">
                    <p className="text-xs font-semibold text-white">
                      Only {deal.stock} left!
                    </p>
                    <div className="mt-1 h-1.5 rounded-full bg-white/30">
                      <div
                        className="h-1.5 rounded-full bg-amber-400"
                        style={{ width: `${stockPct}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5">
                  {/* Category */}
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-indigo-600">
                    {deal.category}
                  </p>

                  {/* Name */}
                  <h3 className="mb-2 line-clamp-1 text-lg font-bold text-slate-900">
                    {deal.name}
                  </h3>

                  {/* Description */}
                  <p className="mb-4 line-clamp-2 text-sm text-slate-500">
                    {deal.description}
                  </p>

                  {/* Rating row */}
                  <div className="mb-3 flex items-center gap-1.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                    <span className="text-sm font-semibold text-slate-700">
                      {deal.rating}
                    </span>
                    <span className="text-xs text-slate-400">
                      ({deal.reviewCount.toLocaleString()})
                    </span>
                  </div>

                  {/* Price row */}
                  <div className="mb-4 flex items-center">
                    <span className="text-2xl font-black text-indigo-600">
                      ${deal.price}
                    </span>
                    <span className="ml-2 text-sm text-slate-400 line-through">
                      ${deal.originalPrice}
                    </span>
                    <span className="ml-auto rounded-lg bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">
                      Save ${savings}
                    </span>
                  </div>

                  {/* Countdown timer */}
                  <div className="mb-4 mt-4 rounded-xl bg-slate-900 p-3">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-amber-400" />
                      <span className="text-xs font-medium text-slate-400">
                        Ends in
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-center gap-2">
                      {/* Hours */}
                      <div className="rounded-lg bg-slate-800 px-3 py-2 text-center">
                        <div className="text-xl font-black text-white">
                          {formatTime(timer.hours)}
                        </div>
                        <div className="text-xs text-slate-500">HRS</div>
                      </div>
                      <span className="self-center font-bold text-slate-500">:</span>
                      {/* Minutes */}
                      <div className="rounded-lg bg-slate-800 px-3 py-2 text-center">
                        <div className="text-xl font-black text-white">
                          {formatTime(timer.minutes)}
                        </div>
                        <div className="text-xs text-slate-500">MIN</div>
                      </div>
                      <span className="self-center font-bold text-slate-500">:</span>
                      {/* Seconds */}
                      <div className="rounded-lg bg-slate-800 px-3 py-2 text-center">
                        <div className="text-xl font-black text-white">
                          {formatTime(timer.seconds)}
                        </div>
                        <div className="text-xs text-slate-500">SEC</div>
                      </div>
                    </div>
                  </div>

                  {/* Add to Cart */}
                  <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-bold text-white transition-colors hover:bg-indigo-700">
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ─── SECTION 3: Deal of the Day Banner ──────────────────────────── */}
      <section className="mt-8 bg-gradient-to-r from-amber-400 to-amber-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid items-center gap-12 lg:grid-cols-2"
          >
            {/* Left */}
            <motion.div variants={fadeInUp}>
              <div className="mb-4">
                <Tag className="h-8 w-8 text-slate-900" />
              </div>
              <h2 className="mb-3 text-4xl font-black text-slate-900">
                Deal of the Day
              </h2>
              <p className="mb-6 text-lg text-slate-800">
                The Obsidian Mechanical Watch — our most coveted timepiece — is now 29% off for 24 hours only. Swiss craftsmanship at an unbeatable price.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/product"
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-8 py-4 font-bold text-white transition-colors hover:bg-slate-800"
                >
                  Shop Now
                </a>
                <a
                  href="/product"
                  className="inline-flex items-center gap-2 rounded-2xl border-2 border-slate-900 px-8 py-4 font-bold text-slate-900 transition-colors hover:bg-amber-600"
                >
                  View Details
                </a>
              </div>
            </motion.div>

            {/* Right */}
            <motion.div variants={scaleIn}>
              <img
                src="https://cdn.shopify.com/s/files/1/0774/8032/9521/files/10-a.jpg?v=1747067067"
                alt="Obsidian Mechanical Watch"
                className="h-72 w-full rounded-2xl object-cover shadow-2xl"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://placehold.co/800x400/e2e8f0/94a3b8?text=Watch";
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 4: Why Shop Our Deals ──────────────────────────────── */}
      <section className="bg-slate-50 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto px-4"
        >
          {/* Heading */}
          <motion.div variants={fadeInUp} className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900">
              Why Shop Our Deals?
            </h2>
            <p className="mt-2 text-slate-500">
              Every discount is real, every product is premium, every deal is worth it.
            </p>
          </motion.div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: Percent,
                title: "Genuine Discounts",
                text: "Every price is verified against our regular retail price. No inflated originals — just real savings.",
              },
              {
                icon: Zap,
                title: "Flash Deals Daily",
                text: "New deals drop every day at midnight. Subscribe to our newsletter to get first access before they sell out.",
              },
              {
                icon: Gift,
                title: "Free Gift Wrapping",
                text: "All sale items include complimentary gift wrapping. Perfect for last-minute gifts without the last-minute stress.",
              },
            ].map((feature) => (
              <motion.div
                key={feature.title}
                variants={scaleIn}
                className="rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 p-2.5">
                  <feature.icon className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  {feature.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
