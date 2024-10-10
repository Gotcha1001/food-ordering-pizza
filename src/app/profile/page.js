"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import UserTabs from "../../components/layout/UserTabs";
import Spinner from "@/components/Spinner";
import UserForm from "@/components/layout/UserForm";

export default function ProfilePage() {
  const session = useSession();
  const status = session.status;

  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [profileFetched, setProfileFetched] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setUser(data);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        });
      });
    }
  }, [session, status]);

  if (status === "loading" || !profileFetched) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner fullWidth={true} />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  async function handleProfileInfoUpdate(ev, data) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/profile", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          resolve();
        } else {
          reject();
        }
      } catch (error) {
        reject();
      }
    });

    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Profile saved!",
      error: "Error while saving profile",
    });
  }

  return (
    <section className="mt-8 px-4 sm:px-6">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-3xl mx-auto mt-8">
        {/* User Form */}
        <UserForm user={user} onSave={handleProfileInfoUpdate} />
      </div>
    </section>
  );
}
