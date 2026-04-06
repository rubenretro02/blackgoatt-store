"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Globe,
  Smartphone,
  Key,
  ArrowLeft,
  Check,
  ShoppingCart,
  Zap,
  Shield,
  Clock,
  HeadphonesIcon,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

interface Plan {
  id: string;
  name: string;
  tier: string;
  price_monthly: number;
  price_yearly: number;
  features: string[];
  limits: Record<string, number>;
  popular: boolean;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  features: string[];
}

const iconMap: Record<string, React.ElementType> = {
  globe: Globe,
  smartphone: Smartphone,
  key: Key,
};

// Fallback data with updated prices
const defaultProducts: Record<string, { product: Product; plans: Plan[] }> = {
  "residential-ip": {
    product: {
      id: "1",
      name: "Residential IP",
      slug: "residential-ip",
      description: "Premium residential IP addresses for maximum anonymity and access. Bypass geo-restrictions with real residential IPs from any location worldwide.",
      icon: "globe",
      features: ["Real residential IPs", "50+ countries", "Unlimited bandwidth", "Instant activation", "No logs policy", "24/7 support"],
    },
    plans: [
      {
        id: "rip-starter",
        name: "Starter",
        tier: "starter",
        price_monthly: 40,
        price_yearly: 400,
        features: ["1 IP address", "10 GB bandwidth", "5 locations", "Email support"],
        limits: { ips: 1, bandwidth_gb: 10 },
        popular: false,
      },
      {
        id: "rip-pro",
        name: "Pro",
        tier: "pro",
        price_monthly: 80,
        price_yearly: 800,
        features: ["5 IP addresses", "100 GB bandwidth", "All locations", "Priority support", "API access"],
        limits: { ips: 5, bandwidth_gb: 100 },
        popular: true,
      },
      {
        id: "rip-enterprise",
        name: "Enterprise",
        tier: "enterprise",
        price_monthly: 200,
        price_yearly: 2000,
        features: ["Unlimited IPs", "Unlimited bandwidth", "All locations", "Dedicated support", "Custom API", "SLA guarantee"],
        limits: { ips: -1, bandwidth_gb: -1 },
        popular: false,
      },
    ],
  },
  "cloud-phone": {
    product: {
      id: "2",
      name: "Cloud Phone",
      slug: "cloud-phone",
      description: "Virtual Android devices running in the cloud. Perfect for app testing, automation, multi-account management, and privacy-focused mobile usage.",
      icon: "smartphone",
      features: ["Full Android OS", "Root access", "Multiple instances", "24/7 availability", "Google Play Store", "Custom locations"],
    },
    plans: [
      {
        id: "cp-starter",
        name: "Starter",
        tier: "starter",
        price_monthly: 25,
        price_yearly: 250,
        features: ["1 instance", "Basic specs", "10 GB storage", "Email support"],
        limits: { instances: 1, storage_gb: 10 },
        popular: false,
      },
      {
        id: "cp-pro",
        name: "Pro",
        tier: "pro",
        price_monthly: 60,
        price_yearly: 600,
        features: ["3 instances", "High specs", "30 GB storage", "Priority support", "Custom ROM"],
        limits: { instances: 3, storage_gb: 30 },
        popular: true,
      },
      {
        id: "cp-enterprise",
        name: "Enterprise",
        tier: "enterprise",
        price_monthly: 150,
        price_yearly: 1500,
        features: ["10 instances", "Premium specs", "100 GB storage", "Dedicated support", "Custom setup", "API access"],
        limits: { instances: 10, storage_gb: 100 },
        popular: false,
      },
    ],
  },
  "geo-services": {
    product: {
      id: "3",
      name: "Geo Services",
      slug: "geo-services",
      description: "Advanced location services and license management. GPS spoofing, location verification, and comprehensive API access. You'll receive license keys upon purchase.",
      icon: "key",
      features: ["License keys", "GPS spoofing", "API access", "HWID binding", "Telegram alerts", "Unlimited activations"],
    },
    plans: [
      {
        id: "geo-starter",
        name: "Starter",
        tier: "starter",
        price_monthly: 30,
        price_yearly: 300,
        features: ["1 license key", "Basic spoofing", "2 devices", "Email support"],
        limits: { licenses: 1, devices: 2 },
        popular: false,
      },
      {
        id: "geo-pro",
        name: "Pro",
        tier: "pro",
        price_monthly: 70,
        price_yearly: 700,
        features: ["5 license keys", "Advanced spoofing", "10 devices", "Priority support", "API access", "Telegram alerts"],
        limits: { licenses: 5, devices: 10 },
        popular: true,
      },
      {
        id: "geo-enterprise",
        name: "Enterprise",
        tier: "enterprise",
        price_monthly: 180,
        price_yearly: 1800,
        features: ["Unlimited licenses", "Full API", "Unlimited devices", "Dedicated support", "White-label", "Custom integration"],
        limits: { licenses: -1, devices: -1 },
        popular: false,
      },
    ],
  },
};

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const supabase = createClient();

      // Try to fetch from database
      const { data: productData } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .single();

      if (productData) {
        setProduct(productData);

        const { data: plansData } = await supabase
          .from("plans")
          .select("*")
          .eq("product_id", productData.id)
          .order("price_monthly", { ascending: true });

        if (plansData) {
          setPlans(plansData);
          setSelectedPlan(plansData.find((p: Plan) => p.popular) || plansData[0]);
        }
      } else {
        // Use fallback data
        const fallback = defaultProducts[slug];
        if (fallback) {
          setProduct(fallback.product);
          setPlans(fallback.plans);
          setSelectedPlan(fallback.plans.find((p) => p.popular) || fallback.plans[0]);
        }
      }

      setLoading(false);
    };

    fetchProduct();
  }, [slug]);

  const handleCheckout = () => {
    if (selectedPlan) {
      router.push(`/checkout?plan=${selectedPlan.id}&billing=${billingCycle}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-emerald-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Product not found</h1>
          <Link href="/store">
            <Button variant="outline">Back to Store</Button>
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = iconMap[product.icon] || Globe;
  const currentPrice = selectedPlan
    ? billingCycle === "monthly"
      ? selectedPlan.price_monthly
      : selectedPlan.price_yearly
    : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link
              href="/store"
              className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Store
            </Link>
            <Link href="/cart">
              <Button variant="outline" size="sm" className="border-white/10">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Info */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/20">
                <IconComponent className="h-8 w-8 text-emerald-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{product.name}</h1>
                <p className="text-muted-foreground">Select a plan below</p>
              </div>
            </div>

            <p className="text-lg text-muted-foreground mb-8">
              {product.description}
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {product.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-emerald-400" />
                  <span className="text-white">{feature}</span>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
              {[
                { icon: Zap, label: "Instant Setup" },
                { icon: Shield, label: "Secure" },
                { icon: Clock, label: "24/7 Access" },
                { icon: HeadphonesIcon, label: "Support" },
              ].map((badge) => (
                <div key={badge.label} className="flex flex-col items-center gap-2 text-center">
                  <badge.icon className="h-5 w-5 text-emerald-400" />
                  <span className="text-xs text-muted-foreground">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Plans */}
          <div>
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 p-1 rounded-lg bg-white/5 mb-6">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={cn(
                  "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors",
                  billingCycle === "monthly"
                    ? "bg-emerald-500 text-white"
                    : "text-muted-foreground hover:text-white"
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={cn(
                  "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors",
                  billingCycle === "yearly"
                    ? "bg-emerald-500 text-white"
                    : "text-muted-foreground hover:text-white"
                )}
              >
                Yearly
                <Badge className="ml-2 bg-emerald-500/20 text-emerald-400 text-xs">Save 17%</Badge>
              </button>
            </div>

            {/* Plan Cards */}
            <div className="space-y-4">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={cn(
                    "cursor-pointer transition-all duration-200",
                    selectedPlan?.id === plan.id
                      ? "bg-emerald-500/10 border-emerald-500/50"
                      : "bg-card/50 border-white/5 hover:border-white/20"
                  )}
                  onClick={() => setSelectedPlan(plan)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg text-white">{plan.name}</h3>
                          {plan.popular && (
                            <Badge className="bg-emerald-500 text-white">Popular</Badge>
                          )}
                        </div>
                        <p className="text-2xl font-bold text-white mt-1">
                          ${billingCycle === "monthly" ? plan.price_monthly : plan.price_yearly}
                          <span className="text-sm text-muted-foreground font-normal">
                            /{billingCycle === "monthly" ? "mo" : "yr"}
                          </span>
                        </p>
                      </div>
                      <div
                        className={cn(
                          "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                          selectedPlan?.id === plan.id
                            ? "border-emerald-500 bg-emerald-500"
                            : "border-white/20"
                        )}
                      >
                        {selectedPlan?.id === plan.id && (
                          <Check className="h-4 w-4 text-white" />
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-emerald-400" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Checkout Button */}
            <Button
              className="w-full mt-6 h-14 text-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
              onClick={handleCheckout}
              disabled={!selectedPlan}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Proceed to Checkout - ${currentPrice}
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Secure payment with crypto. Instant activation.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
