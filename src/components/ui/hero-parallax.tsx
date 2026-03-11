"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "motion/react";
import type { MotionValue } from "motion/react";

export const HeroParallax = ({
  products,
  heading = "Projects I’ve Worked On",
  subheading = "A visual archive of products I designed and built.",
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
    role?: string;
    description?: string;
    tags?: string[];
  }[];
  heading?: string;
  subheading?: string;
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig,
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig,
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig,
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig,
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig,
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-320, 180]),
    springConfig,
  );
  return (
    <div
      ref={ref}
      className="relative flex md:h-fit h-full flex-col overflow-hidden py-8 antialiased  [transform-style:preserve-3d]"
    >
      <Header heading={heading} subheading={subheading} />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="mb-12 flex flex-row-reverse space-x-reverse space-x-12">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="mb-12 flex flex-row space-x-12">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-12">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = ({
  heading,
  subheading,
}: {
  heading: string;
  subheading: string;
}) => {
  return (
    <div className="relative left-0 top-0 mx-auto w-full max-w-7xl px-4  md:py-20">
      <p className="mb-3 text-sm font-medium uppercase tracking-[0.32em] text-[#e6d3aa]">
        Projects
      </p>
      <h1 className="text-3xl font-black leading-[0.98] tracking-[-0.03em] text-[var(--p-text)] md:text-6xl">
        {heading}
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--p-text-2)] md:text-lg">
        {subheading}
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
    role?: string;
    description?: string;
    tags?: string[];
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product relative h-[28rem] w-[30rem] shrink-0"
    >
      <a
        href={product.link}
        target="_blank"
        rel="noreferrer"
        className="block group-hover/product:shadow-2xl "
      >
        <img
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </a>
      <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-t from-black/90 via-black/45 to-transparent opacity-90"></div>

      <div className="absolute inset-x-0 bottom-0 p-5">
        {product.role ? (
          <p className="mb-2 text-xs uppercase tracking-[0.22em] text-[#e6d3aa]/90">
            {product.role}
          </p>
        ) : null}
        <h2 className="text-xl font-black text-[#f8fafc]">{product.title}</h2>
        {product.description ? (
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#e2e8f0]">
            {product.description}
          </p>
        ) : null}

        {product.tags?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {product.tags.slice(0, 4).map((tag) => (
              <span
                key={`${product.title}-${tag}`}
                className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] text-slate-100"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </motion.div>
  );
};
