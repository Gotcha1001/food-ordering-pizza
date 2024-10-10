import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import toast from "react-hot-toast";
import MenuItemTile from "./MenuItemTile";
import Image from "next/image";
import FlyingButton from "react-flying-item";

export default function MenuItem(menuItem) {
  const { image, name, description, basePrice, sizes, extraIngredientPrices } =
    menuItem;

  const [showPopup, setShowPopup] = useState(false);
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const { addToCart } = useContext(CartContext);

  async function handleAddToCartButtonClick() {
    const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0;
    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    }

    addToCart(menuItem, selectedSize, selectedExtras);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setShowPopup(false);
    toast.success("Added To Cart!");
  }

  function handleExtraThingClick(ev, extraThing) {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedExtras((prev) => [...prev, extraThing]);
    } else {
      setSelectedExtras((prev) => {
        return prev.filter((e) => e.name !== extraThing.name);
      });
    }
  }

  let selectedPrice = basePrice;
  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }
  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.price;
    }
  }

  return (
    <>
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="bg-white p-2 rounded-lg w-full max-w-lg z-50 "
          >
            <div
              className="overflow-y-scroll p-3"
              style={{ maxHeight: "calc(100vh - 80px)" }}
            >
              <Image
                src={image}
                alt={name}
                width={300}
                height={200}
                className="mx-auto zoom my-6 rounded-lg mb-8"
              />
              <h2 className="text-2xl font-bold text-center mb-2">{name}</h2>
              <p className="text-center text-gray-500 text-sm mb-2">
                {description}
              </p>

              {sizes?.length > 0 && (
                <div className=" rounded-md py-2 shadow-xl">
                  <h3 className="text-center gradient-background2 p-2 rounded-lg text-white font-bold">
                    Pick Your Size
                  </h3>
                  {sizes.map((size) => (
                    <label
                      key={size._id}
                      className="flex items-center gap-2 p-3 border rounded-md mb-1"
                    >
                      <input
                        type="radio"
                        onChange={() => setSelectedSize(size)}
                        checked={selectedSize?.name === size.name}
                        name="size"
                      />{" "}
                      {size.name} R {basePrice + size.price}
                    </label>
                  ))}
                </div>
              )}
              {extraIngredientPrices?.length > 0 && (
                <div className=" rounded-md py-2 shadow-xl">
                  <h3 className="text-center gradient-background2 p-2 rounded-lg text-white font-bold">
                    Pick Your Extras
                  </h3>

                  {extraIngredientPrices.map((extraThing) => (
                    <label
                      key={extraThing._id}
                      className="flex items-center gap-2 p-3 border rounded-md mb-1"
                    >
                      <input
                        type="checkbox"
                        onChange={(ev) => handleExtraThingClick(ev, extraThing)}
                        checked={selectedExtras.some(
                          (e) => e.name === extraThing.name
                        )}
                        name={extraThing.name}
                      />
                      {extraThing.name} +R {extraThing.price}
                    </label>
                  ))}
                </div>
              )}

              <FlyingButton targetTop={"5%"} targetLeft={"95%"} src={image}>
                <div
                  className="primary sticky bottom-2"
                  type="button"
                  onClick={handleAddToCartButtonClick}
                >
                  Add to cart R {selectedPrice}
                </div>
              </FlyingButton>

              <button
                className="secondary mt-2"
                type="button"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  );
}
