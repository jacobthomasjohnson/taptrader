"use client";

import { useEffect, useRef } from "react";
import { RotateCcw, ArrowDownRight, ArrowUpRight } from "lucide-react";
import useStore from "../store/useStore";
import eventBus from "../utils/eventBus";

const Commodity = ({ commodityName, globalCountdown }) => {
  const commodity = useStore((state) =>
    state.commodities.find((c) => c.commodityName === commodityName)
  );
  const { currentPrice, youOwn, avgBuyPrice, recentTrend } = commodity;
  const buyCommodity = useStore((state) => state.buyCommodity);
  const sellCommodity = useStore((state) => state.sellCommodity);
  const canAfford = useStore((state) => state.canAfford);
  const cardRef = useRef(null);

  const getIcon = (name) => {
    switch (name) {
      case "GOLD":
        return "🪙";
      case "SILVER":
        return "🥈";
      case "PLATINUM":
        return "🧬";
      case "DIAMOND":
        return "💎";
      default:
        return "📦";
    }
  };

  useEffect(() => {
    const handlePulse = () => {
      const element = cardRef.current;
      if (!element) return;

      const flashClass = recentTrend === "up" ? "flash-green" : "flash-red";

      element.classList.add(flashClass);

      setTimeout(() => {
        element.classList.remove(flashClass);
      }, 2000);
    };

    eventBus.addEventListener("marketPulse", handlePulse);
    return () => {
      eventBus.removeEventListener("marketPulse", handlePulse);
    };
  }, [recentTrend]);

  const message = (text) => {
    const messageElement = document.createElement("div");
    messageElement.innerText = text;
    messageElement.className = "absolute bg-background p-3 top-0 left-0 right-0 text-center message";
    cardRef.current.appendChild(messageElement);

    setTimeout(() => {
      messageElement.remove();
    }, 1000);
  }

  const doBuyCommodity = (name) => {
    if (canAfford(currentPrice)) {
      message(`Bought ${name} for $${currentPrice}`);
      buyCommodity(name);
    }
  }

  const doSellCommodity = (name) => {
    if (youOwn > 0) {
      message(`Sold ${name} for $${currentPrice}`);
      sellCommodity(name);
    }
  }

  return (
    <div
      ref={cardRef}
      className="flex flex-col gap-2 border border-[#333333] p-3 rounded-lg transition-colors duration-300 relative"
    >
      <div className="flex w-full justify-between items-center">
        <div className="text-xl font-bold flex items-center gap-2">
          <div className="text-base">{getIcon(commodityName)}</div>
          {commodityName}
        </div>
        <div className="flex gap-1 items-center">
          <RotateCcw width={12} height={12} />
          {globalCountdown}s
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
        <div>{youOwn}</div>
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
        <button
          onClick={() => doBuyCommodity(commodityName)}
          className={`transition-all duration-75 active:scale-95 hover:cursor-pointer 
            ${canAfford(currentPrice)
              ? "text-background bg-neutral-200 hover:cursor-pointer"
              : "text-neutral-200 hover:cursor-not-allowed bg-transparent"
            }
             w-1/2 p-3 flex items-center justify-center text-background rounded-md`}
        >
          BUY
        </button>
        <button
          onClick={() => doSellCommodity(commodityName)}
          className="transition-all duration-75 active:scale-95 hover:cursor-pointer w-1/2 p-3 flex items-center justify-center bg-[#99E5AC] text-background rounded-md"
        >
          SELL
        </button>
      </div>
    </div>
  );
};

export default Commodity;
