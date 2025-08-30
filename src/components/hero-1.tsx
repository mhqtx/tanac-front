import Image from "next/image";

interface HeroProps {
  title: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  featuredImage: string;
}

export function Hero1({
  title,
  description,
  primaryButtonText,
  secondaryButtonText,
  featuredImage,
}: HeroProps) {
  return (
    <section
      id="hero1"
      className="flex h-screen w-full flex-col bg-5 p-2 px-2 lg:p-12"
    >
      <div className="container flex h-full">
        <div className="flex w-full flex-col items-center justify-center lg:w-1/2 lg:pr-4 xl:pr-8">
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="mb-4 mt-3 text-lg md:text-xl">{description}</p>
            <div className="mt-4 flex space-x-1">
              <button className="flex items-center justify-center capitalize font-bold h-5 bg-black text-white rounded-full px-6 py-2 text-sm transition-all duration-200 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-white/50 active:bg-neutral-900">
                {primaryButtonText}
              </button>
              <button className="flex items-center justify-center capitalize font-bold h-5 border border-black text-black bg-transparent rounded-full px-6 py-2 text-sm transition-all duration-200 focus:outline-none focus:ring-2">
                {secondaryButtonText}
              </button>
            </div>
          </div>
        </div>
        <div className="hidden w-1/2 justify-center text-center lg:flex lg:items-center">
          {featuredImage ? (
            <Image alt="" src={featuredImage} width={300} height={200} />
          ) : (
            <div className="w-[300px] h-[200px] bg-gray-200" />
          )}
        </div>
      </div>
    </section>
  );
}
