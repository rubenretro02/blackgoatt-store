"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Globe,
  Smartphone,
  Key,
  Plus,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShoppingBag,
  Copy,
  Check,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface UserProduct {
  id: string;
  license_key: string;
  product_name: string;
  product_slug: string;
  plan_name: string;
  status: string;
  expires_at: string;
}

const iconMap: Record<string, React.ElementType> = {
  "residential-ip": Globe,
  "cloud-phone": Smartphone,
  "geo-services": Key,
};

export default function ProductsPage() {
  const [products, setProducts] = useState<UserProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("licenses")
        .select(`
          id,
          license_key,
          status,
          expires_at,
          products (name, slug),
          plans (name)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (data) {
        const mappedProducts = data.map((l: any) => ({
          id: l.id,
          license_key: l.license_key,
          product_name: l.products?.name || "Unknown",
          product_slug: l.products?.slug || "unknown",
          plan_name: l.plans?.name || "Unknown",
          status: l.status,
          expires_at: l.expires_at,
        }));
        setProducts(mappedProducts);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const daysUntilExpiry = (date: string) => {
    return Math.ceil((new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="h-8 w-48 bg-white/10 rounded animate-pulse" />
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <Card key={i} className="bg-card/50 border-white/5">
              <CardContent className="p-6">
                <div className="h-24 bg-white/10 rounded animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">My Products</h1>
          <p className="text-muted-foreground mt-1">
            Manage your active subscriptions and licenses
          </p>
        </div>
        <Link href="/store">
          <Button className="bg-gradient-to-r from-emerald-500 to-teal-600">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Products List */}
      {products.length > 0 ? (
        <div className="space-y-4">
          {products.map((product) => {
            const IconComponent = iconMap[product.product_slug] || ShoppingBag;
            const days = daysUntilExpiry(product.expires_at);
            const isExpiringSoon = days <= 7;
            const isExpired = days <= 0;

            return (
              <Card
                key={product.id}
                className="bg-card/50 border-white/5 hover:border-white/10 transition-colors"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Product Info */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-3 rounded-xl bg-emerald-500/10 shrink-0">
                        <IconComponent className="h-6 w-6 text-emerald-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-lg text-white">{product.product_name}</h3>
                          <Badge
                            variant="outline"
                            className={
                              isExpired
                                ? "border-red-500/30 bg-red-500/10 text-red-400"
                                : "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                            }
                          >
                            {isExpired ? "Expired" : product.plan_name}
                          </Badge>
                        </div>

                        {/* License Key */}
                        <div className="mt-3 flex items-center gap-2">
                          <code className="px-3 py-1.5 rounded bg-white/5 text-sm font-mono text-muted-foreground">
                            {product.license_key}
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(product.license_key, product.id)}
                            className="text-muted-foreground hover:text-white"
                          >
                            {copiedKey === product.id ? (
                              <Check className="h-4 w-4 text-emerald-400" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>

                        {/* Expiry Info */}
                        <div className="mt-3 flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1.5">
                            {isExpired ? (
                              <Clock className="h-4 w-4 text-red-400" />
                            ) : isExpiringSoon ? (
                              <Clock className="h-4 w-4 text-yellow-400" />
                            ) : (
                              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                            )}
                            <span className={
                              isExpired
                                ? "text-red-400"
                                : isExpiringSoon
                                ? "text-yellow-400"
                                : "text-muted-foreground"
                            }>
                              {isExpired
                                ? "Expired"
                                : `Expires in ${days} days`
                              }
                            </span>
                          </div>
                          <span className="text-muted-foreground">
                            {new Date(product.expires_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 lg:flex-col lg:w-40">
                      <Button
                        variant="outline"
                        className="flex-1 border-white/10"
                        disabled={isExpired}
                      >
                        Renew
                      </Button>
                      <Link href="/dashboard/licenses" className="flex-1">
                        <Button variant="ghost" className="w-full text-muted-foreground">
                          View License
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="bg-card/50 border-white/5">
          <CardContent className="p-12 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 mb-4">
              <ShoppingBag className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-white mb-2">No products yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Browse our store to purchase your first product
            </p>
            <Link href="/store">
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-600">
                Browse Store
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
