"use client";
import Left from "@/components/icons/Left";
import EditableImage from "@/components/layout/EditableIamge";
import UserTabs from "@/components/layout/UserTabs";
import Spinner from "@/components/Spinner";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MenuItemForm from "@/components/layout/MenuItemForm";
import DeleteButton from "@/components/DeleteButton";

export default function EditPage() {
  const { loading: profileLoading, data: profileData } = useProfile();
  const router = useRouter();
  const { id } = useParams();

  const [menuItem, setMenuItem] = useState(null);

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((items) => {
        const item = items.find((i) => i._id === id);
        setMenuItem(item);
      });
    });
  }, []);

  if (profileLoading) {
    return <Spinner fullWidth={true} />; // Show the spinner while loading
  }

  if (!profileData.admin) {
    return "Not an Admin User"; // Show this if the user is not an admin
  }

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();

    data = { ...data, _id: id };
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "PUT",
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

  async function handleDeleteClick() {
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/menu-items?_id=" + id, {
        method: "DELETE",
      });
      if (res.ok) resolve();
      else reject();
    });
    await toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted",
      error: "Error With Deleting",
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
      <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
      <div className="max-w-md mx-auto mt-2">
        <div className="max-w-xs ml-auto pl-4">
          <DeleteButton label="Delete" onDelete={handleDeleteClick} />
        </div>
      </div>
    </section>
  );
}
