"use client";

import { useRef, useEffect, useState } from "react";
import useStore from "../store/useStore";

export const Header = () => {
      const headerRef = useRef(null);
      const setHeaderHeight = useStore((state) => state.setHeaderHeight);
      const setOptionsDebug = useStore((state) => state.setOptionsDebug);
      const optionsDebug = useStore((state) => state.optionsDebug);
      useEffect(() => {
            if (headerRef.current) {
                  setHeaderHeight(headerRef.current.scrollHeight);
            } else {
                  setHeaderHeight(0);
            }
      }, []);
      return (
            <div ref={headerRef} className="relative flex items-center justify-center p-4 pt-4 text-lg font-semibold">
                  TAP TRADER
                  <div className="absolute text-xs right-0 hover:cursor-pointer" onClick={() => setOptionsDebug(!optionsDebug)}>
                        Debug
                  </div>
            </div>
      )
}

export default Header;