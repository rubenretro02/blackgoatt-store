"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Search,
  Book,
  MessageCircle,
  Mail,
  FileText,
  Shield,
  Key,
  CreditCard,
  Settings,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

const categories = [
  {
    title: "Getting Started",
    icon: Book,
    articles: [
      "How to create an account",
      "Purchasing your first product",
      "Activating your license",
      "System requirements",
    ],
  },
  {
    title: "Products & Licenses",
    icon: Key,
    articles: [
      "Understanding license types",
      "How to renew a license",
      "Transfer license to another device",
      "License activation limits",
    ],
  },
  {
    title: "Billing & Payments",
    icon: CreditCard,
    articles: [
      "Accepted payment methods",
      "How crypto payments work",
      "Refund policy",
      "Managing subscriptions",
    ],
  },
  {
    title: "Account & Security",
    icon: Shield,
    articles: [
      "Changing your password",
      "Two-factor authentication",
      "Account recovery",
      "Privacy settings",
    ],
  },
];

const quickLinks = [
  {
    title: "API Documentation",
    description: "Integrate our services into your applications",
    icon: FileText,
    href: "/docs",
  },
  {
    title: "Status Page",
    description: "Check the status of our services",
    icon: Settings,
    href: "https://status.blackgoatt.com",
    external: true,
  },
  {
    title: "Contact Support",
    description: "Get help from our support team",
    icon: Mail,
    href: "mailto:support@blackgoatt.com",
    external: true,
  },
  {
    title: "Telegram Community",
    description: "Join our community for updates",
    icon: MessageCircle,
    href: "https://t.me/blackgoatt",
    external: true,
  },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center">
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            How can we help?
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Search our knowledge base or browse categories below
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for answers..."
              className="h-14 pl-12 text-lg bg-white/5 border-white/10"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {quickLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
            >
              <Card className="bg-card/50 border-white/5 hover:border-emerald-500/30 transition-all h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <link.icon className="h-5 w-5 text-emerald-400" />
                    <span className="font-medium text-white">{link.title}</span>
                    {link.external && (
                      <ExternalLink className="h-3 w-3 text-muted-foreground ml-auto" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{link.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Categories */}
        <h2 className="text-xl font-semibold text-white mb-6">Browse by Category</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {categories.map((category) => (
            <Card key={category.title} className="bg-card/50 border-white/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-emerald-500/10">
                    <category.icon className="h-5 w-5 text-emerald-400" />
                  </div>
                  <h3 className="font-semibold text-white">{category.title}</h3>
                </div>
                <ul className="space-y-2">
                  {category.articles.map((article) => (
                    <li key={article}>
                      <Link
                        href="#"
                        className="flex items-center justify-between py-2 text-sm text-muted-foreground hover:text-white transition-colors group"
                      >
                        {article}
                        <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Support */}
        <Card className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-500/20">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold text-white mb-2">
              Still need help?
            </h2>
            <p className="text-muted-foreground mb-6">
              Our support team is available 24/7 to assist you
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-600">
                <MessageCircle className="h-4 w-4 mr-2" />
                Start Live Chat
              </Button>
              <Link href="mailto:support@blackgoatt.com">
                <Button variant="outline" className="border-white/10">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Support
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
