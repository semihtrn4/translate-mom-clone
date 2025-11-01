
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaqSection = () => {
  const faqs = [
    {
      question: "What languages do you support?",
      answer:
        "We support over 100 languages including English, Spanish, French, German, Italian, Portuguese, Russian, Japanese, Chinese, Korean, Arabic, and many more. Our AI-powered translation ensures high-quality results across all supported languages.",
    },
    {
      question: "What types of files can I translate and dub?",
      answer:
        "You can translate and dub YouTube videos by simply pasting the URL. We automatically extract the audio, transcribe it, translate it to your desired language, and generate dubbed audio with natural-sounding voices.",
    },
    {
      question: "What are the pricing plans and limits?",
      answer:
        "We offer three main plans: Plus, Pro, and Lifetime. The Plus plan starts at $9/month and includes 30 minutes of translation per month. The Pro plan at $22/month offers 100 minutes and additional features. The Lifetime plan is a one-time payment of $299 with unlimited usage forever. All plans include our core features with different limits.",
    },
    {
      question: "Why is human pitch control useful?",
      answer:
        "Human pitch control lets you adjust the tone and emotion of the generated voice to match your original content more closely. This creates a more authentic and engaging experience for your viewers, making the translation feel more natural.",
    },
    {
      question: "What can machine-dubs do that standard dubs can't?",
      answer:
        "Machine-dubs use advanced AI to preserve the original speaker's emotion, tone, and pacing while speaking a different language. Standard dubs often lose these subtle qualities. Our technology ensures the dubbed content maintains the emotional impact and nuance of the original.",
    },
    {
      question: "How does Automatic Speaker Detection (ASD) work?",
      answer:
        "Our Automatic Speaker Detection technology identifies different speakers in your content and assigns appropriate voices to each in the translated version. This ensures multi-person videos maintain the distinction between speakers, creating a more natural viewing experience.",
    },
    {
      question: "How do I sign up for TranslateMom?",
      answer:
        "Simply click the 'Try for Free' button at the top of the page, create an account, and you'll have immediate access to our platform. You can start with a free trial and upgrade to a paid plan when you're ready.",
    },
    {
      question: "Do you offer custom enterprise solutions?",
      answer:
        "Yes, we offer custom enterprise solutions for businesses with specific needs. Contact our sales team for custom pricing and features tailored to your organization's requirements.",
    },
    {
      question: "How accurate are the translations?",
      answer:
        "Our translations are powered by advanced AI models that provide high accuracy across supported languages. While no machine translation is perfect, our technology produces professional-quality results that capture the meaning and context of the original content.",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Find answers to common questions about our service, features, and capabilities.
          </p>
        </div>

        <div
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div
          className="mt-12 text-center"
        >
          <p className="text-gray-600 dark:text-gray-300">
            Still have questions?{" "}
            <a href="#" className="text-brand-orange hover:underline">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
