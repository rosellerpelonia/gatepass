// src/app/dashboard/form/category/[category]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import GatePassForm from "../component/GatePassForm";

export default function CategoryPage() {
  const pathname = usePathname();
  const [categoryContent, setCategoryContent] = useState<JSX.Element | null>(null);

  useEffect(() => {
    const category = decodeURIComponent(pathname.split("/").pop() || "");

    if (category === "Gatepass") {
      setCategoryContent(<GatePassForm />);
    } else {
      setCategoryContent(<p>This page is under construction for the {category} category.</p>);
    }
  }, [pathname]);

  return (
    <div className="p-8">
      {categoryContent}
    </div>
  );
}
