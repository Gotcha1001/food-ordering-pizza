import AddToCartButton from "./AddToCartButton";
import { motion } from "framer-motion";

export default function MenuItemTile({ onAddToCart, ...item }) {
  const { image, description, name, basePrice, sizes, extraIngredientPrices } =
    item;

  const hasSizesOrExtras =
    sizes?.length > 0 || extraIngredientPrices?.length > 0;

  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center flex flex-col h-full hover:shadow-black/25 hover:shadow-md hover:bg-white transition-all w-full">
      {/* Image */}
      <div className="text-center mt-8">
        <motion.img
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 500 }}
          style={{
            transformOrigin: "center",
            width: "300px",
            height: "200px",
          }}
          src={image}
          className="block mx-auto rounded-lg mb-8"
          alt="menu-item-image"
        />
      </div>

      {/* Title */}
      <h4 className="font-semibold text-xl my-3">{name}</h4>

      {/* Description */}
      <p className="text-gray-500 text-sm flex-grow mb-4 overflow-auto">
        {description}
      </p>

      {/* Add to Cart Button */}
      <div className="mt-auto">
        <AddToCartButton
          hasSizesOrExtras={hasSizesOrExtras}
          onClick={onAddToCart}
          basePrice={basePrice}
          image={image}
        />
      </div>
    </div>
  );
}
