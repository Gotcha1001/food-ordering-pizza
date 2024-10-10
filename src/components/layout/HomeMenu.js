"use client";
import { motion } from "framer-motion";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import { useEffect, useState } from "react";

export default function HomeMenu() {
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setBestSellers(menuItems.slice(-6));
      });
    });
  }, []);

  return (
    <section className="p-3">
      <div className="text-center mt-10 mb-6">
        <SectionHeaders
          subHeader={"check out"}
          mainHeader={"Our Best Sellers"}
        />
      </div>

      {/* Full width container on mobile, centered with max-width on larger screens */}
      <div className="w-full max-w-screen-lg mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bestSellers?.length > 0 &&
            bestSellers.map((item) => (
              <div key={item._id} className="w-full">
                <MenuItem {...item} />
              </div>
            ))}
        </div>
      </div>

      {/* <div className="flex justify-center mt-10">
        <motion.div
          className="h-48 w-48"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 500 }}
          style={{
            transformOrigin: "center",
            width: "250px",
            height: "250px",
            marginBottom: "-50px",
          }}
        >
          <img src="/Salad3.png" alt="Salad3" className="block" />
        </motion.div>

        <motion.div
          className="h-48 w-48 ml-4"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 500 }}
          style={{
            transformOrigin: "center",
            width: "250px",
            height: "250px",
            marginBottom: "-50px",
          }}
        >
          <img src="/Salad4.png" alt="Salad4" className="block" />
        </motion.div>
      </div> */}
    </section>
  );
}
