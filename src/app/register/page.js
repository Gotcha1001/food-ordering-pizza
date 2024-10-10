"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userCreated, setUserCreated] = useState(false);
  const [creatingUser, setCreatingUser] = useState(false);
  const [error, setError] = useState(false);

  async function handleFormSumbit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);

    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      setUserCreated(true);
    } else {
      setError(true);
    }
    setCreatingUser(true);
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4 zoom">Register</h1>
      {userCreated && (
        <div className="my-4 text-center ">
          User Created! <br /> Now you can{" "}
          <Link className="underline" href={"/login"}>
            Login &raquo;
          </Link>
        </div>
      )}
      {error && (
        <div className="my-4 text-center ">
          An Error Occured! <br /> Please try again later!
        </div>
      )}

      <form className="block max-w-xs mx-auto " onSubmit={handleFormSumbit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          disabled={creatingUser}
          required
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          disabled={creatingUser}
          required
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type="submit" disabled={creatingUser}>
          Register
        </button>
        <div className="my-3 text-center text-gray-500">
          or log in with Provider
        </div>
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex gap-4 justify-center"
        >
          <Image src={"/google.png"} alt={""} width={24} height={32} />
          Login With Google
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Existing account?{" "}
          <Link className="underline" href={"/login"}>
            Login Here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
}
