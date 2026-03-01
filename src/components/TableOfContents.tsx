"use client";

import { useEffect, useState } from "react";
import { SECTIONS } from "@/lib/constants";

export default function TableOfContents() {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    for (const section of SECTIONS) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="hidden lg:block fixed top-24 right-8 w-52 xl:w-56">
      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 font-sans">
        Contents
      </div>
      <ul className="space-y-1">
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`block text-sm py-1 px-2 rounded transition-colors font-sans ${
                activeId === s.id
                  ? "text-blue-600 bg-blue-50 font-medium"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
