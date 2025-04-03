import { create } from "zustand";

export const useStore = create((set, get) => ({
  cash: 1000,
  level: 1,
  trades: 0,
  profitLoss: 0,

  commodities: [
    { commodityName: "GOLD", volatility: 0.1, currentPrice: 184, youOwn: 0, avgBuyPrice: 0, recentTrend: "up" },
    { commodityName: "SILVER", volatility: 0.1, currentPrice: 28, youOwn: 0, avgBuyPrice: 0, recentTrend: "down" },
    { commodityName: "PLATINUM", volatility: 0.03, currentPrice: 750, youOwn: 0, avgBuyPrice: 0, recentTrend: "up" },
    { commodityName: "DIAMOND", volatility: 0.01, currentPrice: 2473, youOwn: 0, avgBuyPrice: 0, recentTrend: "down" },
  ],

  buyCommodity: (commodityName) =>
    set((state) => {
      const commodity = state.commodities.find((c) => c.commodityName === commodityName);
      if (!commodity || state.cash < commodity.currentPrice) return {};

      const cost = commodity.currentPrice;
      const newQuantity = commodity.youOwn + 1;
      const newAvgBuyPrice = (commodity.avgBuyPrice * commodity.youOwn + cost) / newQuantity;

      const newCommodities = state.commodities.map((c) =>
        c.commodityName === commodityName
          ? { ...c, youOwn: newQuantity, avgBuyPrice: newAvgBuyPrice }
          : c
      );

      return {
        cash: state.cash - cost,
        trades: state.trades + 1,
        commodities: newCommodities,
      };
    }),

  sellCommodity: (commodityName) =>
    set((state) => {
      const commodity = state.commodities.find((c) => c.commodityName === commodityName);
      if (!commodity || commodity.youOwn <= 0) return {};

      const sellPrice = commodity.currentPrice;
      const realizedProfit = sellPrice - commodity.avgBuyPrice;
      const newQuantity = commodity.youOwn - 1;
      const newAvgBuyPrice = newQuantity === 0 ? 0 : commodity.avgBuyPrice;

      const newCommodities = state.commodities.map((c) =>
        c.commodityName === commodityName
          ? { ...c, youOwn: newQuantity, avgBuyPrice: newAvgBuyPrice }
          : c
      );

      return {
        cash: state.cash + sellPrice,
        trades: state.trades + 1,
        commodities: newCommodities,
        profitLoss: state.profitLoss + realizedProfit,
      };
    }),

  updateMarketFlow: () =>
    set((state) => {
      const globalFactor = Math.random() * 0.01 - 0.005;
      const commodities = state.commodities.map((commodity) => {
        const volatility = commodity.volatility;
        const individualNoise = Math.random() * 2 * volatility - volatility;
        const totalFactor = globalFactor + individualNoise;
        const newPrice = parseFloat((commodity.currentPrice * (1 + totalFactor)).toFixed(2));
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

  optionsDebug: false,
  setOptionsDebug: (value) => set({ optionsDebug: value }),

  options: {
    enableCompactView: false,
    disableAnimations: false,
    disableSounds: false,
    fasterMarketTrading: false,
  },
  setOption: (option, value) =>
    set((state) => ({
      options: {
        ...state.options,
        [option]: value,
      },
    })),
  getOption: (option) => get().options[option],
}));

export default useStore;