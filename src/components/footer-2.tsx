import type { WP_REST_API_Posts } from "wp-types";
import { Button } from "@/components/ui/button";

interface Props {
  heroTitle: string;
  heroDescription: string;
  contactPerson: string;
  contactPhone: string;
  contactAddress: string;
  workingHours: string;
  services: WP_REST_API_Posts;
}

export function Footer2({
  heroTitle,
  heroDescription,
  contactPerson,
  contactPhone,
  contactAddress,
  workingHours,
  services,
}: Props) {
  return (
    <footer
      id="footer1"
      className="w-full bg-black text-white px-2 py-10 text-sm text-secondary"
    >
      <div className="container mx-auto">
        <div className="flex w-full flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
          <section className="w-full lg:max-w-[400px]">
            <h5 className="mb-1 font-bold text-3xl">{heroTitle}</h5>
            <p className="mb-2 text-lg">{heroDescription}</p>

            <h6 className="text-lg flex space-x-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <span>{contactPerson}</span>
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
              <span>{contactPhone}</span>
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
              <span>{contactAddress}</span>
            </h6>

            <Button variant="white" size="md" className="mt-4">
              Message Us
            </Button>
          </section>
          <div className="flex w-full flex-col space-y-2 lg:w-[calc(100%-400px)] lg:flex-row lg:space-x-2 lg:space-y-0">
            <section className="w-full lg:mt-0 lg:w-1/3 flex-shrink-0">
              <h4 className="mb-2 text-lg font-bold">Radno vreme</h4>
              <ul className="flex flex-col text-lg">
                <div
                  dangerouslySetInnerHTML={{
                    __html: workingHours,
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
  );
}
