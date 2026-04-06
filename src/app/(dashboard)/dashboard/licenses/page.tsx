"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Key,
  Copy,
  Check,
  Search,
  Globe,
  Smartphone,
  RefreshCw,
  ExternalLink,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface License {
  id: string;
  license_key: string;
  product_name: string;
  product_slug: string;
  plan_name: string;
  status: string;
  expires_at: string;
  created_at: string;
  hwid?: string;
}

const iconMap: Record<string, React.ElementType> = {
  "residential-ip": Globe,
  "cloud-phone": Smartphone,
  "geo-services": Key,
};

const statusConfig = {
  active: {
    label: "Active",
    icon: CheckCircle2,
    className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  },
  expired: {
    label: "Expired",
    icon: Clock,
    className: "border-red-500/30 bg-red-500/10 text-red-400",
  },
  suspended: {
    label: "Suspended",
    icon: XCircle,
    className: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
  },
};

// Demo licenses for testing
const demoLicenses: License[] = [
  {
    id: "1",
    license_key: "BG-RIP-DEMO-1234-5678",
    product_name: "Residential IP",
    product_slug: "residential-ip",
    plan_name: "Pro",
    status: "active",
    expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    license_key: "BG-CP-DEMO-ABCD-EFGH",
    product_name: "Cloud Phone",
    product_slug: "cloud-phone",
    plan_name: "Starter",
    status: "active",
    expires_at: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export default function LicensesPage() {
  const [licenses, setLicenses] = useState<License[]>(demoLicenses);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    const fetchLicenses = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("licenses")
        .select(`
          id,
          license_key,
          status,
          expires_at,
          created_at,
          hwid,
          products (name, slug),
          plans (name)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (data && data.length > 0) {
        const mappedLicenses = data.map((l: any) => ({
          id: l.id,
          license_key: l.license_key,
          product_name: l.products?.name || "Unknown",
          product_slug: l.products?.slug || "unknown",
          plan_name: l.plans?.name || "Unknown",
          status: l.status,
          expires_at: l.expires_at,
          created_at: l.created_at,
          hwid: l.hwid,
        }));
        setLicenses(mappedLicenses);
      }

      setLoading(false);
    };

    fetchLicenses();
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const filteredLicenses = licenses.filter(
    (license) =>
      license.license_key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      license.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const daysUntilExpiry = (date: string) => {
    return Math.ceil((new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="h-8 w-32 bg-white/10 rounded animate-pulse" />
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <Card key={i} className="bg-card/50 border-white/5">
              <CardContent className="p-6">
                <div className="h-20 bg-white/10 rounded animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Licenses</h1>
        <p className="text-muted-foreground mt-1">
          Manage your license keys and activations
        </p>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search licenses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/5 border-white/10"
          />
        </div>
      </div>

      {/* Licenses List */}
      <div className="space-y-4">
        {filteredLicenses.length > 0 ? (
          filteredLicenses.map((license) => {
            const IconComponent = iconMap[license.product_slug] || Key;
            const status = statusConfig[license.status as keyof typeof statusConfig] || statusConfig.active;
            const StatusIcon = status.icon;
            const days = daysUntilExpiry(license.expires_at);
            const isExpiringSoon = days <= 7 && days > 0;

            return (
              <Card key={license.id} className="bg-card/50 border-white/5">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Product Info */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-3 rounded-xl bg-emerald-500/10 shrink-0">
                        <IconComponent className="h-6 w-6 text-emerald-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-lg text-white">{license.product_name}</h3>
                          <Badge variant="outline" className={status.className}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {status.label}
                          </Badge>
                          {isExpiringSoon && (
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                              Expires in {days} days
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{license.plan_name} Plan</p>

                        {/* License Key */}
                        <div className="mt-3 flex items-center gap-2">
                          <code className="px-3 py-1.5 rounded bg-white/5 text-sm font-mono text-emerald-400">
                            {license.license_key}
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(license.license_key, license.id)}
                            className="text-muted-foreground hover:text-white"
                          >
                            {copiedKey === license.id ? (
                              <Check className="h-4 w-4 text-emerald-400" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>

                        {/* Meta Info */}
                        <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Created: {new Date(license.created_at).toLocaleDateString()}</span>
                          <span>Expires: {new Date(license.expires_at).toLocaleDateString()}</span>
                          {license.hwid && <span>HWID: {license.hwid.slice(0, 8)}...</span>}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 lg:flex-col lg:w-32">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-white/10"
                      >
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Renew
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 text-muted-foreground"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card className="bg-card/50 border-white/5">
            <CardContent className="p-12 text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 mb-4">
                <Key className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-white mb-2">No licenses found</h3>
              <p className="text-sm text-muted-foreground">
                {searchQuery
                  ? "Try adjusting your search query"
                  : "Purchase a product to get your first license"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
