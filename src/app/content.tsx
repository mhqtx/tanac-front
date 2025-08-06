import { useState } from "react";
import "./globals.css";
import c from "clsx";

export default async function Home() {
  const res = await fetch("http://localhost/tanac-2/wp-json/wp/v2/pages", {
    cache: "no-store", // disables caching for SSR (like getServerSideProps)
  });

  const pages = await res.json();

  // console.log("Fetched pages:", pages); // appears in terminal/server log

  const page = pages.filter((page) => page.template === "home-page.php")?.[0];

  console.log({ page });

  const [textExpanded, setTextExpanded] = useState(false);

  return (
    <>
      <section
        id="hero1"
        className="flex h-screen w-full flex-col bg-5 p-2 px-2 lg:p-12"
      >
        <div className="container flex h-full">
          <div className="flex w-full flex-col items-center justify-center lg:w-1/2 lg:pr-4 xl:pr-8">
            <div>
              <h1 className="text-3xl font-bold">
                {page?.acf_grouped?.hero?.title}
              </h1>
              <p className="mb-4 mt-3 text-lg md:text-xl">
                {page?.acf_grouped?.hero?.description}
              </p>
              <div className="mt-4 flex space-x-1">cta</div>
            </div>
          </div>
          <div className="hidden w-1/2 justify-center text-center lg:flex lg:items-center">
            media
          </div>
        </div>
      </section>

      <section
        id="about1"
        className="bg-foreground-accent-1 px-2 py-10"
        // {...rest}
      >
        <div className="animation-reveal container">
          <h2 className="mb-3 text-3xl font-bold lg:w-1/2">
            {page?.acf_grouped?.about?.title}
          </h2>
          <div
            className={c("relative gap-x-8 overflow-hidden lg:columns-2", {
              "h-[180px] lg:h-auto": !textExpanded,
            })}
          >
            <div className="mb-2 space-y-2 text-lg">
              {page?.acf_grouped?.about?.description}
            </div>
            {!textExpanded && (
              <>
                <div className="absolute bottom-0 left-0 h-[180px] w-full bg-gradient-to-t from-foreground-accent-1 to-transparent lg:hidden"></div>
              </>
            )}
          </div>
          <button
            onClick={() => setTextExpanded((prev) => !prev)}
            className="lg:hidden"
          >
            {textExpanded ? "Read less" : "Read more"}
          </button>
        </div>
      </section>
    </>
  );
}
