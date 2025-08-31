"use client";

import { useState } from "react";
import c from "clsx";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  description: string;
}

export function About1({ title, description }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="about" className="bg-green-200 px-2 py-10">
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
        <Button
          variant="primary"
          size="sm"
          className="lg:hidden"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Pročitaj manje" : "Pročitaj više"}
        </Button>
      </div>
    </section>
  );
}
