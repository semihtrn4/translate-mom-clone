
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { BadgeAnimated } from "./ui/badge-animated";
import { Check } from "lucide-react";

const PricingSection = () => {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  const pricingPlans = [
    {
      name: "Lifetime Plan",
      price: billingPeriod === "monthly" ? 299 : 299,
      description: "Pay once, use forever",
      features: [
        "Unlimited Translations",
        "All 100+ Languages",
        "No Monthly Fees Ever",
        "All Premium Voices",
        "Unlimited Video Minutes",
        "Automatic Subtitles",
        "Custom Voice Training",
        "Emotion Preservation",
        "Lifetime Updates",
        "Priority Support",
        "Team Collaboration",
        "Premium Templates",
      ],
      popular: false,
      discount: "",
      buttonText: "Get Lifetime Access",
    },
    {
      name: "Pro Plan",
      price: billingPeriod === "monthly" ? 22 : 15,
      description: "Most popular choice for creators",
      features: [
        "100 Minutes/Month",
        "All 100+ Languages",
        "All Premium Voices",
        "Automatic Subtitles",
        "Custom Voice Creation",
        "Emotion Preservation",
        "Priority Support",
        "API Access",
        "Team Collaboration (3 seats)",
      ],
      popular: true,
      discount: "31% OFF",
      buttonText: "Start Pro Plan",
    },
    {
      name: "Plus Plan",
      price: billingPeriod === "monthly" ? 9 : 6,
      description: "Great for personal use",
      features: [
        "30 Minutes/Month",
        "20 Languages",
        "Standard Voices Only",
        "Automatic Subtitles",
        "Basic Customization",
        "Standard Support",
      ],
      popular: false,
      discount: "33% OFF",
      buttonText: "Start Plus Plan",
    },
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Fiyatlandırma Planları
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Choose the perfect plan for your needs. All plans include our core features with different limits and capabilities.
          </p>

          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg inline-flex">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                  billingPeriod === "monthly"
                    ? "bg-white dark:bg-gray-700 shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod("yearly")}
                className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                  billingPeriod === "yearly"
                    ? "bg-white dark:bg-gray-700 shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-xl border ${
                plan.popular
                  ? "border-brand-orange shadow-xl scale-105 z-10"
                  : "border-gray-200 dark:border-gray-700"
              } bg-white dark:bg-gray-800 overflow-hidden transition-all duration-300 hover:shadow-lg`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-brand-orange text-white text-xs font-semibold py-1.5 text-center">
                  MOST POPULAR
                </div>
              )}

              <div className="p-6 pt-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                  {plan.description}
                </p>

                <div className="mb-6">
                  <div className="flex items-end mb-2">
                    <span className="text-4xl font-bold">
                      ${plan.price}
                    </span>
                    {billingPeriod === "monthly" ? (
                      <span className="text-gray-500 dark:text-gray-400 ml-1 mb-1">
                        /month
                      </span>
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400 ml-1 mb-1">
                        /month, billed yearly
                      </span>
                    )}
                  </div>
                  {plan.discount && (
                    <BadgeAnimated className="text-xs" variant="gradient">
                      {plan.discount}
                    </BadgeAnimated>
                  )}
                </div>

                <Button 
                  className={`w-full mb-6 ${
                    plan.popular
                      ? "bg-brand-orange hover:bg-brand-orange/90"
                      : "bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600"
                  } text-white`}
                >
                  {plan.buttonText}
                </Button>

                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-start"
                    >
                      <Check size={16} className="text-brand-orange mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
