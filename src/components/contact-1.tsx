interface Props {
  title: string;
  description: string;
  address: string;
  workingHours: string;
  phone: string;
  person: string;
  mapUrl?: string;
}

export function Contact1({
  title,
  description,
  address,
  workingHours,
  phone,
  person,
  mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2750.3884972931714!2d20.587197276158253!3d44.94512557107016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a878e20c0dced%3A0xe4c03fd59576accb!2sJNA%2029%2C%20Jabuka!5e1!3m2!1sen!2srs!4v1754766200537!5m2!1sen!2srs",
}: Props) {
  return (
    <section
      id="contact"
      className="animation-reveal flex flex-col _bg-white lg:flex-row w-full"
    >
      <div className="w-full lg:w-1/2">
        <iframe
          src={mapUrl}
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
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="mb-3 mt-3 text-lg md:text-xl">{description}</p>

            {/* Location */}
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
                <div className="flex flex-col">{address}</div>
              </h6>
            </div>

            {/* Working Hours */}
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
            <div
              dangerouslySetInnerHTML={{
                __html: workingHours,
              }}
            ></div>

            <h6 className="mt-4 text-md  flex space-x-0.5">
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
              <span>Vlasnik</span>
            </h6>

            <h6 className="text-md mb-4 flex items-start">
              <div className="flex flex-col">
                <span>{person}</span>
              </div>
            </h6>

            {/* Contact */}
            <h6 className="text-md flex space-x-0.5">
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
                <span>{phone}</span>
              </div>
            </h6>

            {/* Action Buttons */}
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
  );
}
