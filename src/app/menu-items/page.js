"use client";
import { useProfile } from "@/components/UseProfile";
import Spinner from "@/components/Spinner";
import { useState, useEffect } from "react";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import Right from "@/components/icons/Right";
import Image from "next/image";
import { motion } from "framer-motion";

export default function MenuItemsPage() {
  const { loading: profileLoading, data: profileData } = useProfile();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  if (profileLoading) {
    return <Spinner fullWidth={true} />; // Show the spinner while loading
  }

  if (!profileData.admin) {
    return "Not an Admin User"; // Show this if the user is not an admin
  }
  return (
    <section className="mt-8 max-w-6xl mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <Link className="button flex" href={"/menu-items/new"}>
          <span>Create New Menu Item</span>
          <Right />
        </Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mt-8 text-center mb-4">
          Edit Menu Item:
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {" "}
          {/* Adjusted grid classes */}
          {menuItems?.length > 0 &&
            menuItems.map((item) => (
              <Link
                key={item._id}
                href={"/menu-items/edit/" + item._id}
                className="bg-gray-200 rounded-lg p-4 md:p-6 transform transition-transform duration-300 hover:scale-105 flex flex-col items-center"
              >
                <div className="relative mb-6">
                  <motion.img
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 500 }}
                    style={{
                      transformOrigin: "center",
                      width: "300px",
                      height: "200px",
                    }}
                    className="rounded-md"
                    src={item.image}
                    alt={item.name} // Use item.name directly
                    width={300} // Base size
                    height={300} // Base size
                    className="md:w-[350px] md:h-[350px] lg:w-[450px] lg:h-[250px]" // Adjusted for larger screens
                  />
                </div>
                <div className="text-center">{item.name}</div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
