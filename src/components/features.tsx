"use client";

import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Zap,
  Globe,
  Lock,
  CreditCard,
  HeadphonesIcon,
  Server,
  Smartphone,
  RefreshCw,
  Key,
  Bell,
  Code,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Military-Grade Security",
    description: "AES-256 encryption, WireGuard protocol, and zero-knowledge architecture ensure your data stays private.",
  },
  {
    icon: Zap,
    title: "Instant Deployment",
    description: "Services activate within seconds of purchase. No waiting, no manual setup required.",
  },
  {
    icon: Globe,
    title: "Global Infrastructure",
    description: "Servers in 50+ countries with automatic failover and load balancing for optimal performance.",
  },
  {
    icon: Lock,
    title: "No Logs Policy",
    description: "We don't track, store, or sell your data. Your privacy is our core principle.",
  },
  {
    icon: CreditCard,
    title: "Crypto Payments",
    description: "Pay anonymously with Bitcoin, Ethereum, USDT, and more. No KYC required for most plans.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Expert support team available around the clock via chat, email, and Telegram.",
  },
  {
    icon: Server,
    title: "High Availability",
    description: "99.9% uptime SLA with redundant systems and automatic failover protection.",
  },
  {
    icon: Smartphone,
    title: "Multi-Platform",
    description: "Native apps for Windows, macOS, Linux, iOS, and Android. Plus browser extensions.",
  },
  {
    icon: RefreshCw,
    title: "Auto-Renewal",
    description: "Set it and forget it. Automatic subscription renewal keeps your services running.",
  },
  {
    icon: Key,
    title: "API Access",
    description: "Full REST API for developers. Integrate our services into your own applications.",
  },
  {
    icon: Bell,
    title: "Real-time Alerts",
    description: "Telegram and email notifications for account activity, renewals, and security events.",
  },
  {
    icon: Code,
    title: "Developer Friendly",
    description: "Comprehensive documentation, SDKs, and webhooks for seamless integration.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400 mb-4">
            Features
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Built for</span>{" "}
            <span className="gradient-text">Privacy & Performance</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every feature is designed with security and user experience in mind.
            No compromises.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-emerald-500/20 transition-all duration-300"
            >
              <div className="mb-4 p-2.5 w-fit rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/10 group-hover:border-emerald-500/30 transition-colors">
                <feature.icon className="h-5 w-5 text-emerald-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
