"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Globe,
  Smartphone,
  Key,
  Search,
  ShoppingCart,
  ArrowLeft,
  Check,
  Star,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  icon: string;
  image_url: string | null;
  starting_price: number;
  category: string;
  features: string[];
  popular: boolean;
}

const iconMap: Record<string, React.ElementType> = {
  globe: Globe,
  smartphone: Smartphone,
  key: Key,
};

// Fallback products if database is empty
const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Residential IP",
    slug: "residential-ip",
    description: "Premium residential IP addresses for maximum anonymity and access. Bypass geo-restrictions with real residential IPs from any location worldwide.",
    short_description: "Premium residential IPs for maximum anonymity",
    icon: "globe",
    image_url: null,
    starting_price: 40,
    category: "network",
    features: ["Real residential IPs", "50+ countries", "Unlimited bandwidth", "Instant activation"],
    popular: true,
  },
  {
    id: "2",
    name: "Cloud Phone",
    slug: "cloud-phone",
    description: "Virtual Android devices running in the cloud. Perfect for app testing, automation, multi-account management, and privacy-focused mobile usage.",
    short_description: "Virtual Android devices in the cloud",
    icon: "smartphone",
    image_url: null,
    starting_price: 25,
    category: "devices",
    features: ["Full Android OS", "Root access", "Multiple instances", "24/7 availability"],
    popular: true,
  },
  {
    id: "3",
    name: "Geo Services",
    slug: "geo-services",
    description: "Advanced location services and license management. GPS spoofing, location verification, and comprehensive API access for developers.",
    short_description: "Location services & license keys",
    icon: "key",
    image_url: null,
    starting_price: 30,
    category: "services",
    features: ["License keys", "GPS spoofing", "API access", "HWID binding"],
    popular: false,
  },
];

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("active", true)
        .order("sort_order", { ascending: true });

      if (data && data.length > 0) {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600">
                  <span className="font-bold text-white">B</span>
                </div>
                <span className="font-semibold hidden sm:block">
                  Black<span className="gradient-text">Goatt</span>
                </span>
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="font-medium">Store</span>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  Dashboard
                </Button>
              </Link>
              <Link href="/cart">
                <Button variant="outline" size="sm" className="border-white/10">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Privacy & Security Products
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our selection of premium digital privacy tools.
            All products include instant activation and 24/7 support.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className={selectedCategory === null ? "bg-emerald-500" : "border-white/10"}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-emerald-500" : "border-white/10"}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-card/50 border-white/5 animate-pulse">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-xl bg-white/10 mb-4" />
                  <div className="h-6 w-32 bg-white/10 rounded mb-2" />
                  <div className="h-4 w-full bg-white/10 rounded mb-4" />
                  <div className="h-10 w-full bg-white/10 rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const IconComponent = iconMap[product.icon] || Globe;
              return (
                <Card
                  key={product.id}
                  className="bg-card/50 border-white/5 hover:border-emerald-500/30 transition-all duration-300 group"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/20">
                        <IconComponent className="h-6 w-6 text-emerald-400" />
                      </div>
                      {product.popular && (
                        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          Popular
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {product.short_description}
                    </p>

                    <div className="space-y-2 mb-6">
                      {product.features.slice(0, 4).map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-emerald-400" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div>
                        <span className="text-sm text-muted-foreground">From</span>
                        <p className="text-2xl font-bold text-white">
                          ${product.starting_price}
                          <span className="text-sm text-muted-foreground font-normal">/mo</span>
                        </p>
                      </div>
                      <Link href={`/store/${product.slug}`}>
                        <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                          View Plans
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
}
