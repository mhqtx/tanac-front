import "./globals.css";
import c from "clsx";
import Image from "next/image";
import type { WP_REST_API_Posts, WP_REST_API_Page } from "wp-types";

export default async function Home() {
  const responseMainPage = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API}/pages/127`,
    {
      cache: "no-store",
    }
  );

  const res2 = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API}/service?_embed`,
    {
      cache: "no-store",
    }
  );

  const responsePosts = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API}/posts`,
    {
      cache: "no-store",
    }
  );

  const page: WP_REST_API_Page & {
    acf: {
      hero_title: string;
      hero_description: string;
      hero_primary_button_text: string;
      hero_secondary_button_text: string;
      hero_featured_image: string;

      about_title: string;
      about_description: string;
    };
  } = await responseMainPage.json();
  const services: WP_REST_API_Posts = await res2.json();
  const posts: WP_REST_API_Posts = await responsePosts.json();

  return (
    <>
      <section
        id="hero1"
        className="flex h-screen w-full flex-col bg-5 p-2 px-2 lg:p-12"
      >
        <div className="container flex h-full">
          <div className="flex w-full flex-col items-center justify-center lg:w-1/2 lg:pr-4 xl:pr-8">
            <div>
              <h1 className="text-3xl font-bold">{page?.acf?.hero_title}</h1>
              <p className="mb-4 mt-3 text-lg md:text-xl">
                {page?.acf?.hero_description}
              </p>
              <div className="mt-4 flex space-x-1">
                <button className="flex items-center justify-center capitalize font-bold h-5 bg-black text-white rounded-full px-6 py-2 text-sm transition-all duration-200 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-white/50 active:bg-neutral-900">
                  {page?.acf?.hero_primary_button_text}
                </button>
                <button className="flex items-center justify-center capitalize font-bold h-5 border border-black text-black bg-transparent rounded-full px-6 py-2 text-sm transition-all duration-200 focus:outline-none focus:ring-2">
                  {page?.acf?.hero_secondary_button_text}
                </button>
              </div>
            </div>
          </div>
          <div className="hidden w-1/2 justify-center text-center lg:flex lg:items-center">
            <Image
              alt=""
              src={page?.acf?.hero_featured_image}
              width={300}
              height={200}
            />
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
            {page?.acf?.about_title}
          </h2>
          <div
            className={c("relative gap-x-8 overflow-hidden lg:columns-2", {
              // "h-[180px] lg:h-auto": !textExpanded,
            })}
          >
            <div className="mb-2 space-y-2 text-lg">
              {page?.acf?.about_description}
            </div>
            {/* {!textExpanded && ( */}
            <>
              <div className="absolute bottom-0 left-0 h-[180px] w-full bg-gradient-to-t from-foreground-accent-1 to-transparent lg:hidden"></div>
            </>
            {/* )} */}
          </div>
          <button
            // onClick={() => setTextExpanded((prev) => !prev)}
            className="lg:hidden"
          >
            {/* {textExpanded ? "Read less" : "Read more"} */}
            Read less
          </button>
        </div>
      </section>

      <div
        id="services1"
        className="flex bg-foreground-primary px-2 py-10 lg:py-10"
      >
        <div className="animation-reveal container">
          <div className="xl:flex xl:space-x-10">
            <div className="mb-10 xl:w-[35%]">
              {/* TODO: Add photo here? */}
              {/* <h2 className="text-3xl font-bold">{title}</h2>
            <p className="mb-4 mt-3 text-lg md:text-xl">{text}</p>
            <div>{cta}</div> */}
            </div>
            <div className="flex flex-wrap xl:w-[65%]">
              {services.map((item, index) => (
                <div
                  key={index}
                  className="mb-4 flex w-full flex-col rounded-xl pr-2 last:mb-0 md:w-1/2 lg:w-1/2"
                >
                  <div className="flex items-center space-x-1">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-secondary">
                      {++index}
                    </span>
                    <h3 className="text-lg font-bold">{item.title.rendered}</h3>
                  </div>
                  <div className="my-2 h-[1px] w-full bg-gradient-to-r from-primary" />
                  <p>{item.content.rendered}</p>
                  {/* <p>{item._embedded["wp:featuredmedia"].source_url}</p> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <h2>posts:</h2>
      {posts.map((item) => item.title.rendered)}
    </>
  );
}
