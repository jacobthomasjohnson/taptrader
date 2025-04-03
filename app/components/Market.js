"use client";

import { useEffect, useState } from "react";
import Commodity from "./Commodity";
import useStore from "../store/useStore";
import eventBus from "../utils/eventBus";

export const Market = () => {
      const commodities = useStore((state) => state.commodities);
      const updateMarketFlow = useStore((state) => state.updateMarketFlow);

      const RESET_TIMER = 10;
      const [countdown, setCountdown] = useState(RESET_TIMER);

      useEffect(() => {
            const interval = setInterval(() => {
                  setCountdown((prev) => (prev <= 1 ? 0 : prev - 1));
            }, 1000);
            return () => clearInterval(interval);
      }, []);

      useEffect(() => {
            if (countdown === 0) {
                  updateMarketFlow();
                  setCountdown(RESET_TIMER);
            }
      }, [countdown, updateMarketFlow]);

      useEffect(() => {
            if (countdown === 0) {
                  updateMarketFlow();
                  eventBus.dispatchEvent(new Event("marketPulse")); // 🔔 Trigger the pulse
                  setCountdown(RESET_TIMER);
            }
      }, [countdown, updateMarketFlow]);

      return (
            <div className="grow relative flex flex-col min-h-0 overflow-hidden">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 overflow-auto min-h-0 pb-24 hide-scrollbar">
                        {commodities.map((commodity, index) => (
                              <Commodity key={index} commodityName={commodity.commodityName} globalCountdown={countdown} />
                        ))}
                  </div>
                  <div className="pointer-events-none h-[20%] w-full absolute bottom-0 z-30 bg-gradient-to-b from-transparent to-background" />
            </div>
      );
};

export default Market;
