import { useState } from "react";

export default function DeleteButton({ label, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div className="fixed bg-black/80 inset-0 flex items-center h-full justify-center">
        <div className=" top-0 left-0 gradient-background2 p-4 rounded-lg">
          <div className="animate-bounce flex justify-center mt-3 mb-3 text-white font-bold">
            Are You Sure You Want To Delete?
          </div>
          <div className="flex gap-2 mt-1">
            <button
              className="text-white"
              type="button"
              onClick={() => setShowConfirm(false)}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onDelete();
                setShowConfirm(false);
              }}
              type="button"
              className="primary"
            >
              Yes..&nbsp;Delete
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button type="button" onClick={() => setShowConfirm(true)}>
      {label}
    </button>
  );
}
