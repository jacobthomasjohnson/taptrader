"use client";

import { useEffect, useState } from "react";
import Commodity from "./Commodity";
import useStore from "../store/useStore";

export const Market = () => {
      const commodities = useStore((state) => state.commodities);
      const updateMarketFlow = useStore((state) => state.updateMarketFlow);

      const RESET_TIMER = 5; // seconds
      const [countdown, setCountdown] = useState(RESET_TIMER);

      useEffect(() => {
            const interval = setInterval(() => {
                  setCountdown((prev) => {
                        if (prev <= 1) {
                              updateMarketFlow(); // update prices globally
                              return RESET_TIMER;
                        }
                        return prev - 1;
                  });
            }, 1000);

            return () => clearInterval(interval);
      }, [updateMarketFlow]);

      return (
            <div className="grow relative flex flex-col min-h-0 overflow-hidden">
                  <div className="flex flex-col flex-1 overflow-auto min-h-0 gap-4 pb-24 hide-scrollbar">
                        {commodities.map((commodity, index) => (
                              <Commodity key={index} commodityName={commodity.commodityName} globalCountdown={countdown} />
                        ))}
                  </div>
                  <div className="pointer-events-none h-[20%] w-full absolute bottom-0 z-30 bg-gradient-to-b from-transparent to-background" />
            </div>
      );
};

export default Market;
