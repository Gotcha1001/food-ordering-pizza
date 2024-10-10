import React from "react";
import { RingLoader } from "react-spinners";

export default function Spinner({ fullWidth }) {
  return (
    <div
      className={`${
        fullWidth ? "flex justify-center mt-8" : "border-4 border-blue-500"
      }`}
    >
      <RingLoader speedMultiplier={3} size={100} color="#1024d5" />
    </div>
  );
}
