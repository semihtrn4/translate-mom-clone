
import React from "react";
import { Badge } from "@/components/ui/badge";

const DemoSection = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <div
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            See it in Action - <span className="text-brand-orange">TranslateMom Demo</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Watch how easily you can translate your YouTube videos into multiple languages
            while maintaining the natural tone and voice quality.
          </p>
        </div>

        <div
          className="relative mx-auto max-w-5xl rounded-xl overflow-hidden shadow-2xl"
        >
          <div className="aspect-video relative">
            {/* This would be the actual video player in production */}
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <img 
                src="/lovable-uploads/9c992f41-0101-4b90-9261-58550f0b69f3.png" 
                alt="TranslateMom Demo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all duration-300">
                  <div className="w-16 h-16 bg-brand-orange rounded-full flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5V19L19 12L8 5Z" fill="white" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Demo UI Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              <div className="flex space-x-2">
                <Badge className="bg-brand-orange hover:bg-brand-orange/90">Original</Badge>
                <Badge className="bg-blue-500 hover:bg-blue-600">Spanish</Badge>
                <Badge className="bg-green-500 hover:bg-green-600">French</Badge>
                <Badge className="bg-purple-500 hover:bg-purple-600">German</Badge>
                <Badge className="bg-pink-500 hover:bg-pink-600">Japanese</Badge>
              </div>
              <div className="flex space-x-2">
                <Badge className="bg-black/60 hover:bg-black/80 backdrop-blur-sm">
                  HD
                </Badge>
                <Badge className="bg-black/60 hover:bg-black/80 backdrop-blur-sm">
                  CC
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 max-w-5xl mx-auto">
          {[
            {
              icon: "🌍",
              title: "Global Reach",
              description: "Expand your audience across the globe",
              rating: "4.9",
            },
            {
              icon: "⚡",
              title: "Fast Processing",
              description: "Get translations in minutes not days",
              rating: "4.8",
            },
            {
              icon: "🎯",
              title: "AI Precision",
              description: "Natural sounding voices & accurate translations",
              rating: "4.7",
            },
            {
              icon: "💰",
              title: "Cost Effective",
              description: "Save thousands on professional translation",
              rating: "4.9",
            },
          ].map((card, index) => (
            <div
              key={index}
              className="glass-card p-6 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 flex items-center justify-center text-2xl mb-4">
                {card.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {card.description}
              </p>
              <div className="mt-auto flex items-center">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm font-semibold">{card.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
