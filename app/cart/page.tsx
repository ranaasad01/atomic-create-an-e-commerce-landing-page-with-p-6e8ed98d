"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, Tag, Truck, Shield, RotateCcw, Sparkles } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { APP_NAME } from "@/lib/data";

interface CartItem {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  color: string;
  size?: string;
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Aether Wireless Headphones",
    category: "Electronics",
    price: 189,
    originalPrice: 249,
    image: "http://kiwiears.com/cdn/shop/files/Aether.jpg?v=1750832155",
    quantity: 1,
    color: "Midnight Black",
  },
  {
    id: 2,
    name: "Merino Wool Crewneck",
    category: "Fashion",
    price: 128,
    image: "https://brooksbrothers.bynder.com/match/WebName/XS00054_BLACK/",
    quantity: 2,
    color: "Charcoal",
    size: "M",
  },
  {
    id: 3,
    name: "Ceramic Pour-Over Set",
    category: "Home & Living",
    price: 74,
    originalPrice: 95,
    image:
      "https://m.media-amazon.com/images/I/7159+ELcEOL._AC_UF894,1000_QL80_.jpg",
    quantity: 1,
    color: "Ivory",
  },
  {
    id: 5,
    name: "Obsidian Mechanical Watch",
    category: "Fashion",
    price: 345,
    image:
      "https://cdn.shopify.com/s/files/1/0774/8032/9521/files/10-a.jpg?v=1747067067",
    quantity: 1,
    color: "Silver",
  },
];

const suggestions = [
  {
    id: "s1",
    name: "Bamboo Yoga Mat Pro",
    price: 92,
    image:
      "https://yogaaum.com/cdn/shop/files/111011462-Mats-PRO71-BambooCF-04_800x.jpg?v=1753419876",
  },
  {
    id: "s2",
    name: "Vitamin C Radiance Serum",
    price: 58,
    image:
      "https://honest.com/cdn/shop/files/Vitamin_C_Radiance_Serum.jpg?v=1780012536&width=1920",
  },
  {
    id: "s3",
    name: "Linen Throw Blanket",
    price: 89,
    image:
      "https://m.media-amazon.com/images/I/81Q5XJXQ5QL._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: "s4",
    name: "Minimalist Desk Lamp",
    price: 67,
    image:
      "https://m.media-amazon.com/images/I/61U3jBO0eBL._AC_UF894,1000_QL80_.jpg",
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const updateQty = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.min(10, Math.max(1, item.quantity + delta)) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const applyPromo = () => {
    if (promoCode.toUpperCase() === "LUMIERE20") {
      setPromoApplied(true);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = promoApplied ? subtotal * 0.2 : 0;
  const shipping = subtotal > 150 ? 0 : 9.99;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  return (
    <div className="min-h-screen bg-white">
      {/* ── SECTION 1: Hero Banner ── */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 py-16 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Left */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-center md:text-left"
            >
              <p className="text-amber-400 uppercase tracking-widest text-xs font-semibold mb-3">
                Your Cart
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                Shopping Bag
              </h1>
              <p className="text-indigo-200 text-lg">
                {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} ready
                for checkout
              </p>
            </motion.div>

            {/* Right — trust badges */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-6"
            >
              {[
                { icon: RotateCcw, title: "Free Returns", sub: "30-day hassle-free" },
                { icon: Shield, title: "Secure Checkout", sub: "256-bit SSL encrypted" },
                { icon: Sparkles, title: "24/7 Support", sub: "Always here to help" },
              ].map((badge) => (
                <div
                  key={badge.title}
                  className="flex items-center gap-3 bg-white/10 rounded-2xl px-5 py-4"
                >
                  <badge.icon className="w-6 h-6 text-amber-400 shrink-0" />
                  <div>
                    <p className="text-white font-semibold text-sm">{badge.title}</p>
                    <p className="text-indigo-200 text-xs">{badge.sub}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: Cart Items + Order Summary ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left — Cart Items */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Cart Items ({cartItems.length})
              </h2>

              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <ShoppingCart className="w-16 h-16 text-slate-300 mb-4" />
                  <p className="text-xl font-semibold text-slate-700 mb-2">
                    Your cart is empty
                  </p>
                  <p className="text-slate-500 mb-6">
                    Looks like you haven&apos;t added anything yet.
                  </p>
                  <a
                    href="/deals"
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                  >
                    Browse Deals <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              ) : (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                  className="flex flex-col gap-4"
                >
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={scaleIn}
                      className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 md:p-6 flex gap-4 md:gap-6"
                    >
                      {/* Image */}
                      <div className="shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover bg-slate-100"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://placehold.co/96x96/e2e8f0/94a3b8?text=Item";
                          }}
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-semibold text-slate-900 leading-snug">
                              {item.name}
                            </p>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {item.category}
                            </p>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              <span className="text-xs bg-slate-100 rounded-full px-2 py-0.5 text-slate-600">
                                {item.color}
                              </span>
                              {item.size && (
                                <span className="text-xs bg-slate-100 rounded-full px-2 py-0.5 text-slate-600">
                                  Size: {item.size}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Price */}
                          <div className="text-right shrink-0">
                            {item.originalPrice && (
                              <p className="text-sm text-slate-400 line-through">
                                ${item.originalPrice}
                              </p>
                            )}
                            <p className="text-lg font-bold text-indigo-600">
                              ${item.price}
                            </p>
                          </div>
                        </div>

                        {/* Bottom row */}
                        <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
                          {/* Quantity controls */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQty(item.id, -1)}
                              className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center font-semibold text-slate-900 text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQty(item.id, 1)}
                              className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => removeItem(item.id)}
                              className="ml-2 p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Subtotal */}
                          <p className="text-sm font-semibold text-slate-700">
                            Subtotal:{" "}
                            <span className="text-slate-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Right — Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h2 className="font-bold text-xl text-slate-900 mb-6">
                  Order Summary
                </h2>

                {/* Promo Code */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <Tag className="inline w-3.5 h-3.5 mr-1 text-indigo-500" />
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="LUMIERE20"
                      className="flex-1 px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                    <button
                      onClick={applyPromo}
                      className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-xs font-semibold text-green-600 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5"
                    >
                      ✓ LUMIERE20 applied — 20% off!
                    </motion.p>
                  )}
                </div>

                <hr className="border-slate-100 mb-5" />

                {/* Line items */}
                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-slate-900">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (20%)</span>
                      <span className="font-medium">-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-600">
                    <span>Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600 font-semibold">
                          FREE
                        </span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Tax (8%)</span>
                    <span className="font-medium text-slate-900">
                      ${tax.toFixed(2)}
                    </span>
                  </div>
                </div>

                <hr className="border-slate-100 my-5" />

                {/* Total */}
                <div className="flex justify-between items-center mb-6">
                  <span className="font-bold text-xl text-slate-900">
                    Order Total
                  </span>
                  <span className="font-bold text-2xl text-indigo-600">
                    ${total.toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors text-base"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                {/* Trust icons */}
                <div className="flex justify-around mt-6">
                  <div className="flex flex-col items-center gap-1">
                    <Truck className="w-5 h-5 text-slate-400" />
                    <span className="text-xs text-slate-500 text-center">
                      Free over $150
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Shield className="w-5 h-5 text-slate-400" />
                    <span className="text-xs text-slate-500 text-center">
                      Secure
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <RotateCcw className="w-5 h-5 text-slate-400" />
                    <span className="text-xs text-slate-500 text-center">
                      Free Returns
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: You May Also Like ── */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              You May Also Like
            </h2>
            <p className="text-slate-500">
              Customers who bought these also loved
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {suggestions.map((item) => (
              <motion.div
                key={item.id}
                variants={scaleIn}
                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/400x300/e2e8f0/94a3b8?text=Product";
                    }}
                  />
                </div>
                <div className="p-4">
                  <p className="font-semibold text-slate-900 text-sm leading-snug mb-1">
                    {item.name}
                  </p>
                  <p className="text-indigo-600 font-bold">${item.price}</p>
                  <button className="mt-3 w-full border border-indigo-600 text-indigo-600 hover:bg-indigo-50 text-sm font-semibold rounded-xl py-2 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
