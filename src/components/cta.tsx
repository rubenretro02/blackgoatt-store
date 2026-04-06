"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
          <span className="text-white">Ready to Take Control of</span>
          <br />
          <span className="gradient-text">Your Digital Privacy?</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
          Join thousands of users who trust BlackGoatt for their privacy needs.
          Start with a free trial today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register">
            <Button
              size="lg"
              className="h-14 px-10 text-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 glow-hover transition-all duration-300"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="mailto:sales@blackgoatt.com">
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-10 text-lg border-white/10 bg-white/5 hover:bg-white/10"
            >
              Contact Sales
            </Button>
          </Link>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          No credit card required | 7-day free trial | Cancel anytime
        </p>
      </div>
    </section>
  );
}
