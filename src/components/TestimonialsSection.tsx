
import React from "react";
import { BadgeAnimated } from "./ui/badge-animated";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "This is exactly what I've been looking for! I can generate content in different languages and reach a wider audience. Incredible tool!",
      author: "Alex Johnson",
      role: "Content Creator",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      quote: "The voice quality and natural-sounding translations have helped my channel grow by 300% in non-English speaking countries.",
      author: "Maria Garcia",
      role: "YouTuber",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      quote: "I've tried many translation tools, but TranslateMom offers the best combination of quality, speed, and price. A game-changer for my business.",
      author: "David Kim",
      role: "Digital Marketer",
      avatar: "https://randomuser.me/api/portraits/men/56.jpg",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <div
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <BadgeAnimated className="mb-6" variant="outline">
            Wall of Love
          </BadgeAnimated>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Used by creators and businesses across the world at
          </h2>
        </div>

        <div className="flex justify-center space-x-8 mb-16">
          {["Instagram", "Twitter", "YouTube", "TikTok", "Twitch"].map((platform, index) => (
            <div
              key={index}
              className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-300"
            >
              {/* Platform icons would go here */}
              <span className="text-xl font-semibold">{platform}</span>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-card p-6"
            >
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.author}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="max-w-4xl mx-auto mt-16 text-center rounded-xl bg-white dark:bg-gray-800 p-8 shadow-lg"
        >
          <div className="flex mb-4 justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className="w-6 h-6 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
          </div>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
            "We've seen over 45% growth in our YouTube channel thanks to the translated content in Spanish, French, German, and Arabic. This tool is incredible!"
          </p>
          
          <div className="flex items-center justify-center">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="Michael Brown"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div className="text-left">
              <h4 className="font-semibold">Michael Brown</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Head of Content @ TechReview
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
