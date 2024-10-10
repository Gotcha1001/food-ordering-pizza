import { motion } from "framer-motion";
import { cartProductPrice } from "../AppContext";
import Trash from "../icons/Trash";
import Image from "next/image";
export default function CartProduct({ product, onRemove, index }) {
  return (
    <div className="flex gap-4  border-b py-4 items-center">
      <motion.div
        className="w-24"
        whileHover={{ scale: 1.1 }} // Scaling on hover
        transition={{ type: "spring", stiffness: 500 }}
        style={{
          display: "inline-block",
          transformOrigin: "center",
        }} // <-- Missing closing curly brace
      >
        <Image
          src={product.image}
          alt={""}
          height={240}
          width={240}
          className="rounded-md"
        />
      </motion.div>

      <div className="grow">
        <h3 className="font-bold">{product.name}</h3>
        {product.size && (
          <div className="text-sm ">
            Size: <span>{product.size.name}</span>
          </div>
        )}
        {product.extras?.length > 0 && (
          <div className="text-sm text-gray-500">
            {product.extras.map((extra) => (
              <div key={extra.name}>
                Extra: {extra.name} R{extra.price}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="text-lg font-semibold">R {cartProductPrice(product)}</div>
      {!!onRemove && (
        <div className="ml-2">
          <button className="p-2" type="button" onClick={() => onRemove(index)}>
            <Trash />
          </button>
        </div>
      )}
    </div>
  );
}
