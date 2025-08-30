import { ReactNode } from "react";

interface Props {
  title: string;
  description: string;
  children?: ReactNode;
}

export function Cta1({ title, description, children }: Props) {
  return (
    <section id="cta" className="w-full bg-green-200 px-2 py-10">
      <div className="animation-reveal container text-center lg:w-[60%] mx-auto">
        <h2 className="mt-2 space-x-1 text-3xl font-bold">{title}</h2>
        <p className="mb-4 mt-3 text-lg md:text-xl">{description}</p>
        <div>{children}</div>
      </div>
    </section>
  );
}
