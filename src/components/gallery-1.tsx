"use client";

import Image from "next/image";
import { WP_REST_API_Posts } from "wp-types";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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

  // Show 4 items by default, all items when expanded
  const visiblePosts = isExpanded ? posts : posts?.slice(0, 4);

  return (
    <section id="gallery" className="py-10 px-2">
      <div className="animation-reveal container mx-auto">
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold">{title1}</h2>
          <p className="mt-3 text-lg md:text-xl">{description1}</p>
        </div>

        <div className="my-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6x gap-2">
          {visiblePosts?.map((item, index) => {
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
          <p className="mb-3 text-lg md:text-xl">{description2}</p>
        </div>

        {posts && posts.length > 4 && (
          <div className="mt-6 text-center">
            <Button
              variant="primary"
              size="md"
              onClick={handleToggle}
              onKeyDown={handleKeyDown}
              aria-label={isExpanded ? "Show less items" : "Show more items"}
              aria-expanded={isExpanded}
              tabIndex={0}
            >
              {isExpanded ? "Show less" : "Show more"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
