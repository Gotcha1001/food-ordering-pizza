import { useEffect, useState } from "react";
import EditableImage from "./EditableIamge";
import Trash from "../icons/Trash";
import Plus from "../icons/Plus";
import Save from "../icons/Save";
import MenuItemPriceProps from "@/components/layout/MenuItemPriceProps";

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(
    menuItem?.extraIngredientPrices || []
  );
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(menuItem?.category || "");

  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }, []);

  return (
    <form
      onSubmit={(ev) =>
        onSubmit(ev, {
          image,
          name,
          description,
          basePrice,
          sizes,
          extraIngredientPrices,
          category,
        })
      }
      className="mt-8 max-w-2xl mx-auto"
    >
      <div
        className="md:grid items-start gap-4"
        style={{ gridTemplateColumns: ".3fr .7fr" }}
      >
        <div>
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className="grow">
          <label>Item Name</label>
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />

          <label>Category</label>
          <select
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}
          >
            {categories?.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>

          <label>Base Price</label>
          <input
            type="text"
            value={basePrice}
            onChange={(ev) => setBasePrice(ev.target.value)}
          />
          <MenuItemPriceProps
            addLabel={"Add Item Size"}
            name={"Sizes"}
            props={sizes}
            setProps={setSizes}
          />

          <MenuItemPriceProps
            name={"Extra Ingredients"}
            addLabel={"Add Ingredient Prices"}
            props={extraIngredientPrices}
            setProps={setExtraIngredientPrices}
          />

          <button className="items-center" type="submit">
            <Save className="h-4 w-4" />
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
