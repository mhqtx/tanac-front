import Image from "next/image";

interface Props {
  title: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  featuredImage: string;
  trustedByText?: string;
  companyLogos?: string[];
}

export function Hero2({
  title,
  description,
  primaryButtonText,
  secondaryButtonText,
  featuredImage,
}: Props) {
  return (
    <section className="relative min-h-screen w-full bg-white px-2">
      <div className="container mx-auto">
        <div className="grid h-full items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-900">
              {title}
            </h1>
            <p className="text-xl text-gray-600 sm:text-2xl">{description}</p>

            <div className="mt-4 flex flex-col space-y-2 sm:flex-row sm:space-x-2">
              <button className="flex items-center justify-center capitalize font-bold h-6 bg-black text-white rounded-full px-6 py-2 text-sm transition-all duration-200 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-white/50 active:bg-neutral-900">
                {primaryButtonText}
              </button>
              <button className="flex items-center justify-center capitalize font-bold h-6 border border-black text-black bg-transparent rounded-full px-6 py-2 text-sm transition-all duration-200 focus:outline-none focus:ring-2">
                {secondaryButtonText}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              {featuredImage ? (
                <Image
                  alt="Hero illustration"
                  src={featuredImage}
                  width={500}
                  height={400}
                  className="w-full h-auto object-contain"
                  priority
                />
              ) : (
                <div className="flex h-80 w-full items-center justify-center rounded-lg bg-gray-100">
                  <div className="text-center">
                    <div className="mb-4 text-6xl">🎨</div>
                    <p className="text-gray-500">Illustration placeholder</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
