"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Check,
  CreditCard,
  Bitcoin,
  Shield,
  Clock,
  Loader2,
  Globe,
  Smartphone,
  Key,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const plans: Record<string, { name: string; product: string; productSlug: string; price_monthly: number; price_yearly: number; features: string[] }> = {
  "rip-starter": { name: "Starter", product: "Residential IP", productSlug: "residential-ip", price_monthly: 40, price_yearly: 400, features: ["1 IP address", "10 GB bandwidth", "5 locations"] },
  "rip-pro": { name: "Pro", product: "Residential IP", productSlug: "residential-ip", price_monthly: 80, price_yearly: 800, features: ["5 IP addresses", "100 GB bandwidth", "All locations"] },
  "rip-enterprise": { name: "Enterprise", product: "Residential IP", productSlug: "residential-ip", price_monthly: 200, price_yearly: 2000, features: ["Unlimited IPs", "Unlimited bandwidth", "Dedicated support"] },
  "cp-starter": { name: "Starter", product: "Cloud Phone", productSlug: "cloud-phone", price_monthly: 25, price_yearly: 250, features: ["1 instance", "Basic specs", "10 GB storage"] },
  "cp-pro": { name: "Pro", product: "Cloud Phone", productSlug: "cloud-phone", price_monthly: 60, price_yearly: 600, features: ["3 instances", "High specs", "30 GB storage"] },
  "cp-enterprise": { name: "Enterprise", product: "Cloud Phone", productSlug: "cloud-phone", price_monthly: 150, price_yearly: 1500, features: ["10 instances", "Premium specs", "100 GB storage"] },
  "geo-starter": { name: "Starter", product: "Geo Services", productSlug: "geo-services", price_monthly: 30, price_yearly: 300, features: ["1 license key", "Basic spoofing", "2 devices"] },
  "geo-pro": { name: "Pro", product: "Geo Services", productSlug: "geo-services", price_monthly: 70, price_yearly: 700, features: ["5 license keys", "Advanced spoofing", "10 devices"] },
  "geo-enterprise": { name: "Enterprise", product: "Geo Services", productSlug: "geo-services", price_monthly: 180, price_yearly: 1800, features: ["Unlimited licenses", "Full API", "Unlimited devices"] },
};

const cryptoOptions = [
  { id: "btc", name: "Bitcoin", symbol: "BTC", icon: "₿" },
  { id: "eth", name: "Ethereum", symbol: "ETH", icon: "Ξ" },
  { id: "usdt", name: "Tether", symbol: "USDT", icon: "$" },
  { id: "ltc", name: "Litecoin", symbol: "LTC", icon: "Ł" },
];

const iconMap: Record<string, React.ElementType> = {
  "residential-ip": Globe,
  "cloud-phone": Smartphone,
  "geo-services": Key,
};

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planId = searchParams.get("plan") || "";
  const billing = (searchParams.get("billing") as "monthly" | "yearly") || "monthly";

  const [email, setEmail] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("btc");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  const plan = plans[planId];
  const price = plan ? (billing === "monthly" ? plan.price_monthly : plan.price_yearly) : 0;

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setEmail(user.email || "");
      }
    };
    checkUser();
  }, []);

  const handleCheckout = async () => {
    if (!email) return;

    setLoading(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // In production, this would create an order and redirect to payment
    // For now, simulate success
    router.push("/checkout/success?order_id=demo-" + Date.now());
  };

  if (!plan) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Plan not found</h1>
          <Link href="/store">
            <Button>Back to Store</Button>
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = iconMap[plan.productSlug] || Globe;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center">
            <Link
              href={`/store/${plan.productSlug}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div>
            <h1 className="text-2xl font-bold text-white mb-6">Checkout</h1>

            <Card className="bg-card/50 border-white/5 mb-6">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-emerald-500/10">
                    <IconComponent className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{plan.product}</h3>
                    <p className="text-sm text-muted-foreground">{plan.name} Plan</p>
                    <Badge className="mt-2 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                      {billing === "monthly" ? "Monthly" : "Yearly"}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">${price}</p>
                    <p className="text-sm text-muted-foreground">/{billing === "monthly" ? "mo" : "yr"}</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/5">
                  <div className="space-y-2">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-emerald-400" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust badges */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-400" />
                Secure Payment
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-emerald-400" />
                Instant Activation
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-6">Payment Method</h2>

            {/* Email */}
            <div className="mb-6">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 bg-white/5 border-white/10"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                License and receipt will be sent to this email
              </p>
            </div>

            {/* Crypto Options */}
            <div className="mb-6">
              <Label>Select Cryptocurrency</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {cryptoOptions.map((crypto) => (
                  <button
                    key={crypto.id}
                    onClick={() => setSelectedCrypto(crypto.id)}
                    className={cn(
                      "p-4 rounded-xl border text-left transition-all",
                      selectedCrypto === crypto.id
                        ? "border-emerald-500 bg-emerald-500/10"
                        : "border-white/10 bg-white/5 hover:border-white/20"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{crypto.icon}</span>
                      <div>
                        <p className="font-medium text-white">{crypto.symbol}</p>
                        <p className="text-xs text-muted-foreground">{crypto.name}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Order Total */}
            <Card className="bg-white/5 border-white/10 mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-white">${price}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Network Fee</span>
                  <span className="text-white">~$0.50</span>
                </div>
                <div className="border-t border-white/10 my-2" />
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Total</span>
                  <span className="text-xl font-bold text-white">${(price + 0.50).toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Pay Button */}
            <Button
              className="w-full h-14 text-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
              onClick={handleCheckout}
              disabled={!email || loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Bitcoin className="h-5 w-5 mr-2" />
                  Pay with {cryptoOptions.find((c) => c.id === selectedCrypto)?.name}
                </>
              )}
            </Button>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              By completing this purchase you agree to our{" "}
              <Link href="/terms" className="text-emerald-400 hover:underline">Terms of Service</Link>
              {" "}and{" "}
              <Link href="/privacy" className="text-emerald-400 hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
