"use client";
import UserTabs from "@/components/layout/UserTabs";
import Spinner from "@/components/Spinner";
import { useProfile } from "@/components/UseProfile";
import UserForm from "@/components/layout/UserForm";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

export default function EditUserPage() {
  const { loading: profileLoading, data: profileData } = useProfile();
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/profile?_id=" + id).then((res) => {
      res.json().then((user) => {
        setUser(user);
      });
    });
  }, [id]);

  if (profileLoading) {
    return <Spinner fullWidth={true} />; // Show the spinner while loading
  }

  if (!profileData.admin) {
    return "Not an Admin User"; // Show this if the user is not an admin
  }

  async function handleSaveButtonClick(ev, data) {
    ev.preventDefault();
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, _id: id }),
      });
      if (res.ok) resolve();
      else reject();
    });
    await toast.promise(promise, {
      loading: "Saving...",
      success: "User Saved",
      error: "An Error Occurred, please try again later",
    });
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <UserForm user={user} onSave={handleSaveButtonClick} />
    </section>
  );
}
