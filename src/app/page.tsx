import { About1 } from "@/components/about-1";
import "./globals.css";
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

type WpFeaturedMedia = {
  source_url: string;
};

export default async function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API;

  // Fetch pages data and console log
  const pagesData = await safeFetch(`${baseUrl}/pages`);
  console.log("Pages data:", pagesData);

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
        contact_title: string;
        contact_description: string;
        contact_email: string;
        contact_address: string;
        contact_google_map: string;
        contact_person: string;
        contact_phone: string;
        posts_title_1: string;
        posts_description_1: string;
        posts_title_2: string;
        posts_description_2: string;
        contact_working_hours: string;
      };
    }
  >(`${baseUrl}/pages/127`);

  const services = await safeFetch<WP_REST_API_Posts>(
    `${baseUrl}/service?_embed`
  );

  const posts = await safeFetch<WP_REST_API_Posts>(`${baseUrl}/posts?_embed`);

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

      <About1
        title={page?.acf?.about_title ?? "..."}
        description={page?.acf?.about_description ?? "..."}
      />

      {/* GALLERY */}
      <section id="gallery1" className="bg-foreground-primary py-10">
        <div className="animation-reveal container px-2">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold">
              {page?.acf?.posts_title_1 ?? "..."}
            </h2>
            <p className="mt-3 text-lg md:text-xl">
              {page?.acf?.posts_description_1 ?? ""}
            </p>
          </div>
        </div>

        {posts?.length ? (
          posts.map((item, i) => {
            const imageUrl =
              (
                item._embedded?.["wp:featuredmedia"]?.[0] as
                  | WpFeaturedMedia
                  | undefined
              )?.source_url ?? "";

            return (
              <div
                key={i}
                className="relative mx-2 h-[489px] w-[275px] overflow-hidden rounded-xl bg-red-50"
              >
                <Image alt="" src={imageUrl} fill className="object-cover" />

                <div className="absolute top-0 w-full rounded-tl-xl rounded-tr-xl bg-gradient-to-b from-black/50 to-transparent p-2 pb-[50%] text-left text-white">
                  <h6 className="font-medium">{item.title?.rendered}</h6>
                </div>
              </div>
            );
          })
        ) : (
          <p>No posts available.</p>
        )}

        <div className="container px-2">
          <div className="lg:w-1/2">
            <h3 className="mb-1 text-2xl font-bold">
              {page?.acf?.posts_title_2}
            </h3>
            <p className="mb-3">{page?.acf?.posts_description_2}</p>
            <button className="flex items-center justify-center capitalize font-bold h-5 border border-black text-black bg-transparent rounded-full px-6 py-2 text-sm transition-all duration-200 focus:outline-none focus:ring-2">
              Inquire
            </button>
          </div>
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

      <section
        id="location1"
        className="animation-reveal flex flex-col _bg-white lg:flex-row w-full"
      >
        {" "}
        <div className="w-full lg:w-1/2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2750.3884972931714!2d20.587197276158253!3d44.94512557107016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a878e20c0dced%3A0xe4c03fd59576accb!2sJNA%2029%2C%20Jabuka!5e1!3m2!1sen!2srs!4v1754766200537!5m2!1sen!2srs"
            width="100%"
            height="100%"
            className="h-[450px] lg:h-full"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="order-1 w-full lg:w-1/2">
          <div className="container-half p-2 lg:mx-0 lg:p-10 lg:px-10">
            <div className="mb-10">
              <h2 className="text-3xl font-bold">
                {page?.acf?.contact_title ?? ""}
              </h2>
              <p className="mb-3 mt-3 text-lg md:text-xl">
                {page?.acf?.contact_description ?? ""}
              </p>
              <div className="mb-4">
                <h6 className="text-md mb-1 flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-3 w-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                  <span>Location</span>
                </h6>
                <h6 className="text-md mb-1 flex items-start">
                  <div className="flex flex-col">
                    {page?.acf?.contact_address}
                    {/* <span>Omladinskih brigada 72</span>
                    <span>Belgrade, Serbia</span>
                    <span>11000</span> */}
                  </div>
                </h6>
              </div>

              <h6 className="text-md mb-1 flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-3 w-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <span>Working hours</span>
              </h6>
              {/* {Object.entries(workingHours).map(([key, value]) => (
                <p key={key}>
                  <span className="capitalize">{key}</span> {value}
                </p>
              ))} */}
              <div
                dangerouslySetInnerHTML={{
                  __html: page?.acf?.contact_working_hours ?? "",
                }}
              ></div>

              <h6 className="text-md mt-4 flex space-x-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-3 w-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>
                <span>Contact</span>
              </h6>

              <h6 className="text-md flex items-start">
                <div className="flex flex-col">
                  <span>
                    {page?.acf?.contact_phone} - {page?.acf?.contact_person}
                  </span>
                  {/* <span>+38124825443 - Sneźana</span> */}
                </div>
              </h6>

              <div className="mt-4 flex items-center space-x-1">
                <button className="mx-auto flex items-center justify-center capitalize font-bold h-5 bg-black text-white rounded-full px-6 py-2 text-sm transition-all duration-200 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-white/50 active:bg-neutral-900">
                  Get directions
                </button>
                <button className="flex items-center justify-center capitalize font-bold h-5 border border-black text-black bg-transparent rounded-full px-6 py-2 text-sm transition-all duration-200 focus:outline-none focus:ring-2">
                  Call us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="callToAction1" className="w-full bg-green-200 px-2 py-10">
        <div className="animation-reveal container text-center lg:w-1/2 mx-auto">
          {/* {icon && (
            <span className="mx-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-3xl font-bold text-secondary text-white">
              {icon}
            </span>
          )} */}
          <h2 className="mt-2 space-x-1 text-3xl font-bold">
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

      <footer
        id="footer1"
        className="w-full bg-black text-white px-2 py-2 text-sm text-secondary lg:py-10"
      >
        <div className="container mx-auto">
          <div className="flex w-full flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
            <section className="w-full lg:max-w-[400px]">
              <h5 className="mb-1 font-bold">{page?.acf?.hero_title}</h5>
              <p className="mb-2">{page?.acf?.hero_description}</p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.858579285921!2d20.489992776238196!3d44.80407067107078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7083f03126e3%3A0x6639fb364a2e1693!2sQuantox%20Technology!5e0!3m2!1sen!2srs!4v1705230179211!5m2!1sen!2srs"
                width="100%"
                height="200"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <address className="my-2 flex flex-col not-italic">
                <span>{page?.acf?.contact_address}</span>
                <span>{page?.acf?.contact_person}</span>
                <span>{page?.acf?.contact_email}</span>
                <span>{page?.acf?.contact_phone}</span>
              </address>
              {/* <div>
                <h5 className="mb-0.5 font-medium">Connect with us</h5>
                <Socials iconWrapperClassName="bg-grays-2" />
              </div> */}
            </section>
            <div className="flex w-full flex-col space-y-2 lg:w-[calc(100%-400px)] lg:flex-row lg:space-x-2 lg:space-y-0">
              <section className="w-full lg:mt-0 lg:w-1/3">
                <h4 className="mb-2 font-bold">Services</h4>
                <ul className="flex flex-col">
                  {services?.map((item) => (
                    <li key={item.id} className="mb-0.5 w-full">
                      {item.title.rendered}
                    </li>
                  ))}
                </ul>
              </section>
              <section className="w-fulllg:mt-0 lg:w-1/3">
                <h4 className="mb-2 font-bold">Working hours</h4>
                <ul className="flex flex-col">
                  {/* {workingHours.map(([key, value]) => (
                    <li key={key} className="mb-0.5 w-full space-x-1">
                      <span className="capitalize">{key}</span>
                      <small className="bg-white text-black">{value}</small>
                    </li>
                  ))} */}

                  <div
                    dangerouslySetInnerHTML={{
                      __html: page?.acf?.contact_working_hours ?? "",
                    }}
                  ></div>
                </ul>
              </section>
              {/* <section className="w-full lg:mt-0 lg:w-1/3">
                <h4 className="mb-2 font-bold">Links</h4>
                <ul className="flex flex-col">
                  {menu.map((item) => (
                    <li key={item} className="mb-0.5 w-full">
                      <a href={`#${item.href}`}>{item.text}</a>
                    </li>
                  ))}
                </ul>
              </section> */}
            </div>
          </div>
          <div className="mt-2 w-full">
            <p className="space-x-0.5 text-white">
              <span>
                © {new Date().getFullYear()} Estro UI, all rights reserved |
              </span>
              <span>Powered by</span>
              <span className="underline">estro-ui.com</span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
