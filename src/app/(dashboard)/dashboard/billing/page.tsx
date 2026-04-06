"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  Bitcoin,
  Download,
  Clock,
  CheckCircle2,
  Plus,
  Wallet,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Subscription {
  id: string;
  product_name: string;
  plan_name: string;
  price: number;
  billing_cycle: "monthly" | "yearly";
  next_billing: string;
  status: string;
}

interface Transaction {
  id: string;
  amount: number;
  currency: string;
  description: string;
  date: string;
  status: string;
}

// Demo data
const demoSubscriptions: Subscription[] = [
  {
    id: "1",
    product_name: "Residential IP",
    plan_name: "Pro",
    price: 80,
    billing_cycle: "monthly",
    next_billing: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active",
  },
  {
    id: "2",
    product_name: "Cloud Phone",
    plan_name: "Starter",
    price: 25,
    billing_cycle: "monthly",
    next_billing: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active",
  },
];

const demoTransactions: Transaction[] = [
  {
    id: "1",
    amount: 80,
    currency: "USD",
    description: "Residential IP - Pro Plan",
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    status: "completed",
  },
  {
    id: "2",
    amount: 25,
    currency: "USD",
    description: "Cloud Phone - Starter Plan",
    date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    status: "completed",
  },
  {
    id: "3",
    amount: 30,
    currency: "USD",
    description: "Geo Services - Starter Plan",
    date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    status: "completed",
  },
];

export default function BillingPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(demoSubscriptions);
  const [transactions, setTransactions] = useState<Transaction[]>(demoTransactions);
  const [loading, setLoading] = useState(false);

  const totalMonthly = subscriptions.reduce((sum, sub) => sum + sub.price, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Billing</h1>
        <p className="text-muted-foreground mt-1">
          Manage your subscriptions and payment history
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="bg-card/50 border-white/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <Wallet className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">${totalMonthly}</p>
                <p className="text-xs text-muted-foreground">Monthly Spend</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-white/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{subscriptions.length}</p>
                <p className="text-xs text-muted-foreground">Active Subscriptions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-white/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <Bitcoin className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">Crypto</p>
                <p className="text-xs text-muted-foreground">Payment Method</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Subscriptions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Active Subscriptions</h2>
          <Link href="/store">
            <Button size="sm" className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30">
              <Plus className="h-4 w-4 mr-1" />
              Add New
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          {subscriptions.map((sub) => (
            <Card key={sub.id} className="bg-card/50 border-white/5">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white">{sub.product_name}</h3>
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                        {sub.plan_name}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      ${sub.price}/{sub.billing_cycle === "monthly" ? "mo" : "yr"}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Next billing</p>
                      <p className="text-white">
                        {new Date(sub.next_billing).toLocaleDateString()}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="border-white/10">
                      Manage
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment History */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Payment History</h2>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>

        <Card className="bg-card/50 border-white/5">
          <CardContent className="p-0">
            <div className="divide-y divide-white/5">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-white/5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{tx.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(tx.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-white">${tx.amount}</p>
                    <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 text-xs">
                      {tx.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Payment Methods</h2>
        <Card className="bg-card/50 border-white/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10">
                <Bitcoin className="h-6 w-6 text-emerald-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-white">Cryptocurrency</p>
                <p className="text-sm text-muted-foreground">
                  Pay with Bitcoin, Ethereum, USDT, and more
                </p>
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                Default
              </Badge>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              All payments are processed through NowPayments and Cryptomus for maximum privacy.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
