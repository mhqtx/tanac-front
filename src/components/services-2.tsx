import type { WP_REST_API_Posts } from "wp-types";

interface Props {
  title: string;
  description: string;
  services: WP_REST_API_Posts;
}

export function Services2({ title, description, services }: Props) {
  return (
    <div id="services" className="flex px-2 py-10 lg:py-10">
      <div className="animation-reveal container mx-auto">
        <div>
          <div className="mb-10 lg:w-[66%] lg:text-center lg:mx-auto">
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="mb-4 mt-3 text-lg md:text-xl">{description}</p>
          </div>
          <div className="flex flex-wrap">
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
                    <h3 className="text-lg font-bold truncate">
                      {item.title?.rendered ?? "Untitled Service"}
                    </h3>
                  </div>
                  <div className="my-2 h-[1px] w-full bg-gradient-to-r from-black" />
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.content?.rendered ?? "",
                    }}
                  />
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
