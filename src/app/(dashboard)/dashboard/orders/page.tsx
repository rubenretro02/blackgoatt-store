"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  CheckCircle2,
  Clock,
  XCircle,
  Search,
  Download,
  ShoppingBag,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Order {
  id: string;
  product_name: string;
  plan_name: string;
  amount: number;
  currency: string;
  payment_method: string;
  status: string;
  created_at: string;
}

const statusConfig = {
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    className: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
  },
  failed: {
    label: "Failed",
    icon: XCircle,
    className: "border-red-500/30 bg-red-500/10 text-red-400",
  },
  refunded: {
    label: "Refunded",
    icon: XCircle,
    className: "border-gray-500/30 bg-gray-500/10 text-gray-400",
  },
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("orders")
        .select(`
          id,
          amount,
          currency,
          payment_method,
          status,
          created_at,
          plans (
            name,
            products (name)
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (data) {
        const mappedOrders = data.map((o: any) => ({
          id: o.id,
          product_name: o.plans?.products?.name || "Unknown Product",
          plan_name: o.plans?.name || "Unknown Plan",
          amount: o.amount,
          currency: o.currency || "USD",
          payment_method: o.payment_method || "crypto",
          status: o.status,
          created_at: o.created_at,
        }));
        setOrders(mappedOrders);
      }

      setLoading(false);
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="h-8 w-32 bg-white/10 rounded animate-pulse" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-card/50 border-white/5">
              <CardContent className="p-6">
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
      <div>
        <h1 className="text-2xl font-bold text-white">Orders</h1>
        <p className="text-muted-foreground mt-1">
          View and manage your order history
        </p>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/5 border-white/10"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => {
            const status = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.pending;
            const StatusIcon = status.icon;

            return (
              <Card key={order.id} className="bg-card/50 border-white/5">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-semibold text-white">{order.product_name}</h3>
                        <Badge variant="outline" className={status.className}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {status.label}
                        </Badge>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span className="font-mono text-xs">{order.id.slice(0, 8)}...</span>
                        <span>•</span>
                        <span>{order.plan_name}</span>
                        <span>•</span>
                        <span>
                          {new Date(order.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Amount & Actions */}
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-xl font-bold text-white">
                          ${order.amount.toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground">{order.currency}</p>
                      </div>
                      <Button variant="outline" size="sm" className="border-white/10">
                        <Download className="h-4 w-4 mr-1" />
                        Invoice
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card className="bg-card/50 border-white/5">
            <CardContent className="p-12 text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 mb-4">
                <ShoppingBag className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-white mb-2">No orders found</h3>
              <p className="text-sm text-muted-foreground">
                {searchQuery
                  ? "Try adjusting your search query"
                  : "Your order history will appear here"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
