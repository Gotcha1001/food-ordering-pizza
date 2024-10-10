import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";

import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16" id="about">
        <SectionHeaders subHeader={"Our Story"} mainHeader={"About Us"} />
        <div className="text-gray-100 max-w-4xl mx-auto mt-8 flex flex-col rounded-lg gap-4 gradient-background2 p-5">
          <p>
            A company that crafts delicious, authentic pizzas using fresh
            ingredients and traditional recipes.
          </p>
          <p>
            With a passion for quality, we source the finest local produce to
            create mouthwatering pizzas, from classic Margherita to gourmet
            options, all baked to perfection. Whether you're dining in, ordering
            for delivery, or catering an event, we ensure every pizza is made
            with care, delivering a slice of happiness with every bite.
          </p>
          <p>
            A company that crafts delicious, authentic pizzas using fresh
            ingredients and traditional recipes. With a passion for quality, we
            source the finest local produce to create mouthwatering pizzas, from
            classic Margherita to gourmet options, all baked to perfection.
            Whether you're dining in, ordering for delivery, or catering an
            event, we ensure every pizza is made with care, delivering a slice
            of happiness with every bite.
          </p>
        </div>
      </section>
      <section
        className="text-center mt-8 gradient-background2 rounded-lg p-4"
        id="contact"
      >
        <SectionHeaders
          subHeader={"Don&apos;t hesitate"}
          mainHeader={"Contact Us"}
        />
        <div className="mt-8">
          <a className="text-3xl text-gray-300" href="tel:++49798888392">
            +49 798 888 392
          </a>
        </div>
      </section>
    </>
  );
}
