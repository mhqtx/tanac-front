import "./globals.css";
import { About1 } from "@/components/about-1";
import { Gallery1 } from "@/components/gallery-1";
import type { WP_REST_API_Posts, WP_REST_API_Page } from "wp-types";
import { Hero2 } from "@/components/hero-2";
import { Nav1 } from "@/components/nav-1";
import { Services2 } from "@/components/services-2";
import { Cta1 } from "@/components/cta-1";
import { Contact1 } from "@/components/contact-1";
import { Footer2 } from "@/components/footer-2";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

async function safeFetch<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as T;
  } catch (err) {
    console.error(`Fetch failed for ${url}:`, err);
    return null;
  }
}

interface WP_REST_API_Page_With_ACF extends WP_REST_API_Page {
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

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API;

  const page = await safeFetch<WP_REST_API_Page_With_ACF>(
    `${baseUrl}/pages/127`
  );

  const services = await safeFetch<WP_REST_API_Posts>(
    `${baseUrl}/service?_embed`
  );

  const title = `Tanac - ${page?.acf?.hero_title}`;
  const description = page?.acf?.hero_description;
  const featuredImage = new URL(page?.acf?.hero_featured_image ?? "");
  const siteUrl = "https://tanac.rs/";

  return {
    title: title,
    description: description,
    keywords: [
      ...(services
        ?.map((service) => service.title?.rendered || "")
        .filter(Boolean) || []),
    ].join(", "),
    authors: [{ name: page?.acf?.contact_person }],
    creator: page?.acf?.contact_person,
    publisher: "Tanac",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "sr_RS",
      url: siteUrl,
      title: title,
      description: description,
      siteName: "Tanac",
      images: [
        {
          url: featuredImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [featuredImage],
      creator: "@tanac",
      site: "@tanac",
    },
    alternates: {
      canonical: siteUrl,
    },
    other: {
      "contact:phone_number": page?.acf?.contact_phone || "",
      "contact:email": page?.acf?.contact_email || "",
      "contact:address": page?.acf?.contact_address || "",
      "business:hours": page?.acf?.contact_working_hours || "",
    },
  };
}

export default async function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API;

  const page = await safeFetch<WP_REST_API_Page_With_ACF>(
    `${baseUrl}/pages/127`
  );

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
        contactPhone={page?.acf?.contact_phone ?? "..."}
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
      <Services2
        title={page?.acf?.services_title ?? "..."}
        description={page?.acf?.services_description ?? "..."}
        services={services ?? []}
      />
      <Cta1
        title={page?.acf?.cta_title ?? ""}
        description={page?.acf?.cta_description ?? ""}
      >
        <Button
          variant="primary"
          size="md"
          className="mx-auto"
          href={`tel:${page?.acf?.contact_phone ?? ""}`}
        >
          Kontakt
        </Button>
      </Cta1>
      <Contact1
        title={page?.acf?.contact_title ?? ""}
        description={page?.acf?.contact_description ?? ""}
        address={page?.acf?.contact_address ?? ""}
        workingHours={page?.acf?.contact_working_hours ?? ""}
        phone={page?.acf?.contact_phone ?? ""}
        person={page?.acf?.contact_person ?? ""}
        mapUrl={page?.acf?.contact_google_map ?? ""}
      />
      <Footer2
        heroTitle={page?.acf?.hero_title ?? ""}
        heroDescription={page?.acf?.hero_description ?? ""}
        contactPerson={page?.acf?.contact_person ?? ""}
        contactPhone={page?.acf?.contact_phone ?? ""}
        contactAddress={page?.acf?.contact_address ?? ""}
        workingHours={page?.acf?.contact_working_hours ?? ""}
        services={services ?? []}
      />
    </>
  );
}
