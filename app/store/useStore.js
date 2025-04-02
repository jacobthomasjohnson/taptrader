import { create } from "zustand";

export const useStore = create((set, get) => ({
  cash: 1000,
  level: 1,
  trades: 0,
  // profitLoss now reflects realized profit/loss from closed trades
  profitLoss: 0,

  commodities: [
    {
      commodityName: "GOLD",
      volatility: 0.02,
      initialRefreshTime: 10,
      timeTillRefresh: 10,
      currentPrice: 184,
      youOwn: 0,
      avgBuyPrice: 0,
      recentTrend: "up",
    },
    {
      commodityName: "SILVER",
      volatility: 0.1,
      initialRefreshTime: 10,
      timeTillRefresh: 10,
      currentPrice: 28,
      youOwn: 0,
      avgBuyPrice: 0,
      recentTrend: "down",
    },
    {
      commodityName: "PLATINUM",
      volatility: 0.03,
      initialRefreshTime: 10,
      timeTillRefresh: 10,
      currentPrice: 750,
      youOwn: 0,
      avgBuyPrice: 0,
      recentTrend: "up",
    },
    {
      commodityName: "DIAMOND",
      volatility: 0.01,
      initialRefreshTime: 10,
      timeTillRefresh: 10,
      currentPrice: 2473,
      youOwn: 0,
      avgBuyPrice: 0,
      recentTrend: "down",
    },
  ],

  // BUY: update cash and holdings (average cost is recalculated), profitLoss is not changed.
  buyCommodity: (commodityName) =>
    set((state) => {
      const commodity = state.commodities.find(
        (c) => c.commodityName === commodityName
      );
      if (!commodity) return {};
      const cost = commodity.currentPrice;
      if (state.cash < cost) {
        console.error("Not enough cash to buy this commodity");
        return {};
      }
      const newCash = state.cash - cost;
      const newQuantity = commodity.youOwn + 1;
      // Use weighted average to recalc the average cost per unit
      const newAvgBuyPrice =
        newQuantity === 0
          ? 0
          : (commodity.avgBuyPrice * commodity.youOwn + cost) / newQuantity;
      const newCommodities = state.commodities.map((c) =>
        c.commodityName === commodityName
          ? { ...c, youOwn: newQuantity, avgBuyPrice: newAvgBuyPrice }
          : c
      );
      return {
        cash: newCash,
        trades: state.trades + 1,
        commodities: newCommodities,
        // profitLoss remains unchanged (unrealized cost basis)
      };
    }),

  // SELL: update cash, reduce holdings, and update profitLoss with realized gain/loss.
  sellCommodity: (commodityName) =>
    set((state) => {
      const commodity = state.commodities.find(
        (c) => c.commodityName === commodityName
      );
      if (!commodity) return {};
      if (commodity.youOwn <= 0) {
        console.error("Not enough commodity to sell");
        return {};
      }
      const sellPrice = commodity.currentPrice;
      // Realized profit (or loss) for 1 unit sold:
      const realizedProfit = sellPrice - commodity.avgBuyPrice;
      const newCash = state.cash + sellPrice;
      const newQuantity = commodity.youOwn - 1;
      // If no more units remain, you can reset avgBuyPrice to 0
      const newAvgBuyPrice = newQuantity === 0 ? 0 : commodity.avgBuyPrice;
      const newCommodities = state.commodities.map((c) =>
        c.commodityName === commodityName
          ? { ...c, youOwn: newQuantity, avgBuyPrice: newAvgBuyPrice }
          : c
      );
      return {
        cash: newCash,
        trades: state.trades + 1,
        commodities: newCommodities,
        profitLoss: state.profitLoss + realizedProfit,
      };
    }),

  // Other functions remain the same

  updateCommodityPrice: (commodityName, newPrice) =>
    set((state) => {
      const commodities = state.commodities.map((commodity) => {
        if (commodity.commodityName === commodityName) {
          return {
            ...commodity,
            currentPrice: newPrice,
            recentTrend: newPrice > commodity.currentPrice ? "up" : "down",
          };
        }
        return commodity;
      });
      return { commodities };
    }),

  determineCommodityTrend: (commodityName) =>
    set((state) => {
      const commodity = state.commodities.find(
        (c) => c.commodityName === commodityName
      );
      if (!commodity) return;
      const trend = commodity.recentTrend === "up" ? "down" : "up";
      return {
        commodities: state.commodities.map((c) =>
          c.commodityName === commodityName ? { ...c, recentTrend: trend } : c
        ),
      };
    }),

  refreshCommodity: (commodityName) =>
    set((state) => {
      const commodities = state.commodities.map((commodity) => {
        if (commodity.commodityName === commodityName) {
          const volatility = commodity.volatility || 0.05;
          const randomChange = Math.random() * 2 * volatility - volatility;
          const newPrice = parseFloat(
            (commodity.currentPrice * (1 + randomChange)).toFixed(2)
          );
          return {
            ...commodity,
            currentPrice: newPrice,
            recentTrend: newPrice > commodity.currentPrice ? "up" : "down",
            timeTillRefresh: commodity.initialRefreshTime,
          };
        }
        return commodity;
      });
      return { commodities };
    }),

  updateMarketFlow: () =>
    set((state) => {
      const globalFactor = Math.random() * 0.01 - 0.005;
      const commodities = state.commodities.map((commodity) => {
        const volatility = commodity.volatility || 0.05;
        const individualNoise = Math.random() * 2 * volatility - volatility;
        const totalFactor = globalFactor + individualNoise;
        const newPrice = parseFloat(
          (commodity.currentPrice * (1 + totalFactor)).toFixed(2)
        );
        return {
          ...commodity,
          currentPrice: newPrice,
          recentTrend: newPrice > commodity.currentPrice ? "up" : "down",
        };
      });
      return { commodities };
    }),

  startMarketFlowUpdates: (interval = 5000) => {
    const updateFlow = () => {
      useStore.getState().updateMarketFlow();
    };
    const id = setInterval(updateFlow, interval);
    return () => clearInterval(id);
  },

  randomCommodityPriceUpdate: () =>
    set((state) => {
      const commodities = state.commodities.map((commodity) => {
        const randomChange =
          (Math.random() * 0.1 - 0.05) * commodity.currentPrice;
        const newPrice = parseFloat(
          (commodity.currentPrice + randomChange).toFixed(2)
        );
        return {
          ...commodity,
          currentPrice: newPrice,
          recentTrend: newPrice > commodity.currentPrice ? "up" : "down",
        };
      });
      return { commodities };
    }),

    headerHeight: 0,
    setHeaderHeight: (height) => set({ headerHeight: height }),

}));

export default useStore;
