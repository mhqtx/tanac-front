import type { WP_REST_API_Posts } from "wp-types";

interface Props {
  title: string;
  description: string;
  services: WP_REST_API_Posts;
}

export function Services1({ title, description, services }: Props) {
  return (
    <div
      id="services"
      className="flex bg-foreground-primary px-2 py-10 lg:py-10"
    >
      <div className="animation-reveal container mx-auto">
        <div className="xl:flex xl:space-x-10">
          <div className="mb-10 xl:w-[35%]">
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="mb-4 mt-3 text-lg md:text-xl">{description}</p>
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
  );
}
