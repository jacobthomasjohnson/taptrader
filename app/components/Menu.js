"use client";

import { ArrowUp } from "lucide-react";
import { useState } from "react";
import useStore from "../store/useStore";
import Toggle from "./Toggle";

export const Menu = () => {
  const [expanded, setExpanded] = useState(false);
  const headerHeight = useStore((state) => state.headerHeight);
  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {/* Toggle button remains in normal flow, but with a higher z-index */}
      <div className="relative w-screen items-center justify-center bg-background z-60  flex gap-2 p-6">
        <div onClick={toggleExpanded} className="transition-all active:scale-95 hover:cursor-pointer hover:underline flex gap-1 items-center">
          {expanded ? "" : (
          
            <>
            OPEN MENU<ArrowUp width={12} height={12} />
            </>
        
          )}
          
        </div>
      </div>

      {/* Fixed upgrades menu overlay */}
      <div
        className="fixed bg-background border-t border-[#333333] mx-auto p-3 left-0 bottom-0 right-0  transition-all duration-150 overflow-hidden z-50"
        style={{
          height: expanded ? `calc(100svh - ${headerHeight}px)` : "0px",
        }}
      >
        <div className="p-4">
          <h2 className="relative text-xl text-center block border-b border-[#333333] pb-3">Options<div className="absolute right-0 top-0 hover:cursor-pointer text-[#b0b0b0] hover:text-foreground" onClick={toggleExpanded} style={{
          }}>✕</div></h2>
          <div className="flex w-full flex-col gap-2 mt-3">
          <div className="flex justify-between w-full items-center py-3">
              <>Enable Compact View</>
              <Toggle option="enableCompactView" />
            </div>
            <div className="flex justify-between w-full items-center py-3">
              <>Disable Animations</>
              <Toggle option="disableAnimations" />
            </div>
            <div className="flex justify-between w-full items-center py-3">
              <>Disable Sounds</>
              <Toggle option="disableSounds" />
            </div>
          </div>
          <h2 className="relative text-xl text-center block border-b border-[#333333] pb-3">Upgrades</h2>
          <div className="flex w-full flex-col gap-2 mt-3">
          <div className="flex justify-between w-full items-center py-3">
              <>Faster Market Trading</>
              <Toggle option="fasterMarketTrading" />
            </div>
          </div>
          {/* Add additional content as needed */}
        </div>
      </div>
    </div>
  );
};

export default Menu;
