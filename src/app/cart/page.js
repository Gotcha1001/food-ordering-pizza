"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Image from "next/image";
import { useContext, useState, useEffect } from "react";
import Trash from "@/components/icons/Trash";
import { motion } from "framer-motion";
import AddressInputs from "@/components/layout/AddressInputs";
import { useProfile } from "@/components/UseProfile";
import toast from "react-hot-toast";
import CartProduct from "@/components/menu/CartProduct";

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({
    phone: "",
    streetAddress: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const { data: profileData } = useProfile();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("canceled=1")) {
        toast.error("Payment Failed 😭");
      }
    }
  }, []);

  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, city, postalCode, country } = profileData;
      const addressFromProfile = {
        phone,
        streetAddress,
        city,
        postalCode,
        country,
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  let subtotal = 0;
  for (const p of cartProducts) {
    subtotal += cartProductPrice(p);
  }

  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }

  async function proceedToCheckout(ev) {
    ev.preventDefault();
    //address and shopping cart products
    const promise = new Promise((resolve, reject) => {
      fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then(async (response) => {
        if (response.ok) {
          resolve();
          window.location = await response.json();
        } else {
          reject();
        }
      });
    });
    await toast.promise(promise, {
      loading: "Preparing Your Order...",
      success: "Redirecting To Payment",
      error: "Something Went Wrong, Try Again Later!!",
    });
  }

  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8 text-center">
        <SectionHeaders mainHeader="Cart" />
        <p className="mt-4">Your Shopping Cart Is Empty🚚😔</p>
      </section>
    );
  }

  return (
    <section className="mt-8 max-w-4xl mx-auto px-4">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>

      <div className="mt-8 grid gap-8 grid-cols-1 lg:grid-cols-2">
        <div>
          {cartProducts.map((product, index) => (
            <CartProduct
              key={product._id || index}
              product={product}
              onRemove={removeCartProduct}
              index={index}
            />
          ))}
          <div className="p-4 bg-gray-100 rounded-lg text-gray-500 mt-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold text-black">R {subtotal}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Delivery:</span>
              <span className="font-semibold text-black">R 5</span>
            </div>
            <div className="flex justify-between mt-2 text-lg gradient-background2 p-2 text-white rounded-md">
              <span>Total:</span>
              <span className="font-bold text-white">R {subtotal + 5}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-4 shadow-lg">
          <h2 className="text-2xl mb-4">Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <AddressInputs
              addressProps={address}
              setAddressProp={handleAddressChange}
            />
            <button
              type="submit"
              className="mt-4 bg-primary text-white px-6 py-2 rounded-full w-full"
            >
              Pay R {subtotal + 5}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
