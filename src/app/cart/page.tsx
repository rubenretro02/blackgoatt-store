"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Globe,
  Smartphone,
  Key,
  ShoppingBag,
} from "lucide-react";

interface CartItem {
  id: string;
  product: string;
  productSlug: string;
  plan: string;
  planId: string;
  price: number;
  billing: "monthly" | "yearly";
}

const iconMap: Record<string, React.ElementType> = {
  "residential-ip": Globe,
  "cloud-phone": Smartphone,
  "geo-services": Key,
};

export default function CartPage() {
  // In a real app, this would come from a cart context/store
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link
              href="/store"
              className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-emerald-400" />
              <span className="font-semibold">Cart ({cartItems.length})</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold text-white mb-8">Shopping Cart</h1>

        {cartItems.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => {
                const IconComponent = iconMap[item.productSlug] || ShoppingBag;
                return (
                  <Card key={item.id} className="bg-card/50 border-white/5">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-emerald-500/10">
                          <IconComponent className="h-6 w-6 text-emerald-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-white">{item.product}</h3>
                          <p className="text-sm text-muted-foreground">{item.plan} Plan</p>
                          <Badge className="mt-2 bg-white/10 text-white/60 border-0">
                            {item.billing === "monthly" ? "Monthly" : "Yearly"}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-white">${item.price}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-400 hover:text-red-300 mt-2"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="bg-card/50 border-white/5 sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">Order Summary</h2>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-white">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Network Fee</span>
                      <span className="text-white">~$0.50</span>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">Total</span>
                      <span className="text-2xl font-bold text-white">
                        ${(subtotal + 0.50).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <Card className="bg-card/50 border-white/5">
            <CardContent className="p-12 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/5 mb-4">
                <ShoppingCart className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Browse our products and add something to your cart
              </p>
              <Link href="/store">
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-600">
                  Browse Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
