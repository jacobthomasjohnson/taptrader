"use client";

import { useState, useEffect } from "react";
import { RotateCcw, ArrowDownRight, ArrowUpRight } from "lucide-react";
import useStore from "../store/useStore";

export const Commodity = ({ commodityName }) => {
  // Get the entire commodity object from the store
  const commodity = useStore((state) =>
    state.commodities.find((c) => c.commodityName === commodityName)
  );
  const {
    timeTillRefresh,
    currentPrice,
    youOwn,
    avgBuyPrice,
    recentTrend,
    initialRefreshTime,
  } = commodity;
  const refreshCommodity = useStore((state) => state.refreshCommodity);
  const buyCommodity = useStore((state) => state.buyCommodity);
  const sellCommodity = useStore((state) => state.sellCommodity);

  // Local countdown state, initialized to the store value
  const [localCountdown, setLocalCountdown] = useState(timeTillRefresh);

  // Log store timer for debugging (optional)
  useEffect(() => {
    console.log(
      `${commodityName} timeTillRefresh from store:`,
      timeTillRefresh
    );
  }, [timeTillRefresh, commodityName]);

  // Countdown effect: decrement localCountdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setLocalCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // When localCountdown hits 0, refresh the commodity and reset the timer manually
  useEffect(() => {
    if (localCountdown <= 0) {
      console.log(
        `Refreshing ${commodityName} because localCountdown reached 0`
      );
      refreshCommodity(commodityName);
      // Immediately reset the local timer to the initial refresh time
      setLocalCountdown(initialRefreshTime);
    }
  }, [localCountdown, commodityName, refreshCommodity, initialRefreshTime]);

  return (
    <div className="flex flex-col gap-2 border border-[#333333] p-3 rounded-lg">
      <div className="flex w-full justify-between items-center">
        <div className="text-xl font-bold">{commodityName}</div>
        <div className="flex gap-1 items-center">
          <RotateCcw width={12} height={12} />
          {localCountdown}s
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#333333]" />
      <div className="flex w-full justify-between items-center">
        <div>CURRENT PRICE</div>
        <div>${currentPrice}</div>
      </div>
      <div className="w-full h-[1px] bg-[#333333]" />
      <div className="flex w-full justify-between items-center">
        <div>YOU OWN</div>
        <div>{youOwn}oz</div>
      </div>
      <div className="w-full h-[1px] bg-[#333333]" />
      <div className="flex w-full justify-between items-center">
        <div>AVG. BUY PRICE</div>
        <div>${avgBuyPrice}</div>
      </div>
      <div className="w-full h-[1px] bg-[#333333]" />
      <div className="flex w-full justify-between items-center">
        <div>RECENT TREND</div>
        <div>
          {recentTrend !== "up" ? (
            <ArrowDownRight width={15} height={15} color="red" />
          ) : (
            <ArrowUpRight width={15} height={15} color="green" />
          )}
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#333333]" />
      <div className="flex w-full gap-2 my-1">
        <button onClick={() => buyCommodity(commodityName)} className="transition-all duration-75 active:scale-95 hover:cursor-pointer hover:bg-[#efefef] w-1/2 p-3 flex items-center justify-center bg-[#E2E2E2] text-background rounded-md">
          BUY
        </button>
        <button onClick={() => sellCommodity(commodityName)} className="transition-all duration-75 active:scale-95 hover:cursor-pointer hover:bg-[#a8f2ba] w-1/2 p-3 flex items-center justify-center bg-[#99E5AC] text-background rounded-md">
          SELL
        </button>
      </div>
    </div>
  );
};

export default Commodity;
