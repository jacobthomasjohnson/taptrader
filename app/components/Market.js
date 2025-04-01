import Commodity from "./Commodity";

export const Market = () => {
      return (
            <div className="grow relative flex flex-col min-h-0 overflow-hidden">
                  <div className="flex flex-col flex-1 overflow-auto min-h-0 gap-4 pb-24">
                        <Commodity commodityName="GOLD" timeTillRefresh={2} currentPrice={184} youOwn={24} avgBuyPrice={212} recentTrend={"up"} />
                        <Commodity commodityName="SILVER" timeTillRefresh={18} currentPrice={28} youOwn={27} avgBuyPrice={33} recentTrend={"down"} />
                        <Commodity commodityName="PLATINUM" timeTillRefresh={33} currentPrice={264} youOwn={1} avgBuyPrice={250} recentTrend={"up"} />
                        <Commodity commodityName="DIAMOND" timeTillRefresh={94} currentPrice={2473} youOwn={3} avgBuyPrice={2830} recentTrend={"down"} />
                  </div>
                  <div className="pointer-events-none h-[20%] w-full absolute bottom-0 z-30 bg-gradient-to-b from-transparent to-background" />
            </div>
      )
}

export default Market;