"use client";
import UserTabs from "@/components/layout/UserTabs";
import Spinner from "@/components/Spinner"; // Assuming Spinner component is imported here
import { useProfile } from "@/components/UseProfile";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import DeleteButton from "@/components/DeleteButton";

export default function CategoriesPage() {
  const { loading: profileLoading, data: profileData } = useProfile();
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editedCategory, setEditedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }

  if (profileLoading) {
    return <Spinner fullWidth={true} />; // Show the spinner while loading
  }

  if (!profileData.admin) {
    return "Not an Admin User"; // Show this if the user is not an admin
  }

  async function handleCategory(ev) {
    ev.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName };
      if (editedCategory) {
        data._id = editedCategory._id;
      }

      const response = await fetch("/api/categories", {
        method: editedCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setEditedCategory(null);
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(creationPromise, {
      loading: editedCategory
        ? "Updating Category..."
        : "Creating Your New Category...",
      success: editedCategory ? "Updated Category" : "Category created",
      error: "Error, Sorry Try Again Later",
    });
    setCategoryName(""); // Reset the state to clear the input
    fetchCategories();
  }

  async function handleDeleteClick(_id) {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories?_id=" + _id, {
        method: "DELETE",
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(promise, {
      loading: "Deleting Category",
      success: "Category Deleted",
      error: "Error Deleting Category",
    });
    fetchCategories();
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <form className="mt-8" onSubmit={handleCategory}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label htmlFor="categoryName">
              {editedCategory ? "Update Category" : "New Category Name"}
              {editedCategory && (
                <>
                  : <b>{editedCategory.name}</b>
                </>
              )}
            </label>
            <input
              type="text"
              id="categoryName"
              value={categoryName} // Bind state to input value
              onChange={(ev) => setCategoryName(ev.target.value)} // Update state on input change
              required
            />
          </div>

          <div className="p-2 flex gap-1">
            <button className="border border-primary" type="submit">
              {editedCategory ? "Update" : "Create"}
            </button>

            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setCategoryName("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>

      <div>
        <h2 className="mt-6 text-xs text-gray-500 ">Exisiting Categories:</h2>
        {categories?.length > 0 &&
          categories.map((c) => (
            <div
              key={c._id}
              className={` rounded-xl p-2 px-4 flex gap-1 mb-2 items-center ${
                editedCategory && editedCategory.name === c.name
                  ? "bg-gray-300 text-orange-500"
                  : "bg-gray-100"
              }`}
            >
              <div className="grow">{c.name}</div>
              <div className="flex gap-1">
                <button
                  onClick={() => {
                    setEditedCategory(c);
                    setCategoryName(c.name);
                  }}
                  type="button"
                >
                  Edit
                </button>
                <DeleteButton
                  label="Delete"
                  onDelete={() => handleDeleteClick(c._id)}
                />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
