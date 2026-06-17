export const APP_NAME = "Lumière";
export const APP_TAGLINE = "Curated for the discerning eye.";
export const APP_EMAIL = "hello@lumiere.shop";

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Shop", href: "#products" },
  { label: "Categories", href: "#categories" },
  { label: "Featured", href: "#featured" },
  { label: "About", href: "#about" },
  { label: "Deals", href: "/deals" },
  { label: "Cart", href: "/cart" },
  { label: "Product", href: "/product" },
];

export const navCTA = {
  label: "View Cart",
  href: "#cart-icon",
};

export interface Product {
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

export const CATEGORIES = [
  "All",
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty",
  "Sports",
];
