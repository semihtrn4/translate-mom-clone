
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BadgeAnimated } from "@/components/ui/badge-animated";

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="pt-28 lg:pt-32 pb-16 md:pb-20 lg:pb-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div
              className="max-w-4xl mx-auto text-center"
            >
              <BadgeAnimated variant="default" className="mb-6">
                About Us
              </BadgeAnimated>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Making content{" "}
                <span className="heading-gradient">accessible worldwide</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                We're on a mission to break language barriers and help creators
                expand their reach globally through cutting-edge AI translation
                technology.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Our Story
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  TranslateMom was founded in 2021 by a team of language
                  enthusiasts and AI experts who saw the potential of machine
                  learning to transform content translation and dubbing.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  What started as a small project to help YouTube creators reach
                  international audiences has grown into a comprehensive platform
                  used by thousands of content creators, businesses, and
                  organizations worldwide.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Our team now spans 15 countries, bringing together expertise in
                  AI, linguistics, voice technology, and content creation to
                  build the most advanced video translation platform available.
                </p>
              </div>

              <div
                className="rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800&h=600"
                  alt="Our Team"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div
              className="max-w-4xl mx-auto text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Values
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                These core principles guide everything we do at TranslateMom.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: "🌍",
                  title: "Accessibility",
                  description:
                    "We believe knowledge and content should be accessible regardless of language barriers.",
                },
                {
                  icon: "⚙️",
                  title: "Innovation",
                  description:
                    "We're committed to pushing the boundaries of what's possible with AI translation technology.",
                },
                {
                  icon: "🤝",
                  title: "Community",
                  description:
                    "We support creators and businesses in building global communities through better communication.",
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className="glass-card p-6"
                >
                  <div className="text-3xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div
              className="max-w-5xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Join us in making the world more connected
              </h2>
              <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                Start Translating Today
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
