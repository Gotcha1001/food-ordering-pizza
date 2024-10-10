import EditableImage from "./EditableIamge";
import Trash from "../icons/Trash";
import Plus from "../icons/Plus";
import Save from "../icons/Save";
import ChevronDown from "../icons/ChevronDown";
import ChevronUp from "../icons/ChevronUp";
import { useState } from "react";

export default function MenuItemPriceProps({
  addLabel,
  name,
  itemName, // New prop to accept both names
  props,
  setProps,
}) {
  const [isOpen, setIsOpen] = useState(false);

  function addProp() {
    setProps((oldProps) => {
      return [...oldProps, { name: "", price: 0 }];
    });
  }

  function editProp(ev, index, prop) {
    const newValue = ev.target.value;
    setProps((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }

  function removeProp(indexToRemove) {
    setProps((prev) => prev.filter((v, index) => index !== indexToRemove));
  }

  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex p-1 border-0 justify-start "
        type="button"
      >
        {isOpen && <ChevronUp />}
        {!isOpen && <ChevronDown />}
        <span>{itemName || name}</span> {/* Display itemName or name */}
        <span>({props?.length})</span>
      </button>
      <div className={isOpen ? "block" : "hidden"}>
        {props?.length > 0 &&
          props.map((size, index) => (
            <div key={index} className="flex gap-2 items-center">
              <div>
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Added Category"
                  value={size.name}
                  onChange={(ev) => editProp(ev, index, "name")}
                />
              </div>
              <div>
                <label>Extra Price</label>
                <input
                  type="text"
                  placeholder="Extra Price"
                  value={size.price}
                  onChange={(ev) => editProp(ev, index, "price")}
                />
              </div>

              <div className="bg-gray-300 mt-3 rounded-full">
                <button
                  onClick={() => removeProp(index)}
                  className="rounded-full bg-gray-100 px-2"
                  type="button"
                >
                  <Trash />
                </button>
              </div>
            </div>
          ))}
        <button type="button" onClick={addProp} className="bg-white">
          <Plus className="w-4 h-4" />
          <span>{addLabel}</span>
        </button>
      </div>
    </div>
  );
}
