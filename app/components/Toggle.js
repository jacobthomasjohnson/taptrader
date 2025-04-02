"use client";

import { useState, useEffect } from "react";

export const Toggle = ({ onToggle }) => {
      const [isToggled, setIsToggled] = useState(false);

      const doToggle = () => {
            setIsToggled(!isToggled);
      };

      return (
            <>
                  <div onClick={doToggle} className="relative w-[50px] border h-[25px] rounded-xl border-[#e3e3e3] overflow-hidden" style={{
                        borderColor: isToggled ? "green" : "#444444",
                        backgroundColor: isToggled ? "green" : "transparent",
                        transition: "all 0.5s cubic-bezier(0,1,0,1)"
                  }}>
                        {/* -left-[1px] -top-[1px] bottom-0 */}
                        <div className="absolute w-[25px] h-[25px] rounded-xl bg-[#444444]" style={{
                              top: "-1px",
                              left: isToggled ? `1px` : `-1px`,
                              backgroundColor: isToggled ? "#e3e3e3" : "#444444",
                              transform: `translateX(${isToggled ? "25px" : "0px"})`,
                              transition: "all 0.5s cubic-bezier(0,1,0,1)"
                        }}/>
                  </div>
            </>
      );
}

export default Toggle;