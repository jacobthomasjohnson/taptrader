"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import useStore from "../store/useStore";

const formatNumber = (num) =>
  typeof num === "number" ? num.toFixed(2) : "0.00";

export const Stats = () => {
  const { cash, level, holdings, trades, profitLoss } = useStore(
    (state) => state
  );
  const expandedStats = useRef(null);
  const [expandedHeight, setExpandedHeight] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (expandedStats.current) {
      setExpandedHeight(expandedStats.current.scrollHeight);
    } else {
      setExpandedHeight(0);
    }
  }, []);

  useEffect(() => {
    // Possibly add animations to stats here
  }, [cash, level, holdings, trades, profitLoss]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex p-3 w-full justify-between border border-[#333333] rounded-lg">
        <div>CASH</div>
        <div className="text-[#99E5AC]">${formatNumber(cash)}</div>
      </div>

      <div
        className="h-full transition-all flex flex-col gap-2"
        ref={expandedStats}
        style={{
          height: expanded ? expandedHeight : 0,
          overflow: "hidden",
        }}
      >
        <div className="flex p-3 w-full justify-between border border-[#333333] rounded-lg">
          <div>LEVEL</div>
          <div>{level}</div>
        </div>
        <div className="flex p-3 w-full justify-between border border-[#333333] rounded-lg">
          <div>HOLDINGS</div>
          <div className="text-[#99E5AC]">${formatNumber(holdings)}</div>
        </div>
        <div className="flex p-3 w-full justify-between border border-[#333333] rounded-lg">
          <div>TRADES</div>
          <div>{trades}</div>
        </div>
        <div className="flex p-3 w-full justify-between border border-[#333333] rounded-lg">
          <div>P/L</div>
          <div
            style={{
              color: profitLoss > 0 ? "#99E5AC" : "#FF4D4D",
            }}
          >
            {profitLoss > 0
              ? "+$" + formatNumber(profitLoss)
              : "-$" + formatNumber(Math.abs(profitLoss))}
          </div>
        </div>
      </div>
      <div
        onClick={toggleExpanded}
        className="transition-all duration-75 active:scale-95 hover:cursor-pointer hover:underline flex p-2 w-full justify-center rounded-lg"
      >
        <div className="flex gap-2 items-center">
          {expanded ? "SHRINK STATS" : "EXPAND STATS"}{" "}
          {expanded ? (
            <ArrowUp width={12} height={12} />
          ) : (
            <ArrowDown width={12} height={12} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Stats;
