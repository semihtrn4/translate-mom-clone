
import React from "react";
import Header from "@/components/Header";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BadgeAnimated } from "@/components/ui/badge-animated";

const Pricing = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="pt-28 lg:pt-32 pb-16 md:pb-20 lg:pb-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div
              className="max-w-4xl mx-auto text-center"
            >
              <BadgeAnimated
                variant="gradient"
                animation="pulse"
                className="mb-6"
              >
                50% OFF for a limited time!
              </BadgeAnimated>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Simple pricing for{" "}
                <span className="heading-gradient">everyone</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                Whether you're a creator, business, or enterprise, we have a plan
                that fits your needs. All plans include our core features with
                different limits.
              </p>

              <div className="flex justify-center space-x-4 mb-8">
                <Button
                  className="bg-brand-orange hover:bg-brand-orange/90 text-white"
                  size="lg"
                >
                  Start Free Trial
                </Button>
                <Button variant="outline" size="lg">
                  Contact Sales
                </Button>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                No credit card required. Cancel anytime.
              </p>
            </div>
          </div>
        </section>
        <PricingSection />
        <TestimonialsSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
