
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import SignupModal from "./SignupModal";

const HeroSection = () => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!youtubeUrl) return;

    // Open signup modal instead of processing
    setIsSignupModalOpen(true);
  };

  return (
    <section className="pt-28 lg:pt-32 pb-16 md:pb-20 lg:pb-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div
          className="max-w-4xl mx-auto text-center"
        >
          <Badge variant="outline" className="mb-6 py-1.5 px-6 text-sm font-medium bg-white/30 backdrop-blur-sm border-gray-200 shadow-sm">
            <span className="text-brand-orange mr-2">🔥 NEW</span> Text-to-speech in 100+ languages!
          </Badge>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="heading-gradient">Translate, dub</span> and caption{" "}
            <span className="highlight-youtube px-2 py-1">YouTube</span> to any language{" "}
            <span className="text-brand-orange">in seconds</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Save time, multiply your reach, and get more views by translating your videos to any language with AI-powered tools.
          </p>

          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 mb-8">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Paste YouTube URL"
                  className="w-full py-6 px-4 pr-12 rounded-lg border-gray-300 shadow-sm focus:ring-brand-orange focus:border-brand-orange"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M21 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z"
                    ></path>
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M10 9l5 3-5 3V9z"
                    ></path>
                  </svg>
                </div>
              </div>
              <Button 
                type="submit" 
                className={cn(
                  "w-full sm:w-auto whitespace-nowrap py-6 px-8 bg-brand-orange hover:bg-brand-orange/90 text-white font-medium transition-all duration-200",
                  isLoading && "opacity-90 cursor-not-allowed"
                )}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Sign Up Free"}
              </Button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center">
                <Check size={16} className="text-brand-orange mr-2" />
                <span>Fast & Accurate AI</span>
              </div>
              <div className="flex items-center">
                <Check size={16} className="text-brand-orange mr-2" />
                <span>100+ Languages</span>
              </div>
              <div className="flex items-center">
                <Check size={16} className="text-brand-orange mr-2" />
                <span>Custom Voice Options</span>
              </div>
              <div className="flex items-center">
                <Check size={16} className="text-brand-orange mr-2" />
                <span>Adjustable Speed Control</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SignupModal */}
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
      />
    </section>
  );
};

export default HeroSection;
