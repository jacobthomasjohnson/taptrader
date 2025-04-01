import { RotateCcw, ArrowDownRight, ArrowUpRight } from 'lucide-react';

export const Commodity = ({ commodityName, timeTillRefresh, currentPrice, youOwn, avgBuyPrice, recentTrend }) => {
      return (
            <div className="flex flex-col gap-2 border border-[#333333] p-3 rounded-lg">
                  <div className="flex w-full justify-between items-center">
                        <div className="text-xl font-bold">{commodityName}</div>
                        <div className="flex gap-1 items-center"><RotateCcw width={12} height={12} />{timeTillRefresh}s</div>
                  </div>
                  <div className="w-full h-[1px] bg-[#333333]" />
                  <div className="w-full justify-between items-center flex">
                        <div>CURRENT PRICE</div>
                        <div>${currentPrice}</div>
                  </div>
                  <div className="w-full h-[1px] bg-[#333333]" />

                  <div className="w-full justify-between items-center flex">
                        <div>YOU OWN</div>
                        <div>{youOwn}oz</div>
                  </div>
                  <div className="w-full h-[1px] bg-[#333333]" />

                  <div className="w-full justify-between items-center flex">
                        <div>AVG. BUY PRICE</div>
                        <div>${avgBuyPrice}</div>
                  </div>
                  <div className="w-full h-[1px] bg-[#333333]" />

                  <div className="w-full justify-between items-center flex">
                        <div>RECENT TREND</div>
                        <div>
                              {recentTrend !== 'up' ? (
                                    <ArrowDownRight width={12} height={12} color="red" />
                              ) : (
                                    <ArrowUpRight width={12} height={12} color="green" />
                              )}
                        </div>
                  </div>
                  <div className="w-full h-[1px] bg-[#333333]" />
                  <div className="w-full flex gap-2 my-1">
                        <button className="transition-all duration-75 active:scale-95 hover:cursor-pointer hover:bg-[#efefef] w-1/2 p-3 flex items-center justify-center bg-[#E2E2E2] text-background rounded-md">
                              BUY
                        </button>
                        <button className="transition-all duration-75 active:scale-95 hover:cursor-pointer hover:bg-[#a8f2ba] w-1/2 p-3 flex items-center justify-center bg-[#99E5AC] text-background rounded-md">
                              SELL
                        </button>
                  </div>
            </div>
      )
}

export default Commodity;