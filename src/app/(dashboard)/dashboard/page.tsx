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
  ArrowRight,
  ShoppingBag,
  Clock,
  CheckCircle2,
  TrendingUp,
  Package,
  Store,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface UserProduct {
  id: string;
  product_name: string;
  product_type: string;
  plan_name: string;
  status: string;
  expires_at: string;
}

interface Order {
  id: string;
  product_name: string;
  amount: number;
  status: string;
  created_at: string;
}

const iconMap: Record<string, React.ElementType> = {
  "residential-ip": Globe,
  "cloud-phone": Smartphone,
  "geo-services": Key,
};

export default function DashboardPage() {
  const [products, setProducts] = useState<UserProduct[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeProducts: 0,
    totalSpent: 0,
    activeLicenses: 0,
    nextRenewal: null as string | null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      // Fetch user's licenses/products
      const { data: licenses } = await supabase
        .from("licenses")
        .select(`
          id,
          status,
          expires_at,
          products (name, slug),
          plans (name)
        `)
        .eq("user_id", user.id)
        .eq("status", "active");

      // Fetch user's orders
      const { data: ordersData } = await supabase
        .from("orders")
        .select(`
          id,
          amount,
          status,
          created_at,
          plans (name, products (name))
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5);

      if (licenses) {
        const mappedProducts = licenses.map((l: any) => ({
          id: l.id,
          product_name: l.products?.name || "Unknown",
          product_type: l.products?.slug || "unknown",
          plan_name: l.plans?.name || "Unknown",
          status: l.status,
          expires_at: l.expires_at,
        }));
        setProducts(mappedProducts);

        // Calculate stats
        const activeCount = mappedProducts.length;
        const nextExpiry = mappedProducts
          .map((p: UserProduct) => new Date(p.expires_at))
          .sort((a: Date, b: Date) => a.getTime() - b.getTime())[0];

        setStats((prev) => ({
          ...prev,
          activeProducts: activeCount,
          activeLicenses: activeCount,
          nextRenewal: nextExpiry ? nextExpiry.toISOString() : null,
        }));
      }

      if (ordersData) {
        const mappedOrders = ordersData.map((o: any) => ({
          id: o.id,
          product_name: o.plans?.products?.name || "Unknown",
          amount: o.amount,
          status: o.status,
          created_at: o.created_at,
        }));
        setOrders(mappedOrders);

        const totalSpent = ordersData
          .filter((o: any) => o.status === "completed")
          .reduce((sum: number, o: any) => sum + o.amount, 0);

        setStats((prev) => ({ ...prev, totalSpent }));
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const daysUntilRenewal = stats.nextRenewal
    ? Math.ceil((new Date(stats.nextRenewal).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="h-8 w-48 bg-white/10 rounded animate-pulse" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="bg-card/50 border-white/5">
              <CardContent className="p-4">
                <div className="h-16 bg-white/10 rounded animate-pulse" />
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
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your products and subscriptions
          </p>
        </div>
        <Link href="/store">
          <Button className="bg-gradient-to-r from-emerald-500 to-teal-600">
            <Store className="h-4 w-4 mr-2" />
            Browse Store
          </Button>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card/50 border-white/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <Package className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.activeProducts}</p>
                <p className="text-xs text-muted-foreground">Active Products</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-white/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">${stats.totalSpent.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">Total Spent</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-white/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <Key className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.activeLicenses}</p>
                <p className="text-xs text-muted-foreground">Active Licenses</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-white/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <Clock className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {daysUntilRenewal !== null ? `${daysUntilRenewal}d` : "-"}
                </p>
                <p className="text-xs text-muted-foreground">Next Renewal</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Products */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Active Products</h2>
          <Link href="/dashboard/products">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => {
              const IconComponent = iconMap[product.product_type] || Package;
              return (
                <Card key={product.id} className="bg-card/50 border-white/5">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-emerald-500/10">
                          <IconComponent className="h-5 w-5 text-emerald-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{product.product_name}</h3>
                          <p className="text-xs text-muted-foreground">{product.plan_name}</p>
                        </div>
                      </div>
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                        Active
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Expires: {new Date(product.expires_at).toLocaleDateString()}
                    </p>
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
              <h3 className="font-semibold text-white mb-2">No active products</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Browse our store to get started
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

      {/* Recent Orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Recent Orders</h2>
          <Link href="/dashboard/orders">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {orders.length > 0 ? (
          <Card className="bg-card/50 border-white/5">
            <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {orders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-white/5">
                        <CheckCircle2 className={`h-4 w-4 ${
                          order.status === "completed" ? "text-emerald-400" : "text-yellow-400"
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium text-white">{order.product_name}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-white">${order.amount.toFixed(2)}</p>
                      <Badge
                        variant="outline"
                        className={
                          order.status === "completed"
                            ? "border-emerald-500/30 text-emerald-400"
                            : "border-yellow-500/30 text-yellow-400"
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-card/50 border-white/5">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No orders yet</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
