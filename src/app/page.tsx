import { About1 } from "@/components/about-1";
import { Gallery1 } from "@/components/gallery-1";
// import { Hero1 } from "@/components/hero-1";
import "./globals.css";
import type { WP_REST_API_Posts, WP_REST_API_Page } from "wp-types";
import { Hero2 } from "@/components/hero-2";
import { Nav1 } from "@/components/nav-1";
// import { Services1 } from "@/components/services-1";
import { Services2 } from "@/components/services-2";
import { Cta1 } from "@/components/cta-1";
import { Contact1 } from "@/components/contact-1";

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
      <Nav1 />
      <Hero2
        title={page?.acf?.hero_title ?? "..."}
        description={page?.acf?.hero_description ?? "..."}
        primaryButtonText={page?.acf?.hero_primary_button_text ?? "..."}
        secondaryButtonText={page?.acf?.hero_secondary_button_text ?? "..."}
        featuredImage={page?.acf?.hero_featured_image ?? "..."}
      />

      <About1
        title={page?.acf?.about_title ?? "..."}
        description={page?.acf?.about_description ?? "..."}
      />

      <Gallery1
        posts={posts ?? []}
        title1={page?.acf?.posts_title_1 ?? "..."}
        description1={page?.acf?.posts_description_1 ?? ""}
        description2={page?.acf?.posts_description_2 ?? ""}
      />

      <Cta1
        title={page?.acf?.cta_title ?? ""}
        description={page?.acf?.cta_description ?? ""}
      >
        <button className="mx-auto flex items-center justify-center capitalize font-bold h-5 bg-black text-white rounded-full px-6 py-2 text-sm transition-all duration-200 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-white/50 active:bg-neutral-900">
          Message us
        </button>
      </Cta1>

      <Services2
        title={page?.acf?.services_title ?? "..."}
        description={page?.acf?.services_description ?? "..."}
        services={services ?? []}
      />

      <Cta1
        title={page?.acf?.cta_title ?? ""}
        description={page?.acf?.cta_description ?? ""}
      >
        <button className="mx-auto flex items-center justify-center capitalize font-bold h-5 bg-black text-white rounded-full px-6 py-2 text-sm transition-all duration-200 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-white/50 active:bg-neutral-900">
          Message us
        </button>
      </Cta1>

      <Contact1
        title={page?.acf?.contact_title ?? ""}
        description={page?.acf?.contact_description ?? ""}
        address={page?.acf?.contact_address ?? ""}
        workingHours={page?.acf?.contact_working_hours ?? ""}
        phone={page?.acf?.contact_phone ?? ""}
        person={page?.acf?.contact_person ?? ""}
      />

      <footer
        id="footer1"
        className="w-full bg-black text-white px-2 py-10 text-sm text-secondary"
      >
        <div className="container mx-auto">
          <div className="flex w-full flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
            <section className="w-full lg:max-w-[400px]">
              <h5 className="mb-1 font-bold text-3xl">
                {page?.acf?.hero_title}
              </h5>
              <p className="mb-2 text-lg">{page?.acf?.hero_description}</p>

              <h6 className="text-lg flex space-x-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-3"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                <span>{page?.acf?.contact_person}</span>
              </h6>

              <h6 className="text-lg flex space-x-0.5">
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
                <span>{page?.acf?.contact_phone}</span>
              </h6>

              <h6 className="text-lg flex">
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
                <span>{page?.acf?.contact_address}</span>
              </h6>

              <button className="mt-4 flex items-center justify-center capitalize font-bold h-6 bg-white text-black rounded-full px-6 py-2 text-sm transition-all duration-200 hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-white/50">
                Message Us
              </button>

              {/* <address className="my-2 flex flex-col not-italic text-lg">
                <span>{page?.acf?.contact_address}</span>
                <span>{page?.acf?.contact_person}</span>
                <span>{page?.acf?.contact_email}</span>
                <span>{page?.acf?.contact_phone}</span>
              </address> */}
              {/* <div>
                <h5 className="mb-0.5 font-medium">Connect with us</h5>
                <Socials iconWrapperClassName="bg-grays-2" />
              </div> */}
            </section>
            <div className="flex w-full flex-col space-y-2 lg:w-[calc(100%-400px)] lg:flex-row lg:space-x-2 lg:space-y-0">
              <section className="w-fulllg:mt-0 lg:w-1/3 flex-shrink-0">
                <h4 className="mb-2 text-lg font-bold">Radno vreme</h4>
                <ul className="flex flex-col text-lg">
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
              <section className="w-full lg:mt-0 flex-grow">
                <h4 className="mb-2 text-lg font-bold">Usluge</h4>
                <ul className="flex flex-col">
                  {services?.map((item) => (
                    <li key={item.id} className="mb-0.5 w-full text-lg">
                      {item.title.rendered}
                    </li>
                  ))}
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
          <div className="w-full mt-10 text-center">
            <p className="space-x-0.5 text-white mx-auto">
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
