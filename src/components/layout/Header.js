"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import ShoppingCart from "@/components/icons/ShoppingCart";
import Bars2 from "@/components/icons/Bars2";

function AuthLinks({ status, userName, isMobile }) {
  if (status === "authenticated") {
    return (
      <>
        <Link
          href="/profile"
          className={`whitespace-nowrap text-teal-600 font-bold ${
            isMobile ? "w-full text-center py-2" : ""
          }`}
        >
          Welcome, {userName}
        </Link>
        <button
          onClick={() => signOut()}
          className={`bg-primary rounded-full text-white px-8 py-2 ${
            isMobile ? "w-full" : ""
          }`}
        >
          Logout
        </button>
      </>
    );
  }
  if (status === "unauthenticated") {
    return (
      <>
        <Link
          href={"/login"}
          className={`bg-primary rounded-full text-white px-8 py-2 ${
            isMobile ? "w-full text-center" : ""
          }`}
        >
          Login
        </Link>
        <Link
          href="/register"
          className={`bg-primary rounded-full text-white px-8 py-2 ${
            isMobile ? "w-full text-center" : ""
          }`}
        >
          Register
        </Link>
      </>
    );
  }
}

export default function Header() {
  const session = useSession();
  const status = session.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;

  const { cartProducts } = useContext(CartContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  return (
    <header className="w-full flex flex-col justify-center items-center rounded-lg bg-black p-4">
      {/* Desktop Navigation */}
      <div className="hidden md:flex justify-between items-center w-full max-w-6xl p-4">
        {/* Primary Navigation Links */}
        <nav className="flex items-center gap-8 text-stone-500 font-semibold">
          <Link className="text-primary font-bold text-3xl" href="/">
            TWIGGYS PIZZA
          </Link>
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
        </nav>

        {/* Authentication Links and Cart */}
        <nav className="flex items-center gap-4 text-stone-500 font-semibold">
          <AuthLinks status={status} userName={userName} isMobile={false} />
          <Link href="/cart" className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute py-1 px-1 -top-2 -right-4 bg-primary text-white text-xs p-1 rounded-full leading-3">
                {cartProducts.length}
              </span>
            )}
          </Link>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden items-center justify-between p-3 w-full">
        <Link className="text-primary font-bold text-2xl" href="/">
          TWIGGYS PIZZA
        </Link>
        <div className="flex gap-8 items-center">
          <Link href={"/cart"} className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute py-1 px-1 -top-2 -right-4 bg-primary text-white text-xs p-1 rounded-full leading-3">
                {cartProducts.length}
              </span>
            )}
          </Link>
          <button
            className="p-1 border-0"
            onClick={() => setMobileNavOpen((prev) => !prev)}
          >
            <Bars2 />
          </button>
        </div>
      </div>

      {mobileNavOpen && (
        <div className="md:hidden w-full gradient-background2 mt-2 flex flex-col gap-2">
          <Link
            className="text-white font-bold p-4 w-full text-center hover:bg-white/10"
            href="/"
            onClick={() => setMobileNavOpen(false)}
          >
            Home
          </Link>
          <Link
            className="text-white font-bold p-4 w-full text-center hover:bg-white/10"
            href="/menu"
            onClick={() => setMobileNavOpen(false)}
          >
            Menu
          </Link>
          <Link
            className="text-white font-bold p-4 w-full text-center hover:bg-white/10"
            href="/#about"
            onClick={() => setMobileNavOpen(false)}
          >
            About
          </Link>
          <Link
            className="text-white font-bold p-4 w-full text-center hover:bg-white/10"
            href="/#contact"
            onClick={() => setMobileNavOpen(false)}
          >
            Contact
          </Link>
          <div className="p-4 flex flex-col gap-2 w-full">
            <AuthLinks status={status} userName={userName} isMobile={true} />
          </div>
        </div>
      )}
    </header>
  );
}
