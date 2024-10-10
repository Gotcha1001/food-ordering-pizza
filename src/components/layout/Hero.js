"use client";
import Right from "../icons/Right";
import { motion } from "framer-motion";
import Link from "next/link"; // Import Link from Next.js

export default function Hero() {
  return (
    <section className="hero md:mt-4 gradient-background2 p-8 max-w-auto mx-auto">
      <div className="py-8 md:py-12">
        <h1 className="text-4xl font-semibold text-center text-white">
          Everything
          <br /> Rocks Solid
          <br /> With a&nbsp;
          <span className="text-primary">Pizza</span>
        </h1>
        <p className="my-8 text-stone-200 text-sm text-center">
          Pizza is the missing piece for your peace, a simple yet delicious
          taste for life, that awakens your life
        </p>
        <div className="flex gap-4 text-sm">
          <Link href="/menu">
            {" "}
            {/* Link for Order Now button */}
            <button className="bg-primary justify-center items-center uppercase flex gap-2 text-white py-2 px-4 rounded-full">
              Order Now
              <Right />
            </button>
          </Link>
          <Link href="/menu">
            {" "}
            {/* Link for Learn More button */}
            <button className="flex gap-2 border-0 button  items-center py-2 text-stone-600 font-semibold">
              Learn More <Right />
            </button>
          </Link>
        </div>
      </div>

      <div className="relative hidden md:block">
        <motion.div
          whileHover={{ scale: 1.1 }} // Scaling on hover
          transition={{ type: "spring", stiffness: 500 }}
          style={{
            display: "inline-block",
            transformOrigin: "center",
          }}
        >
          <img
            src="/Pizza9.png" // Use the public folder path
            alt="Pizza Image" // Corrected alt text
            style={{
              objectFit: "contain", // Maintain image aspect ratio
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
