"use client";

import { useState } from "react";
import c from "clsx";

interface AboutSectionProps {
  title: string;
  description: string;
}

const AboutSection = ({ title, description }: AboutSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="about1" className="bg-green-200 px-2 py-10">
      <div className="animation-reveal container mx-auto">
        <h2 className="mb-3 text-3xl font-bold lg:w-1/2">{title}</h2>
        <div
          className={c(
            "relative gap-x-8 lg:columns-2",
            !isExpanded && "overflow-hidden"
          )}
          style={{
            maxHeight: isExpanded ? "none" : "180px",
            transition: "max-height 0.3s ease-in-out",
          }}
        >
          <div className="mb-2 space-y-2 text-lg">{description}</div>
          {!isExpanded && (
            <div className="absolute bottom-0 left-0 h-[180px] w-full bg-gradient-to-t from-green-200 to-transparent lg:hidden"></div>
          )}
        </div>
        <button
          className="lg:hidden flex items-center justify-center capitalize font-bold h-5 bg-black text-white rounded-full px-6 py-2 text-sm transition-all duration-200 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-white/50 active:bg-neutral-900"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Read less" : "Read more"}
        </button>
      </div>
    </section>
  );
};

export default AboutSection;
