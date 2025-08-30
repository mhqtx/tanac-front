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
