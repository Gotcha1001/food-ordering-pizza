"use client";
import { useState, useEffect } from "react";

export default function CurrentYear() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Update the year dynamically, although this only needs to happen once
    setCurrentYear(new Date().getFullYear());
  }, []);

  return <span>{currentYear}</span>;
}
