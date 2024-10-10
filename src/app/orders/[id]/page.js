"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";
import Spinner from "@/components/Spinner";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function OrderPage() {
  const { clearCart } = useContext(CartContext);
  const { id } = useParams();
  const [order, setOrder] = useState();
  const [loadingOrder, setLoadingOrder] = useState(true);

  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes("clear-cart=1")) {
        clearCart();
      }
    }
    if (id) {
      setLoadingOrder(true);
      fetch("/api/orders?_id=" + id).then((res) => {
        res.json().then((orderData) => {
          setOrder(orderData);
          setLoadingOrder(false);
        });
      });
    }
  }, [id]);

  let subtotal = 0;
  if (order?.cartProducts) {
    for (const product of order?.cartProducts) {
      subtotal += cartProductPrice(product);
    }
  }

  return (
    <section className="max-w-2xl mx-auto  mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Your Order" />
        <div className="mt-4 mb-8 gradient-background2 p-4 rounded-lg text-white">
          <p>Thanks for your order 😄</p>
          <p>We will call you when the order is on its way 🚚 ...</p>
        </div>
      </div>
      {loadingOrder && <Spinner fullWidth={true} />}
      {order && (
        <div className="grid md:grid-cols-2 md:gap-16">
          <div>
            {order.cartProducts.map((product, index) => (
              <CartProduct key={`${product._id}-${index}`} product={product} />
            ))}

            <div className="text-right py-2 text-gray-500">
              Subtotal:
              <span className="text-black font-bold inline-block w-11">
                R {subtotal}
              </span>{" "}
              <br />
              Delivery:
              <span className="text-black font-bold inline-block w-11">
                {" "}
                R 5
              </span>{" "}
              <br />
              Total:
              <span className="text-black font-bold inline-block w-11">
                {" "}
                R {subtotal + 5}
              </span>{" "}
              <br />
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <AddressInputs disabled={true} addressProps={{ ...order }} />
          </div>
        </div>
      )}
    </section>
  );
}
