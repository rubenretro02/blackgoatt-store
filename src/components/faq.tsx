"use client";

import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do crypto payments work?",
    answer: "We accept Bitcoin, Ethereum, USDT, Litecoin, and many other cryptocurrencies through NowPayments and Cryptomus. Simply select your plan, choose crypto as payment method, and complete the transaction. Your service activates instantly upon confirmation.",
  },
  {
    question: "Is KYC required?",
    answer: "No KYC is required for individual plans paid with cryptocurrency. Enterprise plans may require basic verification for compliance purposes, but we minimize data collection.",
  },
  {
    question: "Can I use all products with one account?",
    answer: "Yes! Your BlackGoatt account gives you access to all services - VPN, Cloud Phone, and Geo Services. Each product has its own dashboard but shares the same authentication.",
  },
  {
    question: "What is your refund policy?",
    answer: "We offer a 7-day money-back guarantee for all plans. If you're not satisfied, contact support within 7 days of purchase for a full refund. Crypto refunds are processed in the original currency.",
  },
  {
    question: "Do you keep logs?",
    answer: "We maintain a strict no-logs policy. We don't track, store, or monitor your browsing activity, connection timestamps, or any other personal data that could identify you.",
  },
  {
    question: "Which VPN protocols do you support?",
    answer: "We use WireGuard as our primary protocol for its speed and security. It offers better performance than OpenVPN while maintaining military-grade encryption.",
  },
  {
    question: "How many devices can I connect?",
    answer: "The number of simultaneous connections depends on your plan. Starter allows 1 connection, Pro allows 5, and Enterprise offers unlimited connections.",
  },
  {
    question: "Can I change my subscription plan?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, the new price is prorated. When downgrading, the change takes effect at your next billing cycle.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative py-32 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400 mb-4">
            FAQ
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="text-white">Frequently Asked</span>{" "}
            <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about our services.
          </p>
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-white/10 rounded-xl px-6 bg-white/[0.01] data-[state=open]:bg-white/[0.03] data-[state=open]:border-emerald-500/20"
            >
              <AccordionTrigger className="text-left text-white hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Support CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Still have questions? We're here to help.
          </p>
          <a
            href="mailto:support@blackgoatt.com"
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Contact Support
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
