"use client";

import Image from "next/image";
import { WP_REST_API_Posts } from "wp-types";
import React, { useState, useEffect } from "react";
import c from "clsx";

type WpFeaturedMedia = {
  source_url: string;
};

interface GalleryProps {
  posts: WP_REST_API_Posts;
  title1: string;
  description1: string;
  description2: string;
}

export function Gallery1({
  posts,
  title1,
  description1,
  description2,
}: GalleryProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleToggle();
    }
  };

  const [screenSize, setScreenSize] = useState<
    "mobile" | "sm" | "lg" | "xl" | "2xl"
  >("lg");

  // Update screen size on mount and resize
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width >= 1536) setScreenSize("2xl");
      else if (width >= 1280) setScreenSize("xl");
      else if (width >= 1024) setScreenSize("lg");
      else if (width >= 640) setScreenSize("sm");
      else setScreenSize("mobile");
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  // Get the initial visible count based on screen size (for collapsed state)
  const getInitialVisibleCount = () => {
    switch (screenSize) {
      case "mobile":
        return 1;
      case "sm":
        return 2;
      case "lg":
        return 3;
      case "xl":
        return 4;
      case "2xl":
        return 5;
      default:
        return 3;
    }
  };

  // Show only first row by default based on screen size
  const getVisibleCount = () => {
    if (isExpanded) return posts.length;
    return getInitialVisibleCount();
  };
  return (
    <section id="gallery1" className="py-10 px-2">
      <div className="animation-reveal container mx-auto">
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold">{title1}</h2>
          <p className="mt-3 text-lg md:text-xl">{description1}</p>
        </div>

        <div
          className={c("my-4 grid gap-2", {
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5":
              isExpanded,
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3": !isExpanded,
          })}
        >
          {posts?.slice(0, getVisibleCount()).map((item, index) => {
            const imageUrl =
              (
                item._embedded?.["wp:featuredmedia"]?.[0] as
                  | WpFeaturedMedia
                  | undefined
              )?.source_url ?? "";

            return (
              <div
                key={index}
                className="relative aspect-[200/320] w-full overflow-hidden rounded-xl bg-red-50"
              >
                <Image alt="" src={imageUrl} fill className="object-cover" />

                <div className="absolute top-0 w-full rounded-tl-xl rounded-tr-xl bg-gradient-to-b from-black/50 to-transparent p-2 pb-[50%] text-left text-white">
                  <h6 className="font-medium">{item.title?.rendered}</h6>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lg:w-1/2">
          <p className="mb-3">{description2}</p>
        </div>

        <div className="mt-6 text-center">
          <button
            className="flex items-center justify-center capitalize font-bold h-5 border border-black text-black bg-transparent rounded-full px-6 py-2 text-sm transition-all duration-200 focus:outline-none focus:ring-2 hover:bg-black hover:text-white"
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
            aria-label={isExpanded ? "Show less items" : "Show more items"}
            aria-expanded={isExpanded}
            tabIndex={0}
          >
            {isExpanded ? "Show less" : "Show more"}
          </button>
        </div>
      </div>
    </section>
  );
}
