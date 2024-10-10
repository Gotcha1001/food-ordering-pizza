"use client";
import Left from "@/components/icons/Left";
import EditableImage from "@/components/layout/EditableIamge";
import MenuItemForm from "@/components/layout/MenuItemForm";
import UserTabs from "@/components/layout/UserTabs";
import Spinner from "@/components/Spinner";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function NewMenuItemPage() {
  const { loading: profileLoading, data: profileData } = useProfile();
  const router = useRouter();

  if (profileLoading) {
    return <Spinner fullWidth={true} />; // Show the spinner while loading
  }

  if (!profileData.admin) {
    return "Not an Admin User"; // Show this if the user is not an admin
  }

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(savingPromise, {
      loading: "Saving this tasty item",
      success: "Saved",
      error: "Error",
    });
    router.push("/menu-items");
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href={"/menu-items"} className="button ">
          <span className="flex justify-center gap-3">
            <Left /> Show All Menu Items
          </span>
        </Link>
      </div>
      <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
    </section>
  );
}
