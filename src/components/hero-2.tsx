"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  featuredImage: string;
  trustedByText?: string;
  companyLogos?: string[];
  contactPhone: string;
}

export function Hero2({
  title,
  description,
  primaryButtonText,
  secondaryButtonText,
  featuredImage,
  contactPhone,
}: Props) {
  return (
    <section
      id="hero"
      className="flex items-center relative min-h-screen w-full bg-white px-2"
    >
      <div className="container mx-auto">
        <div className="grid h-full items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-900">
              {title}
            </h1>
            <p className="text-xl text-gray-600 sm:text-2xl">{description}</p>

            <div className="mt-4 flex flex-col space-y-2 sm:flex-row sm:space-x-2">
              <Button variant="primary" size="md" href={`tel:${contactPhone}`}>
                {primaryButtonText}
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={() => {
                  const element = document.querySelector("#about");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {secondaryButtonText}
              </Button>
            </div>
          </div>
          <div className="hidden lg:flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              {featuredImage ? (
                <Image
                  alt="Hero illustration"
                  src={featuredImage}
                  width={500}
                  height={400}
                  className="w-full h-auto object-contain"
                  priority
                />
              ) : (
                <div className="flex h-80 w-full items-center justify-center rounded-lg bg-gray-100">
                  <div className="text-center">
                    <div className="mb-4 text-6xl">🎨</div>
                    <p className="text-gray-500">Illustration placeholder</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
