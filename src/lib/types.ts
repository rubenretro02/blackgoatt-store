export type ProductType = "vpn" | "cloudphone" | "geo";

export type PlanTier = "starter" | "pro" | "enterprise";

export type OrderStatus = "pending" | "completed" | "failed" | "refunded";

export type LicenseStatus = "active" | "expired" | "suspended" | "cancelled";

export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  type: ProductType;
  description: string;
  features: string[];
  icon: string;
  subdomain: string;
}

export interface Plan {
  id: string;
  product_id: string;
  tier: PlanTier;
  name: string;
  price_monthly: number;
  price_yearly: number;
  features: string[];
  limits: {
    connections?: number;
    instances?: number;
    storage_gb?: number;
    api_calls?: number;
  };
}

export interface Order {
  id: string;
  user_id: string;
  plan_id: string;
  amount: number;
  currency: string;
  payment_method: "crypto" | "card";
  payment_provider: "nowpayments" | "cryptomus" | "stripe";
  payment_id?: string;
  status: OrderStatus;
  created_at: string;
  completed_at?: string;
}

export interface License {
  id: string;
  user_id: string;
  product_id: string;
  plan_id: string;
  order_id: string;
  license_key: string;
  status: LicenseStatus;
  expires_at: string;
  created_at: string;
  metadata?: Record<string, unknown>;
}

export interface UserProduct {
  id: string;
  license: License;
  product: Product;
  plan: Plan;
  usage?: {
    connections_used?: number;
    instances_used?: number;
    storage_used_gb?: number;
    api_calls_used?: number;
  };
}

// API Response types
export interface VerifyLicenseRequest {
  license_key: string;
  product_type: ProductType;
  hwid?: string;
}

export interface VerifyLicenseResponse {
  valid: boolean;
  license?: {
    id: string;
    status: LicenseStatus;
    expires_at: string;
    plan_tier: PlanTier;
    limits: Plan["limits"];
  };
  error?: string;
}
