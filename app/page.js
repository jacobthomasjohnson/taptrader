"use client";

import { ArrowDown, ArrowUp } from 'lucide-react';
import Market from './components/Market';
import MarketHeader from './components/MarketHeader';
import Stats from './components/Stats';
import Upgrades from './components/Upgrades';
import Header from './components/Header';

export default function Home() {
  return (
    <div className="flex flex-col h-screen w-full px-6 text-sm font-light overflow-hidden">
      {/* Header Section */}
      <Header />
      {/* Stats Section */}
      <Stats />
      {/* Market Header */}
      <MarketHeader />
      {/* Market Section */}
      <Market />
      {/* Upgrades Button */}
      <Upgrades />
    </div>
  );
}
