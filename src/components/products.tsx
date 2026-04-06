"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Globe,
  Smartphone,
  Key,
  ArrowRight,
  Check,
  Server,
  Lock,
  Zap,
  Users,
  Clock,
  Fingerprint,
  Wifi,
  MapPin
} from "lucide-react";

const products = [
  {
    id: "residential-ip",
    name: "Residential IP",
    tagline: "Premium Residential Proxies",
    description: "Real residential IP addresses from 50+ countries. Perfect for data collection, ad verification, market research, and bypassing geo-restrictions with maximum anonymity.",
    icon: Globe,
    color: "emerald",
    gradient: "from-emerald-500 to-green-600",
    href: "/store/residential-ip",
    startingPrice: 40,
    features: [
      { icon: Server, text: "50+ Countries" },
      { icon: Lock, text: "Real Residential IPs" },
      { icon: Zap, text: "Instant Activation" },
      { icon: Users, text: "Unlimited Bandwidth" },
    ],
    highlights: ["No logs policy", "Rotating IPs", "API access", "99.9% uptime"],
  },
  {
    id: "cloud-phone",
    name: "Cloud Phone",
    tagline: "Virtual Android Devices",
    description: "Run Android devices in the cloud 24/7. Perfect for app testing, automation, multi-account management, and privacy-focused mobile usage.",
    icon: Smartphone,
    color: "cyan",
    gradient: "from-cyan-500 to-blue-600",
    href: "/store/cloud-phone",
    startingPrice: 25,
    features: [
      { icon: Wifi, text: "5G Speed" },
      { icon: Clock, text: "24/7 Availability" },
      { icon: Fingerprint, text: "Root Access" },
      { icon: Users, text: "Multiple Instances" },
    ],
    highlights: ["Google Play Store", "Real fingerprint", "Custom locations", "Full Android OS"],
  },
  {
    id: "geo-services",
    name: "Geo Services",
    tagline: "Location & License Keys",
    description: "Advanced location services with license key delivery. GPS spoofing, location verification, HWID binding, and comprehensive API access for developers.",
    icon: Key,
    color: "teal",
    gradient: "from-teal-500 to-emerald-600",
    href: "/store/geo-services",
    startingPrice: 30,
    features: [
      { icon: MapPin, text: "GPS Spoofing" },
      { icon: Lock, text: "License Keys" },
      { icon: Zap, text: "Instant Delivery" },
      { icon: Users, text: "Team Licenses" },
    ],
    highlights: ["API access", "Telegram alerts", "HWID binding", "Unlimited activations"],
  },
];

export function Products() {
  return (
    <section id="products" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400 mb-4">
            Our Products
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Privacy Tools</span>{" "}
            <span className="gradient-text">Built for Professionals</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three powerful services designed to protect your digital privacy.
            Each product works independently or seamlessly together.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all duration-300"
            >
              {/* Icon */}
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${product.gradient} shadow-lg mb-6`}>
                <product.icon className="h-6 w-6 text-white" />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.tagline}</p>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3 py-4">
                  {product.features.map((feature) => (
                    <div key={feature.text} className="flex items-center gap-2">
                      <feature.icon className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                      <span className="text-xs text-white/80">{feature.text}</span>
                    </div>
                  ))}
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2">
                  {product.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-white/5 text-muted-foreground"
                    >
                      <Check className="h-3 w-3 text-emerald-400" />
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Price & CTA */}
                <div className="pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xs text-muted-foreground">From</span>
                      <p className="text-2xl font-bold text-white">
                        ${product.startingPrice}
                        <span className="text-sm text-muted-foreground font-normal">/mo</span>
                      </p>
                    </div>
                  </div>
                  <Link href={product.href}>
                    <Button
                      className={`w-full bg-gradient-to-r ${product.gradient} hover:opacity-90 text-white border-0`}
                    >
                      View Plans
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
