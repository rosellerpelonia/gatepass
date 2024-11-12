"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function FormLayout({ children }) {
  const [isMobileView, setIsMobileView] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const categories = [
    "Gatepass",
    "Particulars",
    "For Approval/Preparation",
    "For Printing",
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 767);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Only run on the client side
    if (typeof window !== "undefined") {
      // Get the last part of the path to determine the active category
      const path = decodeURIComponent(window.location.pathname.split("/").pop() || "");
      if (categories.includes(path)) {
        setActiveCategory(path);
      }
    }
  }, []);

  const scrollContainer = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = direction === "right" ? 150 : -150;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div>
      {/* Category List */}
      <div className="relative flex items-center border-b pb-4 box-border">
        {isMobileView && (
          <button
            onMouseEnter={() => scrollContainer("left")}
            className="absolute left-0 z-10 h-full bg-gradient-to-r from-white p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-gray-600"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        <div
          ref={containerRef}
          className="flex items-center space-x-8 overflow-x-auto whitespace-nowrap scrollbar-hide px-4"
        >
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/dashboard/form/category/${encodeURIComponent(category)}`}
              passHref
            >
              <span
                onClick={() => handleCategoryClick(category)}
                className={`text-base font-medium whitespace-nowrap px-4 cursor-pointer ${
                  activeCategory === category
                    ? "border-b-2 border-red-500 text-red-500"
                    : "text-gray-700"
                }`}
              >
                {category}
              </span>
            </Link>
          ))}
        </div>

        {isMobileView && (
          <button
            onMouseEnter={() => scrollContainer("right")}
            className="absolute right-0 z-10 h-full bg-gradient-to-l from-white p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-gray-600"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Render the specific category page content */}
      <div>{children}</div>
    </div>
  );
}
