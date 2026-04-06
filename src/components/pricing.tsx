"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Check, Zap, Crown, Building2 } from "lucide-react";

const plans = [
  {
    name: "Starter",
    description: "Perfect for individuals",
    price: { monthly: 25, yearly: 250 },
    icon: Zap,
    featured: false,
    features: [
      "1 VPN Connection",
      "1 Cloud Phone Instance",
      "Basic Geo Services",
      "10 GB Transfer/month",
      "Email Support",
      "Basic API Access",
    ],
  },
  {
    name: "Pro",
    description: "For power users",
    price: { monthly: 60, yearly: 600 },
    icon: Crown,
    featured: true,
    features: [
      "5 VPN Connections",
      "3 Cloud Phone Instances",
      "Advanced Geo Services",
      "Unlimited Transfer",
      "Priority Support",
      "Full API Access",
      "Custom Locations",
      "Telegram Alerts",
    ],
  },
  {
    name: "Enterprise",
    description: "For teams & businesses",
    price: { monthly: 150, yearly: 1500 },
    icon: Building2,
    featured: false,
    features: [
      "Unlimited VPN Connections",
      "10 Cloud Phone Instances",
      "Full Geo Suite",
      "Unlimited Everything",
      "24/7 Dedicated Support",
      "White-label Options",
      "Custom Integrations",
      "SLA Guarantee",
      "Dedicated Account Manager",
    ],
  },
];

const cryptoPayments = [
  { name: "Bitcoin", symbol: "BTC" },
  { name: "Ethereum", symbol: "ETH" },
  { name: "USDT", symbol: "USDT" },
  { name: "Litecoin", symbol: "LTC" },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 radial-gradient-hero opacity-50" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400 mb-4">
            Pricing
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Simple,</span>{" "}
            <span className="gradient-text">Transparent Pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include access to our full ecosystem.
            Pay with crypto for extra privacy.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative p-8 bg-card/50 backdrop-blur-sm border-white/10 ${
                plan.featured ? 'border-emerald-500/50 glow' : ''
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0">
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${plan.featured ? 'bg-emerald-500/20' : 'bg-white/5'}`}>
                  <plan.icon className={`h-5 w-5 ${plan.featured ? 'text-emerald-400' : 'text-muted-foreground'}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-white">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">${plan.price.monthly}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  or ${plan.price.yearly}/year (save 17%)
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/store">
                <Button
                  className={`w-full ${
                    plan.featured
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0'
                      : 'bg-white/5 hover:bg-white/10 border-white/10'
                  }`}
                >
                  Get Started
                </Button>
              </Link>
            </Card>
          ))}
        </div>

        {/* Crypto Payment Section */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
            <p className="text-sm text-muted-foreground mb-4">Accepted Payment Methods</p>
            <div className="flex items-center gap-6 mb-4">
              {cryptoPayments.map((crypto) => (
                <div key={crypto.symbol} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-sm font-medium text-white">{crypto.symbol}</span>
                </div>
              ))}
              <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                <span className="text-sm font-medium text-muted-foreground">+ More</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Powered by NowPayments & Cryptomus | Instant activation | No KYC required
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
