"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Download, Key, ArrowRight, Copy, Check, Loader2 } from "lucide-react";
import { useState } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id") || "DEMO-ORDER";
  const [copied, setCopied] = useState(false);

  // Demo license key
  const licenseKey = `BG-${Date.now().toString(36).toUpperCase()}-XXXX-XXXX`;

  const copyLicense = () => {
    navigator.clipboard.writeText(licenseKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 radial-gradient-hero opacity-30" />

      <div className="relative w-full max-w-lg text-center">
        <div className="mb-8">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 mb-6">
            <CheckCircle2 className="h-10 w-10 text-emerald-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
          <p className="text-muted-foreground">
            Your order has been processed and your license is ready.
          </p>
        </div>

        <Card className="bg-card/50 border-white/10 mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
              <span className="text-sm text-muted-foreground">Order ID</span>
              <code className="text-sm font-mono text-white">{orderId}</code>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Key className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-medium text-white">Your License Key</span>
              </div>
              <div className="flex items-center gap-2">
                <code className="flex-1 px-4 py-3 rounded-lg bg-white/5 text-lg font-mono text-emerald-400">
                  {licenseKey}
                </code>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyLicense}
                  className="border-white/10"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              A copy of this license has been sent to your email.
            </p>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/dashboard/products" className="flex-1">
            <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600">
              View My Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/store" className="flex-1">
            <Button variant="outline" className="w-full border-white/10">
              Continue Shopping
            </Button>
          </Link>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5">
          <h3 className="text-sm font-medium text-white mb-4">What's Next?</h3>
          <div className="grid gap-4 text-left">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <Download className="h-4 w-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Download the App</p>
                <p className="text-xs text-muted-foreground">
                  Get our app for the best experience
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <Key className="h-4 w-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Activate Your License</p>
                <p className="text-xs text-muted-foreground">
                  Use the license key above in our application
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
