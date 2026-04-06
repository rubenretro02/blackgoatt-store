"use client";

export function TrustedBy() {
  return (
    <section className="relative py-16 border-y border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-muted-foreground mb-8">
          Trusted by privacy-conscious users worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-40">
          {["Enterprise Ready", "SOC 2 Compliant", "GDPR Friendly", "No-Log Audited", "24/7 Support"].map((item) => (
            <span key={item} className="text-sm font-medium text-white/60 tracking-wider uppercase">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
