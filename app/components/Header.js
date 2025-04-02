"use client";

import { useRef, useEffect, useState } from "react";
import useStore from "../store/useStore";

export const Header = () => {
      const headerRef = useRef(null);
      const setHeaderHeight = useStore((state) => state.setHeaderHeight);
      useEffect(() => {
            if (headerRef.current) {
                  setHeaderHeight(headerRef.current.scrollHeight);
            } else {
                  setHeaderHeight(0);
            }
      }, []);
      return (
            <div ref={headerRef} className="flex items-center justify-center p-4 pt-4 text-lg font-semibold">
                  TAP TRADER
            </div>
      )
}

export default Header;