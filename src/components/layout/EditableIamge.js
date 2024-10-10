import Image from "next/image";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function EditableImage({ link, setLink }) {
  async function handleFileChange(ev) {
    const files = ev.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      const uploadPromise = fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then(async (response) => {
        if (response.ok) {
          const link = await response.json();
          setLink(link);
        } else {
          throw new Error("Something went wrong. Try again later!");
        }
      });

      await toast.promise(uploadPromise, {
        loading: "Uploading...",
        success: "Upload complete",
        error: "Upload error!",
      });
    }
  }
  return (
    <>
      {link && (
        <motion.img
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 500 }}
          style={{
            transformOrigin: "center",
          }}
          className="rounded-xl flex items-center mx-auto mb-6 mt-6"
          src={link}
          alt={"avatar"}
          width={250}
          height={250}
        />
      )}
      {!link && (
        <div className=" text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No Image
        </div>
      )}

      <label>
        <input className="hidden" type="file" onChange={handleFileChange} />
        <span className="block border border-gray-300 cursor-pointer rounded-md p-2 text-center">
          Edit
        </span>
      </label>
    </>
  );
}
