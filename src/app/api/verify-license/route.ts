import { NextRequest, NextResponse } from "next/server";
import type { VerifyLicenseRequest, VerifyLicenseResponse } from "@/lib/types";

// In production, this would query the database
const mockLicenses = [
  {
    license_key: "BG-VPN-TEST-1234-5678",
    product_type: "vpn",
    status: "active",
    expires_at: "2026-12-31T23:59:59Z",
    plan_tier: "pro",
    limits: {
      connections: 5,
    },
  },
  {
    license_key: "BG-CP-TEST-1234-5678",
    product_type: "cloudphone",
    status: "active",
    expires_at: "2026-12-31T23:59:59Z",
    plan_tier: "starter",
    limits: {
      instances: 1,
    },
  },
  {
    license_key: "BG-GEO-TEST-1234-5678",
    product_type: "geo",
    status: "active",
    expires_at: "2026-12-31T23:59:59Z",
    plan_tier: "pro",
    limits: {
      api_calls: 10000,
    },
  },
];

export async function POST(request: NextRequest) {
  try {
    const body: VerifyLicenseRequest = await request.json();
    const { license_key, product_type, hwid } = body;

    if (!license_key || !product_type) {
      return NextResponse.json<VerifyLicenseResponse>(
        {
          valid: false,
          error: "Missing required fields: license_key, product_type",
        },
        { status: 400 }
      );
    }

    // In production, query the database
    // const supabase = createClient();
    // const { data: license, error } = await supabase
    //   .from('licenses')
    //   .select('*, plans(*)')
    //   .eq('license_key', license_key)
    //   .eq('product_type', product_type)
    //   .single();

    // Mock lookup
    const license = mockLicenses.find(
      (l) => l.license_key === license_key && l.product_type === product_type
    );

    if (!license) {
      return NextResponse.json<VerifyLicenseResponse>(
        {
          valid: false,
          error: "License not found",
        },
        { status: 404 }
      );
    }

    // Check if expired
    if (new Date(license.expires_at) < new Date()) {
      return NextResponse.json<VerifyLicenseResponse>(
        {
          valid: false,
          error: "License expired",
        },
        { status: 403 }
      );
    }

    // Check if suspended
    if (license.status !== "active") {
      return NextResponse.json<VerifyLicenseResponse>(
        {
          valid: false,
          error: `License ${license.status}`,
        },
        { status: 403 }
      );
    }

    // Optional: HWID binding check
    // if (hwid && license.hwid && license.hwid !== hwid) {
    //   return NextResponse.json<VerifyLicenseResponse>(
    //     {
    //       valid: false,
    //       error: "HWID mismatch",
    //     },
    //     { status: 403 }
    //   );
    // }

    return NextResponse.json<VerifyLicenseResponse>({
      valid: true,
      license: {
        id: license.license_key,
        status: license.status as "active",
        expires_at: license.expires_at,
        plan_tier: license.plan_tier as "starter" | "pro" | "enterprise",
        limits: license.limits,
      },
    });
  } catch (error) {
    console.error("License verification error:", error);
    return NextResponse.json<VerifyLicenseResponse>(
      {
        valid: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}

// GET endpoint for simple health check
export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "BlackGoatt License API",
    version: "1.0.0",
  });
}
