"use client";

import Commodity from "./Commodity";
import useStore from "../store/useStore";
import { useEffect } from "react";

export const Market = () => {
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     useStore.getState().refreshCommodities();
  //   }, resetTimer);
  //   return () => clearInterval(interval);
  // }, []);
  const commodities = useStore((state) => state.commodities);
      return (
            <div className="grow relative flex flex-col min-h-0 overflow-hidden">
                  <div className="flex flex-col flex-1 overflow-auto min-h-0 gap-4 pb-24 hide-scrollbar">
                        {commodities.map((commodity, index) => (
                              <Commodity key={index} {...commodity} />
                        ))}
                  </div>
                  <div className="pointer-events-none h-[20%] w-full absolute bottom-0 z-30 bg-gradient-to-b from-transparent to-background" />
            </div>
      )
}

export default Market;