import { create } from "zustand";

export const useStore = create((set, get) => ({
  cash: 1000,
  level: 1,
  holdings: 0,
  trades: 0,
  profitLoss: 20,

  // Optionally, you could add an "initialRefreshTime" to each commodity if you
  // want a consistent reset value separate from the current countdown.
  commodities: [
    {
      commodityName: "GOLD",
      volatility: 0.02,
      initialRefreshTime: 4,
      timeTillRefresh: 4,
      currentPrice: 184,
      youOwn: 24,
      avgBuyPrice: 212,
      recentTrend: "up",
    },
    {
      commodityName: "SILVER",
      volatility: 0.05,
      initialRefreshTime: 6,
      timeTillRefresh: 6,
      currentPrice: 28,
      youOwn: 27,
      avgBuyPrice: 33,
      recentTrend: "down",
    },
    {
      commodityName: "PLATINUM",
      volatility: 0.03,
      initialRefreshTime: 33,
      timeTillRefresh: 11,
      currentPrice: 11,
      youOwn: 1,
      avgBuyPrice: 250,
      recentTrend: "up",
    },
    {
      commodityName: "DIAMOND",
      volatility: 0.01,
      initialRefreshTime: 14,
      timeTillRefresh: 14,
      currentPrice: 2473,
      youOwn: 3,
      avgBuyPrice: 2830,
      recentTrend: "down",
    },
  ],

  purchaseCommodity: (commodityName, amount) =>
    set((state) => {
      const commodities = state.commodities.map((commodity) => {
        if (commodity.commodityName === commodityName) {
          const newYouOwn = commodity.youOwn + amount;
          return {
            ...commodity,
            youOwn: newYouOwn,
            avgBuyPrice:
              (commodity.avgBuyPrice * commodity.youOwn +
                commodity.currentPrice * amount) /
              newYouOwn,
          };
        }
        return commodity;
      });
      return { commodities };
    }),

  sellCommodity: (commodityName, amount) =>
    set((state) => {
      const commodities = state.commodities.map((commodity) => {
        if (commodity.commodityName === commodityName) {
          const newYouOwn = commodity.youOwn - amount;
          if (newYouOwn < 0) {
            console.error("Not enough commodity to sell");
            return commodity;
          }
          return { ...commodity, youOwn: newYouOwn };
        }
        return commodity;
      });
      return { commodities };
    }),

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

  // This function updates the price of a single commodity when its timer hits 0.
  refreshCommodity: (commodityName) =>
    set((state) => {
      const commodities = state.commodities.map((commodity) => {
        if (commodity.commodityName === commodityName) {
          const volatility = commodity.volatility || 0.05;
          // Compute a random factor based on volatility.
          // Optionally, you can add a global factor if you want a unified market movement.
          const randomChange = Math.random() * 2 * volatility - volatility;
          const newPrice = parseFloat(
            (commodity.currentPrice * (1 + randomChange)).toFixed(2)
          );
          return {
            ...commodity,
            currentPrice: newPrice,
            recentTrend: newPrice > commodity.currentPrice ? "up" : "down",
            // Reset the timer to its initial value.
            timeTillRefresh: commodity.initialRefreshTime,
          };
        }
        return commodity;
      });
      return { commodities };
    }),

  // Function for global market updates (if needed)
  updateMarketFlow: () => {
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
    });
  },

  // Periodic global market update function
  startMarketFlowUpdates: (interval = 5000) => {
    const updateFlow = () => {
      useStore.getState().updateMarketFlow();
    };
    const id = setInterval(updateFlow, interval);
    return () => clearInterval(id);
  },

  // Original random update for all commodities (if needed)
  randomCommodityPriceUpdate: () => {
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
    });
  },
}));

export default useStore;
