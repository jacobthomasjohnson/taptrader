import { ArrowDown, ArrowUp } from 'lucide-react';

export const Upgrades = () => {
      return (
            <div className="transition-all duration-75 active:scale-95 hover:cursor-pointer hover:underline flex justify-center items-center p-6">
                  <div className="flex gap-2 items-center">
                        UPGRADES <ArrowUp width={12} height={12} />
                  </div>
            </div>
      )
}

export default Upgrades;