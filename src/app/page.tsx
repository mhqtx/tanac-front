import "./globals.css";
import c from "clsx";
import Image from "next/image";
import type { WP_REST_API_Posts, WP_REST_API_Page } from "wp-types";

async function safeFetch<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as T;
  } catch (err) {
    console.error(`Fetch failed for ${url}:`, err);
    return null;
  }
}

export default async function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API;

  const page = await safeFetch<
    WP_REST_API_Page & {
      acf: {
        hero_title: string;
        hero_description: string;
        hero_primary_button_text: string;
        hero_secondary_button_text: string;
        hero_featured_image: string;
        about_title: string;
        about_description: string;
        services_title: string;
        services_description: string;
        cta_title: string;
        cta_description: string;
      };
    }
  >(`${baseUrl}/pages/127`);

  const services = await safeFetch<WP_REST_API_Posts>(
    `${baseUrl}/service?_embed`
  );

  const posts = await safeFetch<WP_REST_API_Posts>(`${baseUrl}/posts`);

  return (
    <>
      {/* HERO */}
      <section
        id="hero1"
        className="flex h-screen w-full flex-col bg-5 p-2 px-2 lg:p-12"
      >
        <div className="container flex h-full">
          <div className="flex w-full flex-col items-center justify-center lg:w-1/2 lg:pr-4 xl:pr-8">
            <div>
              <h1 className="text-3xl font-bold">
                {page?.acf?.hero_title ?? "Default Hero Title"}
              </h1>
              <p className="mb-4 mt-3 text-lg md:text-xl">
                {page?.acf?.hero_description ??
                  "Default hero description goes here."}
              </p>
              <div className="mt-4 flex space-x-1">
                <button className="flex items-center justify-center capitalize font-bold h-5 bg-black text-white rounded-full px-6 py-2 text-sm transition-all duration-200 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-white/50 active:bg-neutral-900">
                  {page?.acf?.hero_primary_button_text ?? "Primary Action"}
                </button>
                <button className="flex items-center justify-center capitalize font-bold h-5 border border-black text-black bg-transparent rounded-full px-6 py-2 text-sm transition-all duration-200 focus:outline-none focus:ring-2">
                  {page?.acf?.hero_secondary_button_text ?? "Secondary Action"}
                </button>
              </div>
            </div>
          </div>
          <div className="hidden w-1/2 justify-center text-center lg:flex lg:items-center">
            {page?.acf?.hero_featured_image ? (
              <Image
                alt=""
                src={page.acf.hero_featured_image}
                width={300}
                height={200}
              />
            ) : (
              <div className="w-[300px] h-[200px] bg-gray-200" />
            )}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about1" className="bg-green-200 px-2 py-10">
        <div className="animation-reveal container mx-auto">
          <h2 className="mb-3 text-3xl font-bold lg:w-1/2">
            {page?.acf?.about_title ?? "About Us"}
          </h2>
          <div className={c("relative gap-x-8 overflow-hidden lg:columns-2")}>
            <div className="mb-2 space-y-2 text-lg">
              {page?.acf?.about_description ??
                "Default about section description."}
            </div>
            <div className="absolute bottom-0 left-0 h-[180px] w-full bg-gradient-to-t from-foreground-accent-1 to-transparent lg:hidden"></div>
          </div>
          <button className="lg:hidden">Read less</button>
        </div>
      </section>

      {/* SERVICES */}
      <div
        id="services1"
        className="flex bg-foreground-primary px-2 py-10 lg:py-10"
      >
        <div className="animation-reveal container mx-auto">
          <div className="xl:flex xl:space-x-10">
            <div className="mb-10 xl:w-[35%]">
              {/* TODO: Add photo here? */}
              <h2 className="text-3xl font-bold">
                {page?.acf?.services_title ?? "..."}
              </h2>
              <p className="mb-4 mt-3 text-lg md:text-xl">
                {page?.acf?.services_description ?? "..."}
              </p>
              <div>
                <button className="flex items-center justify-center capitalize font-bold h-5 bg-black text-white rounded-full px-6 py-2 text-sm transition-all duration-200 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-white/50 active:bg-neutral-900">
                  Message Us
                </button>
              </div>
            </div>
            <div className="flex flex-wrap xl:w-[65%]">
              {services?.length ? (
                services.map((item, index) => (
                  <div
                    key={index}
                    className="mb-4 flex w-full flex-col rounded-xl pr-2 last:mb-0 md:w-1/2 lg:w-1/2"
                  >
                    <div className="flex items-center space-x-1">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black font-bold text-white">
                        {index + 1}
                      </span>
                      <h3 className="text-lg font-bold">
                        {item.title?.rendered ?? "Untitled Service"}
                      </h3>
                    </div>
                    <div className="my-2 h-[1px] w-full bg-gradient-to-r from-primary" />
                    <p>{item.content?.rendered ?? ""}</p>
                  </div>
                ))
              ) : (
                <p>No services available.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* POSTS */}
      <section className="px-2 py-6">
        <h2 className="mb-4 text-2xl font-bold">Posts:</h2>
        {posts?.length ? (
          posts.map((item, i) => (
            <p key={i}>{item.title?.rendered ?? "Untitled Post"}</p>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </section>

      <section id="callToAction1" className="w-full bg-green-200 px-2 py-10">
        <div className="animation-reveal container text-center lg:w-1/2 mx-auto">
          {/* {icon && (
            <span className="mx-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-3xl font-bold text-secondary text-white">
              {icon}
            </span>
          )} */}
          <h2 className="mt-2 space-x-1 text-3xl">
            {page?.acf?.cta_title ?? ""}
          </h2>
          <p className="mb-4 mt-3 text-lg md:text-xl">
            {page?.acf?.cta_description ?? ""}
          </p>
          <button className="mx-auto flex items-center justify-center capitalize font-bold h-5 bg-black text-white rounded-full px-6 py-2 text-sm transition-all duration-200 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-white/50 active:bg-neutral-900">
            Message Us
          </button>
          {/* <div>{cta}</div> */}
        </div>
      </section>
    </>
  );
}
