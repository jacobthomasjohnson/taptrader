"use client";

import { ArrowDown, ArrowUp } from 'lucide-react';
import Market from './components/Market';
import MarketHeader from './components/MarketHeader';
import Stats from './components/Stats';
import Menu from './components/Menu';
import Header from './components/Header';

export default function Home() {
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
    </div>
  );
}
