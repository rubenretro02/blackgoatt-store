"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  Shield,
  Smartphone,
  MapPin,
  ChevronDown,
  ExternalLink,
} from "lucide-react";

const products = [
  {
    name: "VPN Services",
    description: "WireGuard VPN with global coverage",
    href: "https://vpn.blackgoatt.com",
    icon: Shield,
    color: "text-emerald-400",
  },
  {
    name: "Cloud Phone",
    description: "Virtual Android devices in the cloud",
    href: "https://cloudphone.blackgoatt.com",
    icon: Smartphone,
    color: "text-cyan-400",
  },
  {
    name: "Geo Services",
    description: "Location services and licensing",
    href: "https://geo.blackgoatt.com",
    icon: MapPin,
    color: "text-teal-400",
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showProducts, setShowProducts] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600">
            <span className="font-bold text-lg text-white">B</span>
            <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 opacity-30 blur-sm" />
          </div>
          <span className="font-semibold text-lg tracking-tight">
            Black<span className="gradient-text">Goatt</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div
            className="relative"
            onMouseEnter={() => setShowProducts(true)}
            onMouseLeave={() => setShowProducts(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Products
              <ChevronDown className={`h-4 w-4 transition-transform ${showProducts ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown */}
            {showProducts && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
                <div className="w-80 rounded-xl border border-white/10 bg-card/95 backdrop-blur-xl p-2 shadow-2xl">
                  {products.map((product) => (
                    <a
                      key={product.name}
                      href={product.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 rounded-lg p-3 hover:bg-white/5 transition-colors group"
                    >
                      <div className={`p-2 rounded-lg bg-white/5 ${product.color}`}>
                        <product.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{product.name}</span>
                          <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{product.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Features
          </Link>
          <Link href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            FAQ
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 bg-background border-white/10">
            <div className="flex flex-col gap-6 mt-8">
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2">Products</p>
                {products.map((product) => (
                  <a
                    key={product.name}
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg p-2 hover:bg-white/5 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <product.icon className={`h-5 w-5 ${product.color}`} />
                    <span className="text-sm">{product.name}</span>
                  </a>
                ))}
              </div>

              <div className="space-y-2">
                <Link
                  href="#pricing"
                  className="block px-2 py-2 text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="#features"
                  className="block px-2 py-2 text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="#faq"
                  className="block px-2 py-2 text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  FAQ
                </Link>
              </div>

              <div className="space-y-2 pt-4 border-t border-white/10">
                <Button variant="ghost" className="w-full justify-start">
                  Sign In
                </Button>
                <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600">
                  Get Started
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
