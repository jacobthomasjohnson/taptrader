"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react";

export const Upgrades = () => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {/* Toggle button remains in normal flow, but with a higher z-index */}
      <div className="relative w-screen items-center justify-center bg-background z-60  flex gap-2 p-6">
        <div onClick={toggleExpanded} className="transition-all duration-75 active:scale-95 hover:cursor-pointer hover:underline flex gap-1 items-center">
          {expanded ? "CLOSE UPGRADES" : "OPEN UPGRADES"}
          {expanded ? (
            <ArrowDown width={12} height={12} />
          ) : (
            <ArrowUp width={12} height={12} />
          )}
        </div>
      </div>

      {/* Fixed upgrades menu overlay */}
      <div
        className="fixed bg-background border-t border-[#333333] mx-auto p-6 left-0 bottom-0 right-0  transition-all duration-500 overflow-hidden z-50"
        style={{
          height: expanded ? "80svh" : "0px",
        }}
      >
        <div className="p-4">
          <h2 className="text-xl">Upgrades</h2>
          <p>Here is your upgrades content...</p>
          {/* Add additional content as needed */}
        </div>
      </div>
    </div>
  );
};

export default Upgrades;
