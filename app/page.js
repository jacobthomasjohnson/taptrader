"use client";

import { ArrowDown, ArrowUp } from 'lucide-react';
import Market from './components/Market';
import MarketHeader from './components/MarketHeader';
import Stats from './components/Stats';
import Menu from './components/Menu';
import Header from './components/Header';
import useStore from './store/useStore';

export default function Home() {
  // Subscribe to options so the component re-renders when options change
  const options = useStore((state) => state.options);
  const optionsDebug = useStore((state) => state.optionsDebug);

  return (
    <div className="flex flex-col h-screen w-full px-6 text-sm font-normal overflow-hidden xl:w-[1100px] xl:mx-auto">
      {/* Header Section */}
      <Header />
      {/* Stats Section */}
      <Stats />
      {/* Market Header */}
      <MarketHeader />
      {/* Market Section */}
      <Market />
      {/* Upgrades Button */}
      <Menu />
      {/* Debug */}
      <div style={{
        display: optionsDebug ? 'block' : 'none',
        zIndex: 100,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#333333',
        padding: '1rem',
        fontSize: '0.75rem',
        color: '#99E5AC',
      }} className="absolute z-[100] opacity-70 text-pink-300 pointer-events-none font-bold bottom-0 left-0 right-0 bg-[#333333] p-4 text-xs">
        <pre>{JSON.stringify(options, null, 2)}</pre>
      </div>
    </div>
  );
}
