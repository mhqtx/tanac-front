import type { WP_REST_API_Posts } from "wp-types";

interface Props {
  title: string;
  description: string;
  services: WP_REST_API_Posts;
}

export function Services2({ title, description, services }: Props) {
  return (
    <div id="services" className="flex px-2 py-10 lg:py-10 bg-gray-50">
      <div className="animation-reveal container mx-auto">
        <div>
          <div className="mb-10 xl:w-[66%] lg:text-center lg:mx-auto">
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="mb-4 mt-3 text-lg md:text-xl">{description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services?.length ? (
              services.map((item, index) => (
                <div
                  key={index}
                  className="mb-4 flex w-full flex-col rounded-xl last:mb-0"
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
                    className="text-lg"
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
