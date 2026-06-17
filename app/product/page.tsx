"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, ChevronRight, Plus, Minus, Check, Sparkles, ArrowRight, ZoomIn } from 'lucide-react';
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";
import { APP_NAME } from "@/lib/data";

// ─── Mock Product Data ────────────────────────────────────────────────────────

const product = {
  name: "Obsidian Mechanical Watch",
  category: "Fashion",
  price: 345,
  originalPrice: 420,
  rating: 4.9,
  reviewCount: 389,
  badge: "featured",
  description:
    "A masterpiece of horological engineering. The Obsidian Mechanical Watch features a Swiss-made automatic movement visible through the exhibition caseback. Hand-stitched genuine leather strap, sapphire crystal glass with anti-reflective coating, and 50m water resistance make this the ultimate everyday luxury timepiece.",
  features: [
    "Swiss automatic movement",
    "Sapphire crystal glass",
    "Genuine leather strap",
    "50m water resistance",
    "42mm case diameter",
    "2-year warranty",
  ],
  images: [
    "https://cdn.shopify.com/s/files/1/0774/8032/9521/files/10-a.jpg?v=1747067067",
    "https://cdn.shopify.com/s/files/1/0774/8032/9521/files/10-b.jpg?v=1747067067",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=800",
  ],
  colors: [
    { name: "Silver", hex: "#C0C0C0" },
    { name: "Gold", hex: "#D4AF37" },
    { name: "Rose Gold", hex: "#B76E79" },
    { name: "Midnight Black", hex: "#1a1a2e" },
  ],
  sizes: ["38mm", "40mm", "42mm", "44mm"],
  reviews: [
    {
      id: 1,
      author: "James R.",
      rating: 5,
      date: "Dec 2024",
      text: "Absolutely stunning timepiece. The craftsmanship is impeccable and it looks even better in person.",
      verified: true,
    },
    {
      id: 2,
      author: "Sarah M.",
      rating: 5,
      date: "Nov 2024",
      text: "Bought this as a gift for my husband and he absolutely loves it. Worth every penny.",
      verified: true,
    },
    {
      id: 3,
      author: "David K.",
      rating: 4,
      date: "Oct 2024",
      text: "Beautiful watch, great quality. The leather strap is very comfortable. Shipping was fast.",
      verified: true,
    },
  ],
};

const relatedProducts = [
  {
    id: 1,
    name: "Merino Wool Crewneck",
    price: 128,
    rating: 4.7,
    image: "https://brooksbrothers.bynder.com/match/WebName/XS00054_BLACK/",
  },
  {
    id: 2,
    name: "Aether Wireless Headphones",
    price: 189,
    rating: 4.8,
    image: "http://kiwiears.com/cdn/shop/files/Aether.jpg?v=1750832155",
  },
  {
    id: 3,
    name: "Ceramic Pour-Over Set",
    price: 74,
    rating: 4.9,
    image: "https://m.media-amazon.com/images/I/7159+ELcEOL._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: 4,
    name: "Bamboo Yoga Mat Pro",
    price: 92,
    rating: 4.7,
    image: "https://yogaaum.com/cdn/shop/files/111011462-Mats-PRO71-BambooCF-04_800x.jpg?v=1753419876",
  },
];

// ─── Star Rating Helper ───────────────────────────────────────────────────────

function StarRow({ rating, size = "w-5 h-5" }: { rating: number; size?: string }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${size} ${
            i <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-slate-200 text-slate-200"
          }`}
        />
      ))}
    </div>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Silver");
  const [selectedSize, setSelectedSize] = useState("42mm");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "features" | "reviews">("description");

  function handleAddToCart() {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  const savings = product.originalPrice - product.price;

  return (
    <div className="pt-24 bg-white min-h-screen">
      {/* ── SECTION 1: Breadcrumb ── */}
      <div className="bg-slate-50 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-1.5">
            <a href="/" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">
              Home
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <a href="/shop" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">
              {product.category}
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-sm text-slate-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* ── SECTION 2: Product Hero ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Image Gallery */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideInLeft}
          >
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden aspect-square bg-slate-100">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800";
                }}
              />
              <div className="absolute top-4 right-4 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-sm">
                <ZoomIn className="w-4 h-4 text-slate-600" />
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                    selectedImage === idx
                      ? "border-indigo-600"
                      : "border-transparent hover:border-indigo-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`View ${idx + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800";
                    }}
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right: Product Info */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideInRight}
            className="flex flex-col"
          >
            {/* Badge + Category */}
            <div className="flex items-center gap-3 mb-2">
              {product.badge && (
                <span className="bg-amber-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  {product.badge}
                </span>
              )}
              <span className="text-sm text-indigo-600 font-medium">{product.category}</span>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <StarRow rating={product.rating} />
              <span className="font-bold text-slate-900">{product.rating}</span>
              <span className="text-slate-500 text-sm">({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-indigo-600">${product.price}</span>
              <span className="text-xl text-slate-400 line-through">${product.originalPrice}</span>
              <span className="bg-green-100 text-green-700 text-sm font-semibold px-2 py-1 rounded-lg">
                Save ${savings}
              </span>
            </div>

            <hr className="border-slate-100 mb-6" />

            {/* Color Selector */}
            <div className="mb-6">
              <p className="font-semibold text-slate-900 mb-3">
                Color: <span className="font-normal text-slate-600">{selectedColor}</span>
              </p>
              <div className="flex items-center gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    title={color.name}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                      selectedColor === color.name
                        ? "border-indigo-600 ring-2 ring-indigo-200"
                        : "border-slate-200 hover:border-slate-400"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <p className="font-semibold text-slate-900 mb-3">Case Size</p>
              <div className="flex items-center gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 ${
                      selectedSize === size
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-slate-700 border-slate-200 hover:border-indigo-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Picker */}
            <div className="mb-6">
              <p className="font-semibold text-slate-900 mb-3">Quantity</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
                >
                  <Minus className="w-4 h-4 text-slate-600" />
                </button>
                <span className="w-12 text-center font-bold text-slate-900 text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
                >
                  <Plus className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              onClick={handleAddToCart}
              whileTap={{ scale: 0.97 }}
              className={`w-full mt-2 font-bold py-4 rounded-2xl flex items-center justify-center gap-3 text-lg transition-all duration-300 ${
                addedToCart
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              {addedToCart ? (
                <>
                  <Check className="w-5 h-5" />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </>
              )}
            </motion.button>

            {/* Wishlist + Share */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setIsWishlisted((w) => !w)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 text-sm font-medium text-slate-700"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isWishlisted ? "fill-amber-400 text-amber-400" : "text-slate-500"
                  }`}
                />
                Wishlist
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 text-sm font-medium text-slate-700">
                <Share2 className="w-4 h-4 text-slate-500" />
                Share
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-around mt-8 pt-6 border-t border-slate-100">
              <div className="flex flex-col items-center text-center gap-1.5">
                <Truck className="w-5 h-5 text-indigo-600" />
                <span className="text-xs text-slate-500 font-medium">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5">
                <Shield className="w-5 h-5 text-indigo-600" />
                <span className="text-xs text-slate-500 font-medium">2-Year Warranty</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5">
                <RotateCcw className="w-5 h-5 text-indigo-600" />
                <span className="text-xs text-slate-500 font-medium">30-Day Returns</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 3: Product Details Tabs ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-100">
        {/* Tab Buttons */}
        <div className="flex items-center gap-0 border-b border-slate-200 mb-10">
          {(["description", "features", "reviews"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-semibold capitalize transition-all duration-200 border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab === "reviews" ? `Reviews (${product.reviewCount})` : tab}
            </button>
          ))}
        </div>

        {/* Description Tab */}
        {activeTab === "description" && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="grid lg:grid-cols-2 gap-8"
          >
            <div>
              <p className="text-slate-600 leading-relaxed text-lg">{product.description}</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-4">What&apos;s Included</h3>
              <ul className="space-y-3">
                {[
                  "Watch",
                  "Leather strap",
                  "Extra links",
                  "Certificate of authenticity",
                  "Gift box",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-600">
                    <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-indigo-600" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {/* Features Tab */}
        {activeTab === "features" && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {product.features.map((feature) => (
              <motion.div
                key={feature}
                variants={fadeInUp}
                className="flex items-center gap-3 bg-indigo-50 text-indigo-700 rounded-xl px-4 py-3 font-medium"
              >
                <Check className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                {feature}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-6"
          >
            {product.reviews.map((review) => (
              <motion.div
                key={review.id}
                variants={fadeInUp}
                className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-slate-900">{review.author}</span>
                    {review.verified && (
                      <span className="bg-green-100 text-green-700 text-xs rounded-full px-2 py-0.5 font-medium">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <span className="text-slate-400 text-sm">{review.date}</span>
                </div>
                <StarRow rating={review.rating} size="w-4 h-4" />
                <p className="text-slate-600 mt-3 leading-relaxed">{review.text}</p>
              </motion.div>
            ))}

            {/* Rating Summary */}
            <motion.div
              variants={fadeInUp}
              className="bg-indigo-50 rounded-2xl p-6 flex items-center gap-6 mt-4"
            >
              <span className="text-6xl font-bold text-indigo-600">{product.rating}</span>
              <div>
                <StarRow rating={product.rating} />
                <p className="text-slate-500 mt-1 text-sm">out of 5</p>
                <p className="text-slate-600 font-medium mt-1">{product.reviewCount} total reviews</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </section>

      {/* ── SECTION 4: Related Products ── */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-2">You Might Also Love</h2>
            <p className="text-slate-500">Handpicked products that complement your style</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {relatedProducts.map((item) => (
              <motion.div
                key={item.id}
                variants={scaleIn}
                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer group"
              >
                <div className="h-48 overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800";
                    }}
                  />
                </div>
                <div className="p-4">
                  <p className="font-semibold text-slate-900 text-sm leading-snug mb-1">{item.name}</p>
                  <p className="text-indigo-600 font-bold mb-2">${item.price}</p>
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i <= Math.round(item.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "fill-slate-200 text-slate-200"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-slate-500 ml-1">{item.rating}</span>
                  </div>
                  <a
                    href="/product"
                    className="text-indigo-600 text-sm font-medium mt-1 flex items-center gap-1 hover:gap-2 transition-all duration-200"
                  >
                    View Product
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
